// SAT Quest — Main App
(function() {
  'use strict';

  const db = window.SATClient;

  const screens = {
    landing: document.getElementById('landing-screen'),
    auth: document.getElementById('auth-screen'),
    dashboard: document.getElementById('dashboard-screen'),
    game: document.getElementById('game-screen'),
    review: document.getElementById('review-screen'),
  };

  const els = {
    landingStartBtn: document.getElementById('landing-start-btn'),
    authBack: document.getElementById('auth-back'),
    loginForm: document.getElementById('login-form'),
    signupForm: document.getElementById('signup-form'),
    loginName: document.getElementById('login-name'),
    loginPin: document.getElementById('login-pin'),
    signupName: document.getElementById('signup-name'),
    signupPin: document.getElementById('signup-pin'),
    loginBtn: document.getElementById('login-btn'),
    signupBtn: document.getElementById('signup-btn'),
    authError: document.getElementById('auth-error'),
    authTabs: document.querySelectorAll('.auth-tab'),
    dashAvatar: document.getElementById('dash-avatar'),
    dashName: document.getElementById('dash-name'),
    dashLevel: document.getElementById('dash-level'),
    statXp: document.getElementById('stat-xp'),
    statStreak: document.getElementById('stat-streak'),
    statAccuracy: document.getElementById('stat-accuracy'),
    logoutBtn: document.getElementById('logout-btn'),
    backBtn: document.getElementById('back-btn'),
    questionArea: document.getElementById('question-area'),
    questionPassage: document.getElementById('question-passage'),
    questionText: document.getElementById('question-text'),
    questionOptions: document.getElementById('question-options'),
    questionFeedback: document.getElementById('question-feedback'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackText: document.getElementById('feedback-text'),
    feedbackExplanation: document.getElementById('feedback-explanation'),
    nextBtn: document.getElementById('next-btn'),
    gameWorldIcon: document.getElementById('game-world-icon'),
    gameLevelLabel: document.getElementById('game-level-label'),
    gameXp: document.getElementById('game-xp'),
    gameStreak: document.getElementById('game-streak'),
    progressBar: document.getElementById('progress-bar'),
    gameMessage: document.getElementById('game-message'),
    dailyDots: document.getElementById('daily-dots'),
    dailyCount: document.getElementById('daily-count'),
    reviewList: document.getElementById('review-list'),
  };

  let player = null;
  let currentWorld = null;
  let questionsAnswered = 0;
  let sessionCorrect = 0;
  let currentQuestion = null;
  let questionStartTime = 0;

  const WORLD_ICONS = { reading: '📖', writing: '✍️', math: '🔢' };
  const WORLD_NAMES = { reading: 'Reading', writing: 'Writing', math: 'Math' };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    if (name === 'dashboard') refreshDashboard();
    if (name === 'review') renderReview();
  }

  // ===== LANDING =====
  els.landingStartBtn.addEventListener('click', () => showScreen('auth'));
  els.authBack.addEventListener('click', () => showScreen('landing'));

  // ===== AUTH =====
  els.authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      els.authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const isLogin = tab.dataset.tab === 'login';
      els.loginForm.classList.toggle('active', isLogin);
      els.signupForm.classList.toggle('active', !isLogin);
      els.authError.textContent = '';
    });
  });

  els.loginBtn.addEventListener('click', async () => {
    const name = els.loginName.value.trim();
    const pin = els.loginPin.value.trim();
    if (!name || !pin) { els.authError.textContent = 'Fill in both fields!'; return; }
    els.authError.textContent = 'Logging in...';
    const result = await db.logIn(name, pin);
    if (result.error) els.authError.textContent = result.error;
    else { player = result; showScreen('dashboard'); }
  });

  els.signupBtn.addEventListener('click', async () => {
    const name = els.signupName.value.trim();
    const pin = els.signupPin.value.trim();
    if (!name || !pin) { els.authError.textContent = 'Fill in both fields!'; return; }
    if (name.length < 2) { els.authError.textContent = 'Name needs 2+ characters!'; return; }
    if (!/^\d{8}$/.test(pin)) { els.authError.textContent = 'PIN = 8 digits (MMDDYYYY)'; return; }
    els.authError.textContent = 'Creating account...';
    const result = await db.signUp(name, pin);
    if (result.error) els.authError.textContent = result.error;
    else { player = result; showScreen('dashboard'); }
  });

  els.logoutBtn.addEventListener('click', () => {
    player = null;
    db.logout();
    showScreen('landing');
  });

  // ===== DASHBOARD =====
  function refreshDashboard() {
    if (!player) return;
    const session = JSON.parse(localStorage.getItem('sq_session') || '{}');
    player = { ...player, ...session };

    els.dashAvatar.textContent = player.avatar || '🚀';
    els.dashName.textContent = player.name;
    els.dashLevel.textContent = `Level ${player.level || 1}`;
    els.statXp.textContent = player.xp || 0;
    els.statStreak.textContent = player.streak || 0;

    const progress = db.getProgress(player.playerId);
    let totalAnswered = 0, totalCorrect = 0;
    for (const world of ['reading', 'writing', 'math']) {
      const p = progress[world] || { level: 1, answered: 0, correct: 0 };
      totalAnswered += p.answered;
      totalCorrect += p.correct;
      const bar = document.getElementById(`${world}-bar`);
      const label = document.getElementById(`${world}-level`);
      if (bar) bar.style.width = (p.level / 10 * 100) + '%';
      if (label) label.textContent = `Level ${p.level}`;
    }
    els.statAccuracy.textContent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) + '%' : '—';

    // Daily challenge
    const dailyCount = db.getDailyCount(player.playerId);
    const dots = els.dailyDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => dot.classList.toggle('filled', i < dailyCount));
    els.dailyCount.textContent = `${Math.min(dailyCount, 5)}/5`;
  }

  // World selection
  document.querySelectorAll('.world-card').forEach(card => {
    card.addEventListener('click', () => startWorld(card.dataset.world));
  });

  // ===== GAME =====
  function startWorld(world) {
    currentWorld = world;
    questionsAnswered = 0;
    sessionCorrect = 0;
    showScreen('game');
    loadNextQuestion();
  }

  function loadNextQuestion() {
    const progress = db.getProgress(player.playerId);
    const worldProgress = progress[currentWorld] || { level: 1 };
    const level = worldProgress.level;

    currentQuestion = db.getQuestion(currentWorld, level);
    if (!currentQuestion) {
      els.questionText.textContent = 'No more questions! Check back later.';
      els.questionOptions.innerHTML = '';
      els.questionFeedback.classList.add('hidden');
      return;
    }

    // Store question reference
    currentQuestion._hash = hashStr(currentQuestion.question);

    els.gameWorldIcon.textContent = WORLD_ICONS[currentWorld];
    els.gameLevelLabel.textContent = `Level ${level}`;
    els.gameXp.textContent = `⚡ ${player.xp || 0}`;
    els.gameStreak.textContent = `🔥 ${player.streak || 0}`;

    // Show passage if present
    if (currentQuestion.passage) {
      els.questionPassage.textContent = currentQuestion.passage;
      els.questionPassage.classList.remove('hidden');
    } else {
      els.questionPassage.classList.add('hidden');
    }

    els.questionText.textContent = currentQuestion.question;
    els.questionOptions.innerHTML = '';
    els.questionFeedback.classList.add('hidden');

    currentQuestion.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(i));
      els.questionOptions.appendChild(btn);
    });

    questionStartTime = Date.now();
    els.gameMessage.textContent = `${WORLD_NAMES[currentWorld]} · ${currentQuestion.tags?.join(', ') || ''}`;
  }

  async function handleAnswer(selectedIndex) {
    const timeMs = Date.now() - questionStartTime;
    const btns = els.questionOptions.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    const result = await db.submitAnswer(player.playerId, currentQuestion._hash, selectedIndex, timeMs);

    // Highlight correct/wrong
    btns[selectedIndex].classList.add(result.correct ? 'correct' : 'wrong');
    if (!result.correct) btns[result.correctIndex].classList.add('correct');

    questionsAnswered++;

    // XP popup
    if (result.correct) {
      sessionCorrect++;
      const popup = document.createElement('div');
      popup.className = 'xp-popup';
      popup.textContent = `+${result.xpGain} XP`;
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 1000);

      // Update session XP
      player.xp = (player.xp || 0) + result.xpGain;
      player.level = Math.floor(player.xp / 500) + 1;
      localStorage.setItem('sq_session', JSON.stringify(player));
    }

    // Daily challenge
    db.incrementDaily(player.playerId);

    // Show feedback
    els.feedbackIcon.textContent = result.correct ? '🎯' : '💪';
    els.feedbackText.textContent = result.correct ? 'Nice one!' : 'Not quite — but now you know!';
    els.feedbackExplanation.textContent = result.explanation;
    els.questionFeedback.classList.remove('hidden');

    els.gameXp.textContent = `⚡ ${player.xp || 0}`;
    els.progressBar.style.width = Math.min(100, (questionsAnswered / 10) * 100) + '%';

    if (questionsAnswered >= 10) {
      els.nextBtn.textContent = 'Finish 🎉';
      els.nextBtn.onclick = finishSession;
    } else {
      els.nextBtn.textContent = 'Next →';
      els.nextBtn.onclick = loadNextQuestion;
    }
  }

  function finishSession() {
    const accuracy = questionsAnswered > 0 ? Math.round((sessionCorrect / questionsAnswered) * 100) : 0;
    showScreen('dashboard');

    // Show a quick summary
    setTimeout(() => {
      const msg = accuracy >= 80 ? `🔥 ${accuracy}% accuracy! You're crushing it!` :
                  accuracy >= 50 ? `👍 ${accuracy}% — solid session! Keep going!` :
                  `💪 ${accuracy}% — every question makes you stronger!`;
      alert(`${WORLD_NAMES[currentWorld]} Session Complete!\n\n${msg}\n\nXP earned: ${sessionCorrect * 10}\nQuestions: ${questionsAnswered}`);
    }, 200);
  }

  // ===== REVIEW =====
  function renderReview() {
    const answers = db.getRecentAnswers(player.playerId);
    if (answers.length === 0) {
      els.reviewList.innerHTML = '<p style="text-align:center;color:var(--text-dim);padding:40px;">No answers yet! Play some questions first.</p>';
      return;
    }
    els.reviewList.innerHTML = answers.map(a => `
      <div class="review-card ${a.correct ? 'correct-card' : ''}">
        <h4>${WORLD_ICONS[a.world] || '📝'} ${a.correct ? '✅ Correct' : '❌ Incorrect'}</h4>
        <p><strong>Q:</strong> ${a.question}</p>
        ${!a.correct ? `<p style="color:var(--danger);margin-top:4px;">Your answer: ${a.options[a.selectedIndex] || '?'}</p>` : ''}
        <p style="color:var(--success);margin-top:4px;">Correct: ${a.options[a.correctIndex] || '?'}</p>
        <p style="margin-top:6px;font-style:italic;">${a.explanation}</p>
      </div>
    `).join('');
  }

  // ===== NAV =====
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.view));
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showScreen('dashboard'));
  });

  // ===== UTILS =====
  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
    return 'q_' + Math.abs(h);
  }

  // ===== MINI GAMES =====
  document.querySelectorAll('.mini-game-card').forEach(card => {
    card.addEventListener('click', () => startMiniGame(card.dataset.game));
  });

  function startMiniGame(gameId) {
    if (gameId === 'speed-math') startSpeedMath();
    // Other games can be added here
  }

  function startSpeedMath() {
    showScreen('game');
    els.backBtn.onclick = () => showScreen('dashboard');
    els.questionPassage.classList.add('hidden');
    els.questionFeedback.classList.add('hidden');
    els.progressBar.style.width = '0%';

    const problems = [
      { q: '15 × 12', a: 180 }, { q: '23 × 7', a: 161 }, { q: '144 ÷ 12', a: 12 },
      { q: '45 + 67', a: 112 }, { q: '200 - 87', a: 113 }, { q: '8 × 9', a: 72 },
      { q: '250 ÷ 5', a: 50 }, { q: '36 + 48', a: 84 }, { q: '17 × 6', a: 102 },
      { q: '300 - 156', a: 144 }, { q: '12 × 11', a: 132 }, { q: '72 ÷ 8', a: 9 },
      { q: '56 + 89', a: 145 }, { q: '9 × 7', a: 63 }, { q: '240 ÷ 6', a: 40 },
    ];

    let current = 0;
    let score = 0;
    let startTime = Date.now();
    let timeLimit = 60000; // 60 seconds

    function showProblem() {
      if (current >= problems.length || (Date.now() - startTime) > timeLimit) {
        finishSpeedMath(score, current);
        return;
      }

      const p = problems[current];
      els.questionText.innerHTML = '';
      els.questionOptions.innerHTML = `
        <div class="speed-math-area">
          <div class="speed-timer" id="speed-timer">⏱️ 60s</div>
          <div class="speed-problem">${p.q} = ?</div>
          <input type="number" class="speed-input" id="speed-answer" autofocus>
          <p class="speed-score" id="speed-score">Score: ${score}/${current}</p>
        </div>
      `;

      const input = document.getElementById('speed-answer');
      const timer = document.getElementById('speed-timer');

      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const answer = parseInt(input.value);
          if (answer === p.a) {
            score++;
            input.style.borderColor = 'var(--success)';
          } else {
            input.style.borderColor = 'var(--danger)';
            input.value = p.a;
          }
          current++;
          els.progressBar.style.width = Math.min(100, (current / problems.length) * 100) + '%';
          setTimeout(showProblem, 400);
        }
      });

      // Timer
      const timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, Math.ceil((timeLimit - elapsed) / 1000));
        if (timer) timer.textContent = `⏱️ ${remaining}s`;
        if (remaining <= 0) {
          clearInterval(timerInterval);
          finishSpeedMath(score, current);
        }
      }, 1000);
    }

    showProblem();
  }

  function finishSpeedMath(score, total) {
    const xpEarned = score * 5;
    player.xp = (player.xp || 0) + xpEarned;
    player.level = Math.floor(player.xp / 500) + 1;
    localStorage.setItem('sq_session', JSON.stringify(player));

    showScreen('dashboard');
    setTimeout(() => {
      const msg = score >= 12 ? '🔥 Math speed demon!' : score >= 8 ? '⚡ Quick thinker!' : '💪 Keep practicing!';
      alert(`Speed Math Complete!\n\n${msg}\n\nScore: ${score}/${total}\nXP earned: +${xpEarned}`);
    }, 200);
  }

  // ===== INIT =====
  function init() {
    const session = JSON.parse(localStorage.getItem('sq_session') || 'null');
    if (session && session.playerId) {
      player = session;
      showScreen('dashboard');
    } else {
      showScreen('landing');
    }
  }

  init();
})();
