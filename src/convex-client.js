// SAT Quest — Convex Client
window.SATClient = (function() {
  const CONVEX_URL = 'https://combative-viper-883.eu-west-1.convex.cloud';

  let convexClient = null;
  let convexLoaded = false;
  let loadPromise = null;

  function loadConvex() {
    if (loadPromise) return loadPromise;
    loadPromise = new Promise((resolve) => {
      if (window.convex) { convexLoaded = true; resolve(true); return; }
      console.log('Loading Convex script from CDN...');
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/convex@1.3.1/dist/browser.bundle.js';
      s.crossOrigin = 'anonymous';
      s.onload = () => {
        console.log('Convex script loaded, initializing client...');
        try {
          convexClient = new window.convex.ConvexClient(CONVEX_URL);
          convexLoaded = true;
          console.log('Convex client initialized successfully');
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
      await loadConvex();
      console.log('After await, convexLoaded:', convexLoaded, 'client:', !!convexClient);
      if (convexLoaded && convexClient) {
        try {
          const r = await convexClient.mutation("auth:signUp", { name: name.trim(), pin });
          console.log('Convex signup response:', r);
          if (r.error) return r;
          // Check for local data to migrate
          await migrateLocalData(name.trim(), r.playerId);
          const player = { playerId: r.playerId, name: name.trim(), avatar: r.avatar, xp: 0, level: 1, streak: 1 };
          localStorage.setItem('sq_session', JSON.stringify(player));
          return player;
        } catch(e) { console.error('Convex signUp error:', e); }
      }
      const players = local._get('players') || {};
      if (players[name.toLowerCase().trim()]) return { error: 'Name taken!' };
      const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
      const id = 'p_' + Date.now();
      const player = { playerId: id, name: name.trim(), pin, avatar, xp: 0, level: 1, streak: 1, createdAt: Date.now() };
      players[name.toLowerCase().trim()] = player;
      local._set('players', players);
      localStorage.setItem('sq_session', JSON.stringify(player));
      // Init local progress
      const progress = local._get(`progress_${id}`) || {};
      for (const w of ['reading','writing','math']) {
        if (!progress[w]) progress[w] = { level: 1, xp: 0, answered: 0, correct: 0 };
      }
      local._set(`progress_${id}`, progress);
      return player;
    },

    async logIn(name, pin) {
      await loadConvex();
      if (convexLoaded && convexClient) {
        try {
          const r = await convexClient.mutation("auth:logIn", { name: name.trim(), pin });
          if (r.error) return r;
          const player = { playerId: r.playerId, name: r.name, avatar: r.avatar, xp: r.xp, level: r.level, streak: r.streak };
          localStorage.setItem('sq_session', JSON.stringify(player));
          return player;
        } catch(e) { console.warn('Convex logIn failed:', e); }
      }
      const players = local._get('players') || {};
      const player = players[name.toLowerCase().trim()];
      if (!player) return { error: 'No player found!' };
      if (player.pin !== pin) return { error: 'Wrong passcode!' };
      const session = { playerId: player.playerId, name: player.name, avatar: player.avatar, xp: player.xp||0, level: player.level||1, streak: player.streak||1 };
      localStorage.setItem('sq_session', JSON.stringify(session));
      return session;
    },

    logout() { localStorage.removeItem('sq_session'); },

    async submitAnswer(playerId, questionId, selectedIndex, timeMs) {
      // questionId is the index in our local bank for localStorage mode
      const q = window.QuestionBank ? findQuestion(questionId) : null;
      const correct = q ? selectedIndex === q.correctIndex : false;
      const xpGain = correct ? (q ? (q.level * 10) + Math.max(0, 30 - Math.floor(timeMs/1000)) : 10) : 2;

      if (convexLoaded && convexClient) {
        try {
          return await convexClient.mutation("games:submitAnswer", { playerId, questionId, selectedIndex, timeMs });
        } catch(e) { console.warn('Convex submitAnswer failed:', e); }
      }

      // Local update
      const progress = local._get(`progress_${playerId}`) || {};
      const world = q?.world || 'reading';
      if (!progress[world]) progress[world] = { level: 1, xp: 0, answered: 0, correct: 0 };
      progress[world].answered++;
      if (correct) progress[world].correct++;
      progress[world].xp += xpGain;
      // Level up based on accuracy
      const acc = progress[world].correct / progress[world].answered;
      if (acc > 0.8 && progress[world].answered > 4) {
        progress[world].level = Math.min(10, progress[world].level + 1);
      }
      local._set(`progress_${playerId}`, progress);

      // Update player XP
      const session = JSON.parse(localStorage.getItem('sq_session') || '{}');
      session.xp = (session.xp || 0) + xpGain;
      session.level = Math.floor(session.xp / 500) + 1;
      localStorage.setItem('sq_session', JSON.stringify(session));

      // Save answer for review
      const answers = local._get(`answers_${playerId}`) || [];
      answers.unshift({ question: q?.question||'', options: q?.options||[], correctIndex: q?.correctIndex||0, selectedIndex, correct, explanation: q?.explanation||'', world, time: Date.now() });
      local._set(`answers_${playerId}`, answers.slice(0, 50));

      return { correct, xpGain, correctIndex: q?.correctIndex ?? 0, explanation: q?.explanation ?? '' };
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

    getQuestion(world, level) {
      const bank = window.QuestionBank;
      if (!bank || !bank[world]) return null;
      const pool = bank[world].filter(q => Math.abs(q.level - level) <= 2);
      if (pool.length === 0) return bank[world][Math.floor(Math.random() * bank[world].length)];
      return pool[Math.floor(Math.random() * pool.length)];
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

  function findQuestion(id) {
    // id is a hash or index
    for (const world of Object.values(window.QuestionBank || {})) {
      for (const q of world) {
        if (hashStr(q.question) === id) return q;
      }
    }
    return null;
  }

  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
    return 'q_' + Math.abs(h);
  }

  async function migrateLocalData(playerName, newPlayerId) {
    const normalizedName = playerName.toLowerCase().trim();
    const localPlayers = local._get('players') || {};
    const localPlayer = localPlayers[normalizedName];
    if (!localPlayer) return;

    // Migrate progress
    const progress = local._get(`progress_${localPlayer.playerId}`);
    if (progress) {
      for (const world of ['reading', 'writing', 'math']) {
        if (progress[world]) {
          try {
            await convexClient.mutation("progress:upsertProgress", {
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

    // Migrate answers (last 50)
    const answers = local._get(`answers_${localPlayer.playerId}`);
    if (answers && answers.length > 0) {
      try {
        await convexClient.mutation("answers:migrateAnswers", {
          playerId: newPlayerId,
          answers: answers.slice(0, 50).map(a => ({
            question: a.question,
            selectedIndex: a.selectedIndex,
            correct: a.correct,
            timeMs: a.time || 0,
            world: a.world || 'reading',
            answeredAt: a.time || Date.now(),
          })),
        });
      } catch(e) { console.warn('Failed to migrate answers:', e); }
    }

    console.log('Migration complete for', playerName);
  }
})();
