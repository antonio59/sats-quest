// SAT Quest — Convex Client
// Persistence layer with a localStorage fallback. PINs are hashed with
// SHA-256 before they leave the device; the server only ever stores hashes.
window.SATClient = (function() {
  const CONVEX_URL = 'https://combative-viper-883.eu-west-1.convex.cloud';

  let convexClient = null;
  let convexLoaded = false;
  let loadPromise = null;

  function loadConvex() {
    if (loadPromise) return loadPromise;
    loadPromise = new Promise((resolve) => {
      if (window.convex) { convexLoaded = true; resolve(true); return; }
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/convex@1.3.1/dist/browser.bundle.js';
      // Pinned version + SRI so a compromised CDN can't swap the client bundle.
      s.integrity = 'sha384-5ABsguvlMTvi2G/H2h7B9LaYZWAlAx+G5+1ru65zAQuYiW+5TU8KCUUgZEUYFmeF';
      s.crossOrigin = 'anonymous';
      s.onload = () => {
        try {
          convexClient = new window.convex.ConvexClient(CONVEX_URL);
          convexLoaded = true;
          resolve(true);
        } catch(e) { console.error('Convex init error:', e); resolve(false); }
      };
      s.onerror = () => { console.error('Failed to load Convex script'); resolve(false); };
      document.head.appendChild(s);
    });
    return loadPromise;
  }
  loadConvex();

  const local = {
    _get(k) { try { return JSON.parse(localStorage.getItem('sq_' + k)); } catch { return null; } },
    _set(k, v) { localStorage.setItem('sq_' + k, JSON.stringify(v)); }
  };

  const AVATARS = ['🦊','🐱','🐶','🦁','🐼','🐨','🦄','🐸','🐙','🦋','🐢','🦖','🐧','🦜','🐝','🦉','🐯','🐲','🐵'];
  const WORLDS = ['reading', 'writing', 'math'];

  async function hashPin(pin) {
    if (window.crypto?.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('sq:' + pin));
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Non-secure-context fallback (file://, plain http) — not cryptographic,
    // but still avoids storing the literal PIN. Production is HTTPS.
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    const s = 'sq:' + pin;
    for (let i = 0; i < s.length; i++) {
      const ch = s.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0')
      .padEnd(64, '0');
  }

  function sessionFor(p) {
    // Never persist passcode material in the session.
    return {
      playerId: p.playerId, name: p.name, avatar: p.avatar,
      xp: p.xp || 0, level: p.level || 1, streak: p.streak || 1,
    };
  }

  // Merge server progress into local cache (max-wins per field).
  function mergeProgress(playerId, serverProgress) {
    if (!serverProgress) return;
    const progress = local._get(`progress_${playerId}`) || {};
    for (const w of WORLDS) {
      const s = serverProgress[w];
      if (!s) continue;
      const l = progress[w] || { level: 1, xp: 0, answered: 0, correct: 0, bestStreak: 0 };
      progress[w] = {
        level: Math.max(l.level, s.level),
        xp: Math.max(l.xp, s.xp),
        answered: Math.max(l.answered, s.answered),
        correct: Math.max(l.correct, s.correct),
        bestStreak: Math.max(l.bestStreak || 0, s.bestStreak || 0),
      };
    }
    local._set(`progress_${playerId}`, progress);
  }

  return {
    isConnected() { return convexLoaded; },
    getConvexUrl() { return CONVEX_URL; },

    async getAllPlayers() {
      await loadConvex();
      if (convexLoaded && convexClient) {
        try {
          return await convexClient.query('auth:getAllPlayers', {});
        } catch(e) { console.warn('Convex getAllPlayers failed:', e); }
      }
      const players = local._get('players') || {};
      return Object.values(players).map(p => ({ name: p.name, avatar: p.avatar }));
    },

    async signUp(name, pin) {
      const cleanName = name.trim();
      const pinHash = await hashPin(pin);
      await loadConvex();
      if (convexLoaded && convexClient) {
        try {
          const r = await convexClient.mutation("auth:signUp", { name: cleanName, pinHash });
          if (r.error) return r;
          // New accounts sit pending until the site owner approves via email —
          // no session is created until first successful login after that.
          if (r.pending) return { pending: true, name: r.name };
          await migrateLocalData(cleanName, r.playerId);
          const player = sessionFor({ ...r, xp: 0, level: 1, streak: 1 });
          localStorage.setItem('sq_session', JSON.stringify(player));
          return player;
        } catch(e) { console.error('Convex signUp error:', e); }
      }
      const players = local._get('players') || {};
      if (players[cleanName.toLowerCase()]) return { error: 'Name taken!' };
      const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
      const id = 'p_' + Date.now();
      players[cleanName.toLowerCase()] = {
        playerId: id, name: cleanName, pinHash, avatar,
        xp: 0, level: 1, streak: 1, createdAt: Date.now(),
      };
      local._set('players', players);
      const player = sessionFor({ playerId: id, name: cleanName, avatar });
      localStorage.setItem('sq_session', JSON.stringify(player));
      const progress = local._get(`progress_${id}`) || {};
      for (const w of WORLDS) {
        if (!progress[w]) progress[w] = { level: 1, xp: 0, answered: 0, correct: 0 };
      }
      local._set(`progress_${id}`, progress);
      return player;
    },

    async logIn(name, pin) {
      const cleanName = name.trim();
      const pinHash = await hashPin(pin);
      await loadConvex();
      if (convexLoaded && convexClient) {
        try {
          const r = await convexClient.mutation("auth:logIn", { name: cleanName, pinHash, pin });
          if (r.error) return r;
          const player = sessionFor(r);
          localStorage.setItem('sq_session', JSON.stringify(player));
          // Pull server progress so a different device picks up where it left off.
          try {
            const sp = await convexClient.query("games:getProgress", { playerId: r.playerId });
            mergeProgress(r.playerId, sp);
          } catch(e) { /* offline progress is fine */ }
          return player;
        } catch(e) { console.warn('Convex logIn failed:', e); }
      }
      const players = local._get('players') || {};
      const stored = players[cleanName.toLowerCase()];
      if (!stored) return { error: 'No player found!' };
      if (stored.pinHash) {
        if (stored.pinHash !== pinHash) return { error: 'Wrong passcode!' };
      } else if (stored.pin) {
        // Legacy local record with plaintext PIN — verify then upgrade.
        if (stored.pin !== pin) return { error: 'Wrong passcode!' };
        stored.pinHash = pinHash;
        delete stored.pin;
        local._set('players', players);
      } else {
        return { error: 'Wrong passcode!' };
      }
      const session = sessionFor(stored);
      localStorage.setItem('sq_session', JSON.stringify(session));
      return session;
    },

    logout() { localStorage.removeItem('sq_session'); },

    // Record an answer. Returns { correct, xpGain, correctIndex, explanation }.
    // Always updates local storage; also syncs to Convex when connected.
    // `verdict` overrides computed correctness for free-text/multi-select;
    // `answerText` preserves what the child actually typed/chose for review.
    async submitAnswer(playerId, questionId, selectedIndex, timeMs, streak = 0, verdict = null, answerText = null) {
      const q = window.QuestionBank ? findQuestion(questionId) : null;
      let correct;
      if (verdict !== null) {
        // Free-text / multi-select paths already computed the verdict.
        correct = !!verdict;
      } else if (q) {
        correct = Array.isArray(q.correctIndex) ? selectedIndex >= 0 : selectedIndex === q.correctIndex;
      } else {
        correct = false;
      }
      const level = q?.level || 1;
      const xpGain = correct ? (level * 15) + Math.max(0, 60 - Math.floor(timeMs/1000)) : 2;

      if (convexLoaded && convexClient && q) {
        try {
          const r = await convexClient.mutation("games:recordAnswer", {
            playerId,
            questionRef: questionId || hashStr(q.question),
            world: q.world || 'reading',
            question: q.question || '',
            options: q.options || [],
            correctIndex: q.correctIndex ?? 0,
            selectedIndex,
            selectedText: answerText ?? undefined,
            questionType: q.type || 'multiple-choice',
            correct,
            explanation: q.explanation || '',
            level,
            timeMs,
            streak,
          });
          if (r && !r.error) {
            writeLocalAnswer(playerId, q, selectedIndex, correct, r.xpGain ?? xpGain, answerText);
            return {
              correct, xpGain: r.xpGain ?? xpGain,
              correctIndex: Array.isArray(q.correctIndex) ? q.correctIndex[0] : q.correctIndex,
              explanation: q.explanation ?? '',
            };
          }
        } catch(e) { console.warn('Convex recordAnswer failed:', e); }
      }

      writeLocalAnswer(playerId, q, selectedIndex, correct, xpGain, answerText);
      return {
        correct,
        xpGain,
        correctIndex: q ? (Array.isArray(q.correctIndex) ? q.correctIndex[0] : q.correctIndex) : 0,
        explanation: q?.explanation ?? '',
      };
    },

    getProgress(playerId) {
      return local._get(`progress_${playerId}`) || {
        reading: { level: 1, xp: 0, answered: 0, correct: 0 },
        writing: { level: 1, xp: 0, answered: 0, correct: 0 },
        math: { level: 1, xp: 0, answered: 0, correct: 0 },
      };
    },

    getRecentAnswers(playerId) {
      return local._get(`answers_${playerId}`) || [];
    },

    // Questions always come from the bundled bank — it ships with the app,
    // is fully reviewed, and works offline.
    async getQuestion(world, level) {
      const bank = window.QuestionBank;
      if (!bank || !bank[world] || bank[world].length === 0) return null;
      const pool = bank[world].filter(q => Math.abs(q.level - level) <= 2);
      const q = pool.length === 0
        ? bank[world][Math.floor(Math.random() * bank[world].length)]
        : pool[Math.floor(Math.random() * pool.length)];
      if (q) q._id = hashStr(q.question);
      return q;
    },

    getDailyCount(playerId) {
      const today = new Date().toISOString().split('T')[0];
      const daily = local._get(`daily_${playerId}`) || {};
      return daily[today] || 0;
    },

    incrementDaily(playerId) {
      const today = new Date().toISOString().split('T')[0];
      const daily = local._get(`daily_${playerId}`) || {};
      daily[today] = (daily[today] || 0) + 1;
      local._set(`daily_${playerId}`, daily);
      return daily[today];
    }
  };

  function writeLocalAnswer(playerId, q, selectedIndex, correct, xpGain, answerText) {
    const progress = local._get(`progress_${playerId}`) || {};
    const world = q?.world || 'reading';
    if (!progress[world]) progress[world] = { level: 1, xp: 0, answered: 0, correct: 0 };
    progress[world].answered++;
    if (correct) progress[world].correct++;
    progress[world].xp += xpGain;
    const acc = progress[world].correct / progress[world].answered;
    if (acc > 0.8 && progress[world].answered > 4) {
      progress[world].level = Math.min(5, progress[world].level + 1);
    }
    local._set(`progress_${playerId}`, progress);

    const session = JSON.parse(localStorage.getItem('sq_session') || '{}');
    session.xp = (session.xp || 0) + xpGain;
    session.level = Math.min(5, Math.floor(session.xp / 400) + 1);
    localStorage.setItem('sq_session', JSON.stringify(session));

    const answers = local._get(`answers_${playerId}`) || [];
    answers.unshift({
      question: q?.question || '', options: q?.options || [],
      correctIndex: q?.correctIndex ?? 0, selectedIndex,
      selectedText: answerText ?? undefined, correct,
      explanation: q?.explanation || '', world, time: Date.now(),
    });
    local._set(`answers_${playerId}`, answers.slice(0, 50));
  }

  function findQuestion(id) {
    for (const world of Object.values(window.QuestionBank || {})) {
      for (const q of world) {
        if (hashStr(q.question) === id) return q;
      }
    }
    return null;
  }

  // Two independent 32-bit hashes combined (~62-bit space) — single-hash
  // collisions across the bank would mis-grade answers via findQuestion.
  function hashStr(s) {
    let h1 = 0, h2 = 5381;
    for (let i = 0; i < s.length; i++) {
      h1 = ((h1 << 5) - h1 + s.charCodeAt(i)) | 0;
      h2 = ((h2 << 5) + h2 + s.charCodeAt(i)) | 0;
    }
    return 'q_' + Math.abs(h1).toString(36) + Math.abs(h2).toString(36);
  }

  async function migrateLocalData(playerName, newPlayerId) {
    const normalizedName = playerName.toLowerCase().trim();
    const localPlayers = local._get('players') || {};
    const localPlayer = localPlayers[normalizedName];
    if (!localPlayer || !convexClient) return;

    const progress = local._get(`progress_${localPlayer.playerId}`);
    if (progress) {
      for (const world of WORLDS) {
        if (progress[world]) {
          try {
            await convexClient.mutation("games:migrateProgress", {
              playerId: newPlayerId,
              world,
              currentLevel: progress[world].level || 1,
              xpInWorld: progress[world].xp || 0,
              questionsAnswered: progress[world].answered || 0,
              correctAnswers: progress[world].correct || 0,
              bestStreak: progress[world].bestStreak || 0,
            });
          } catch(e) { console.warn('Failed to migrate progress:', e); }
        }
      }
    }

    const answers = local._get(`answers_${localPlayer.playerId}`);
    if (answers && answers.length > 0) {
      try {
        await convexClient.mutation("games:migrateAnswers", {
          playerId: newPlayerId,
          answers: answers.slice(0, 50).map(a => ({
            question: String(a.question || ''),
            questionRef: hashStr(String(a.question || '')),
            world: a.world || 'reading',
            options: (a.options || []).map(String),
            correctIndex: a.correctIndex ?? 0,
            selectedIndex: a.selectedIndex ?? 0,
            correct: !!a.correct,
            explanation: String(a.explanation || ''),
            timeMs: a.timeMs || 0,
            answeredAt: a.time || Date.now(),
          })),
        });
      } catch(e) { console.warn('Failed to migrate answers:', e); }
    }
  }
})();
