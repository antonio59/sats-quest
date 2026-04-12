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
    reports: document.getElementById('reports-screen'),
  };

  const els = {
    landingStartBtn: document.getElementById('landing-start-btn'),
    authProfiles: document.getElementById('auth-profiles'),
    authPin: document.getElementById('auth-pin'),
    authSignup: document.getElementById('auth-signup'),
    profileGrid: document.getElementById('profile-grid'),
    newPlayerBtn: document.getElementById('new-player-btn'),
    pinBack: document.getElementById('pin-back'),
    pinAvatar: document.getElementById('pin-avatar'),
    pinName: document.getElementById('pin-name'),
    pinDots: document.getElementById('pin-dots'),
    pinError: document.getElementById('pin-error'),
    pinNumpad: document.getElementById('pin-numpad'),
    signupBack: document.getElementById('signup-back'),
    signupAvatars: document.getElementById('signup-avatars'),
    signupName: document.getElementById('signup-name'),
    signupPin: document.getElementById('signup-pin'),
    signupPinConfirm: document.getElementById('signup-pin-confirm'),
    signupError: document.getElementById('signup-error'),
    signupBtn: document.getElementById('signup-btn'),
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
  const WORLD_NAMES = { reading: 'Reading', writing: 'Grammar', math: 'Maths' };
  const XP_PER_LEVEL = 400;
  const MAX_LEVEL = 5;

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    if (name === 'auth') { loadProfiles(); els.authProfiles.style.display = 'flex'; els.authPin.style.display = 'none'; els.authSignup.style.display = 'none'; }
    if (name === 'dashboard') { refreshDashboard(); checkAchievements(); renderBadges(); }
    if (name === 'review') renderReview();
    if (name === 'reports') renderReports();
  }

  // ===== LANDING =====
  els.landingStartBtn.addEventListener('click', () => showScreen('auth'));

  // ===== AUTH =====
  const PIN_LENGTH = 6;
  const PROFILE_COLORS = [
    'linear-gradient(135deg, #fbbf24, #f97316)',
    'linear-gradient(135deg, #60a5fa, #a855f7)',
    'linear-gradient(135deg, #4ade80, #10b981)',
    'linear-gradient(135deg, #f472b6, #ef4444)',
    'linear-gradient(135deg, #22d3ee, #14b8a6)',
    'linear-gradient(135deg, #818cf8, #7c3aed)',
  ];
  const AVATARS = ['🦊','🐱','🐶','🦁','🐼','🐨','🦄','🐸','🐙','🦋','🐢','🦖','🐧','🦜','🐝','🦉','🐯','🐲','🐵'];
  let selectedProfile = null;
  let currentPin = '';
  let selectedSignupAvatar = '🦊';

  function loadProfiles() {
    db.getAllPlayers().then(players => {
      renderProfiles(players || []);
    }).catch(() => renderProfilesFromLocal());
  }

  function renderProfilesFromLocal() {
    const players = JSON.parse(localStorage.getItem('sq_players') || '{}');
    const list = Object.values(players).map(p => ({ name: p.name, avatar: p.avatar }));
    renderProfiles(list);
  }

  function renderProfiles(players) {
    els.profileGrid.innerHTML = '';
    if (players.length === 0) {
      els.authProfiles.style.display = 'none';
      els.authSignup.style.display = 'flex';
      renderSignupAvatars();
      return;
    }
    players.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'profile-card';
      card.style.background = PROFILE_COLORS[i % PROFILE_COLORS.length];
      card.innerHTML = `<span class="profile-card-emoji">${p.avatar}</span><span class="profile-card-name" style="color:white;">${p.name}</span>`;
      card.addEventListener('click', () => selectProfile(p));
      els.profileGrid.appendChild(card);
    });
  }

  function selectProfile(profile) {
    selectedProfile = profile;
    currentPin = '';
    els.pinAvatar.textContent = profile.avatar;
    els.pinName.textContent = profile.name;
    renderPinDots();
    els.pinError.textContent = '';
    els.authProfiles.style.display = 'none';
    els.authPin.style.display = 'flex';
  }

  function renderPinDots() {
    els.pinDots.innerHTML = '';
    for (let i = 0; i < PIN_LENGTH; i++) {
      const dot = document.createElement('div');
      dot.className = 'pin-dot' + (i < currentPin.length ? ' filled' : '');
      els.pinDots.appendChild(dot);
    }
  }

  function buildNumpad() {
    els.pinNumpad.innerHTML = '';
    for (let n = 1; n <= 9; n++) {
      const btn = document.createElement('button');
      btn.className = 'pin-num';
      btn.textContent = n;
      btn.addEventListener('click', () => handlePinDigit(n.toString()));
      els.pinNumpad.appendChild(btn);
    }
    const spacer = document.createElement('div');
    els.pinNumpad.appendChild(spacer);
    const zero = document.createElement('button');
    zero.className = 'pin-num';
    zero.textContent = '0';
    zero.addEventListener('click', () => handlePinDigit('0'));
    els.pinNumpad.appendChild(zero);
    const back = document.createElement('button');
    back.className = 'pin-num-back';
    back.textContent = '⌫';
    back.addEventListener('click', handlePinBackspace);
    els.pinNumpad.appendChild(back);
  }
  buildNumpad();

  async function handlePinDigit(digit) {
    if (currentPin.length >= PIN_LENGTH || !selectedProfile) return;
    currentPin += digit;
    renderPinDots();
    if (currentPin.length === PIN_LENGTH) {
      els.pinError.textContent = '';
      const result = await db.logIn(selectedProfile.name, currentPin);
      if (result.error) {
        els.pinError.textContent = result.error;
        currentPin = '';
        renderPinDots();
      } else {
        player = result;
        showScreen('dashboard');
      }
    }
  }

  function handlePinBackspace() {
    currentPin = currentPin.slice(0, -1);
    renderPinDots();
    els.pinError.textContent = '';
  }

  els.pinBack.addEventListener('click', () => {
    selectedProfile = null;
    currentPin = '';
    els.authPin.style.display = 'none';
    els.authProfiles.style.display = 'flex';
  });

  els.newPlayerBtn.addEventListener('click', () => {
    selectedSignupAvatar = '🦊';
    els.authProfiles.style.display = 'none';
    els.authSignup.style.display = 'flex';
    renderSignupAvatars();
  });

  function renderSignupAvatars() {
    els.signupAvatars.innerHTML = '';
    AVATARS.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'signup-avatar-btn' + (a === selectedSignupAvatar ? ' selected' : '');
      btn.textContent = a;
      btn.addEventListener('click', () => {
        selectedSignupAvatar = a;
        renderSignupAvatars();
      });
      els.signupAvatars.appendChild(btn);
    });
  }

  els.signupBack.addEventListener('click', () => {
    els.authSignup.style.display = 'none';
    els.authProfiles.style.display = 'flex';
    els.signupError.textContent = '';
  });

  els.signupBtn.addEventListener('click', async () => {
    const name = els.signupName.value.trim();
    const pin = els.signupPin.value.trim();
    const confirm = els.signupPinConfirm.value.trim();
    if (!name || !pin) { els.signupError.textContent = 'Fill in all fields!'; return; }
    if (name.length < 2) { els.signupError.textContent = 'Name needs 2+ characters!'; return; }
    if (!/^\d{6}$/.test(pin)) { els.signupError.textContent = 'Passcode must be 6 digits'; return; }
    if (pin !== confirm) { els.signupError.textContent = 'PINs don\'t match!'; return; }
    els.signupError.textContent = 'Creating account...';
    const result = await db.signUp(name, pin);
    if (result.error) els.signupError.textContent = result.error;
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
      if (bar) bar.style.width = (p.level / MAX_LEVEL * 100) + '%';
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
  async function startWorld(world) {
    currentWorld = world;
    questionsAnswered = 0;
    sessionCorrect = 0;
    showScreen('game');
    await loadNextQuestion();
  }

  async function loadNextQuestion() {
    const progress = db.getProgress(player.playerId);
    const worldProgress = progress[currentWorld] || { level: 1 };
    const level = worldProgress.level;

    currentQuestion = await db.getQuestion(currentWorld, level);
    // Fallback to dynamic generator for maths if static bank is exhausted
    if (!currentQuestion && currentWorld === 'math' && window.QuestionGenerator) {
      currentQuestion = window.QuestionGenerator.generate(level);
    }
    if (!currentQuestion) {
      els.questionText.textContent = 'No more questions! Check back later.';
      els.questionOptions.innerHTML = '';
      els.questionFeedback.classList.add('hidden');
      return;
    }

    // Store question reference (defensive)
    if (currentQuestion && currentQuestion.question) {
      currentQuestion._hash = hashStr(currentQuestion.question);
    } else {
      currentQuestion._hash = currentQuestion._id || 'q_' + Date.now();
    }

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

    const qType = currentQuestion.type || 'multiple-choice';

    if (qType === 'text-input') {
      // Free-text answer input
      const wrapper = document.createElement('div');
      wrapper.className = 'text-input-wrapper';
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'text-answer-input';
      input.placeholder = 'Type your answer here...';
      input.autocomplete = 'off';
      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn';
      submitBtn.textContent = 'Submit ✔';
      submitBtn.addEventListener('click', () => {
        const userAnswer = input.value.trim();
        if (!userAnswer) return;
        submitBtn.disabled = true;
        input.disabled = true;
        // Check against accepted answers (correctIndex stores index, options[0] is the canonical answer)
        const accepted = (currentQuestion.options || []).map(a => a.toLowerCase().replace(/[^a-z0-9]/g, ''));
        const normalised = userAnswer.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isCorrect = accepted.includes(normalised);
        handleAnswerResult(isCorrect ? currentQuestion.correctIndex : -1, isCorrect);
      });
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitBtn.click(); });
      wrapper.appendChild(input);
      wrapper.appendChild(submitBtn);
      els.questionOptions.appendChild(wrapper);
    } else if (qType === 'true-false') {
      // Two-button true/false
      ['True', 'False'].forEach((label, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn tf-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => handleAnswer(i));
        els.questionOptions.appendChild(btn);
      });
    } else if (qType === 'multi-select') {
      // Checkboxes — user selects multiple, then submits
      const selectedSet = new Set();
      currentQuestion.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn multi-select-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          if (selectedSet.has(i)) { selectedSet.delete(i); btn.classList.remove('selected'); }
          else { selectedSet.add(i); btn.classList.add('selected'); }
        });
        els.questionOptions.appendChild(btn);
      });
      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn multi-submit-btn';
      submitBtn.textContent = 'Submit ✔';
      submitBtn.addEventListener('click', () => {
        if (selectedSet.size === 0) return;
        submitBtn.disabled = true;
        // correctIndex is an array for multi-select, e.g. [0, 2]
        const correctSet = new Set(Array.isArray(currentQuestion.correctIndex) ? currentQuestion.correctIndex : [currentQuestion.correctIndex]);
        const isCorrect = selectedSet.size === correctSet.size && [...selectedSet].every(i => correctSet.has(i));
        // Highlight correct/wrong
        const btns = els.questionOptions.querySelectorAll('.multi-select-btn');
        btns.forEach((b, idx) => {
          b.disabled = true;
          if (correctSet.has(idx)) b.classList.add('correct');
          if (selectedSet.has(idx) && !correctSet.has(idx)) b.classList.add('wrong');
        });
        handleAnswerResult(isCorrect ? 0 : -1, isCorrect);
      });
      els.questionOptions.appendChild(submitBtn);
    } else {
      // Default: multiple-choice
      currentQuestion.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleAnswer(i));
        els.questionOptions.appendChild(btn);
      });
    }

    questionStartTime = Date.now();
    els.gameMessage.textContent = `${WORLD_NAMES[currentWorld]} · ${currentQuestion.tags?.join(', ') || ''}`;
  }

  async function handleAnswer(selectedIndex) {
    const timeMs = Date.now() - questionStartTime;
    const btns = els.questionOptions.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    const qId = currentQuestion._id || currentQuestion._hash;
    const result = await db.submitAnswer(player.playerId, qId, selectedIndex, timeMs, player.streak || 0);

    // Highlight correct/wrong for standard MC and true-false
    if (btns[selectedIndex]) btns[selectedIndex].classList.add(result.correct ? 'correct' : 'wrong');
    if (!result.correct && btns[result.correctIndex]) btns[result.correctIndex].classList.add('correct');

    handleAnswerCommon(result);
  }

  // Shared post-answer logic for all question types
  function handleAnswerResult(selectedIndex, isCorrect) {
    const timeMs = Date.now() - questionStartTime;
    const qId = currentQuestion._id || currentQuestion._hash;
    // Build a result object locally for non-standard types
    const xpGain = isCorrect ? ((currentQuestion.level || 1) * 15) + Math.max(0, 60 - Math.floor(timeMs / 1000)) : 2;
    const result = {
      correct: isCorrect,
      xpGain,
      streakBonus: 0,
      correctIndex: Array.isArray(currentQuestion.correctIndex) ? currentQuestion.correctIndex[0] : currentQuestion.correctIndex,
      explanation: currentQuestion.explanation,
    };
    // Still record the answer
    db.submitAnswer(player.playerId, qId, selectedIndex, timeMs, player.streak || 0);
    handleAnswerCommon(result);
  }

  function handleAnswerCommon(result) {
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
      player.level = Math.min(MAX_LEVEL, Math.floor(player.xp / XP_PER_LEVEL) + 1);
      localStorage.setItem('sq_session', JSON.stringify(player));
    }

    // Daily challenge
    db.incrementDaily(player.playerId);

    // Check achievements
    checkAchievements();

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
      els.nextBtn.onclick = () => loadNextQuestion();
    }
  }

  function finishSession() {
    const accuracy = questionsAnswered > 0 ? Math.round((sessionCorrect / questionsAnswered) * 100) : 0;
    if (questionsAnswered >= 10 && sessionCorrect >= 10) {
      localStorage.setItem('sq_badge_perfect-session', 'true');
    }
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

  // ===== REPORT PROBLEM =====
  const reportBtn = document.getElementById('report-btn');
  const reportModal = document.getElementById('report-modal');
  const reportBackdrop = document.getElementById('report-backdrop');
  const reportText = document.getElementById('report-text');
  const reportSendBtn = document.getElementById('report-send-btn');
  const reportCancelBtn = document.getElementById('report-cancel-btn');
  const reportSuccess = document.getElementById('report-success');

  reportBtn.addEventListener('click', () => {
    reportModal.classList.remove('hidden');
    reportText.value = '';
    reportSuccess.classList.add('hidden');
    reportText.focus();
  });

  reportBackdrop.addEventListener('click', () => reportModal.classList.add('hidden'));
  reportCancelBtn.addEventListener('click', () => reportModal.classList.add('hidden'));

  reportSendBtn.addEventListener('click', async () => {
    const desc = reportText.value.trim();
    if (!desc) { reportText.style.borderColor = 'var(--danger)'; return; }

    const screen = document.querySelector('.screen.active')?.id || 'unknown';
    reportSendBtn.disabled = true;
    reportSendBtn.textContent = 'Sending...';

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: desc,
          player: { name: player?.name, level: player?.level, xp: player?.xp },
          screen,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        reportSuccess.classList.remove('hidden');
        reportText.style.borderColor = 'transparent';
        setTimeout(() => reportModal.classList.add('hidden'), 2000);
      } else {
        alert('Failed to send report. Please try again.');
      }
    } catch (e) {
      alert('Failed to send report. Please try again.');
    }

    reportSendBtn.disabled = false;
    reportSendBtn.textContent = 'Send Report 📧';
  });

  // ===== EXAM MODE =====
  const examState = { questions: [], answers: [], current: 0, config: null, startTime: 0, timerInterval: null, elapsed: 0 };

  // Exam card clicks on dashboard
  document.querySelectorAll('.exam-card').forEach(card => {
    card.addEventListener('click', () => startExamFromDashboard(card.dataset.exam));
  });

  function startExamFromDashboard(world) {
    const config = window.ExamEngine.getExamConfig(world);
    examState.questions = window.ExamEngine.selectQuestions(world, config.questions);
    examState.answers = new Array(examState.questions.length).fill(-1);
    examState.current = 0;
    examState.config = config;
    examState.startTime = Date.now();
    examState.elapsed = 0;

    showScreen('game');
    // Hijack game screen for exam
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('exam-active-screen').classList.add('active');

    showExamQuestion();
    startExamTimer();
  }

  function showExamQuestion() {
    const q = examState.questions[examState.current];
    if (!q) return;

    document.getElementById('exam-progress-text').textContent = `${examState.current + 1} / ${examState.questions.length}`;

    // Passage
    const passageEl = document.getElementById('exam-passage');
    if (q.passage) {
      passageEl.textContent = q.passage;
      passageEl.classList.remove('hidden');
    } else {
      passageEl.classList.add('hidden');
    }

    // Question
    document.getElementById('exam-question-text').textContent = q.question;

    // Options — handle different question types
    const optionsEl = document.getElementById('exam-options');
    optionsEl.innerHTML = '';
    const qType = q.type || 'multiple-choice';

    if (qType === 'text-input') {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'text-input-answer';
      input.placeholder = 'Type your answer...';
      input.value = typeof examState.answers[examState.current] === 'string' ? examState.answers[examState.current] : '';
      input.addEventListener('input', () => {
        examState.answers[examState.current] = input.value.trim();
      });
      optionsEl.appendChild(input);
    } else if (qType === 'multi-select') {
      const currentSel = Array.isArray(examState.answers[examState.current]) ? examState.answers[examState.current] : [];
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn multi-select-btn';
        btn.textContent = opt;
        if (currentSel.includes(i)) btn.classList.add('selected');
        btn.addEventListener('click', () => {
          let sel = Array.isArray(examState.answers[examState.current]) ? [...examState.answers[examState.current]] : [];
          if (sel.includes(i)) sel = sel.filter(x => x !== i);
          else sel.push(i);
          examState.answers[examState.current] = sel;
          showExamQuestion();
        });
        optionsEl.appendChild(btn);
      });
      const hint = document.createElement('p');
      hint.className = 'multi-select-hint';
      hint.textContent = 'Select all that apply';
      optionsEl.appendChild(hint);
    } else {
      // multiple-choice and true-false
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        if (examState.answers[examState.current] === i) btn.style.borderColor = 'var(--accent)';
        btn.addEventListener('click', () => {
          examState.answers[examState.current] = i;
          showExamQuestion();
        });
        optionsEl.appendChild(btn);
      });
    }

    // Nav dots
    const dotsEl = document.getElementById('exam-nav-dots');
    dotsEl.innerHTML = '';
    examState.questions.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'exam-dot';
      const ans = examState.answers[i];
      const isAnswered = Array.isArray(ans) ? ans.length > 0 : (typeof ans === 'string' ? ans.length > 0 : ans >= 0);
      if (isAnswered) dot.classList.add('answered');
      if (i === examState.current) dot.classList.add('current');
      dot.addEventListener('click', () => { examState.current = i; showExamQuestion(); });
      dotsEl.appendChild(dot);
    });

    // Nav buttons
    document.getElementById('exam-prev-btn').disabled = examState.current === 0;
    document.getElementById('exam-next-btn').textContent = examState.current === examState.questions.length - 1 ? 'Finish →' : 'Next →';
  }

  document.getElementById('exam-prev-btn').addEventListener('click', () => {
    if (examState.current > 0) { examState.current--; showExamQuestion(); }
  });

  document.getElementById('exam-next-btn').addEventListener('click', () => {
    if (examState.current < examState.questions.length - 1) { examState.current++; showExamQuestion(); }
    else finishExam();
  });

  document.getElementById('exam-finish-btn').addEventListener('click', () => {
    if (confirm('Finish exam? You can\'t go back after this.')) finishExam();
  });

  function startExamTimer() {
    const totalMs = examState.config.timeMinutes * 60 * 1000;
    examState.timerInterval = setInterval(() => {
      examState.elapsed = Date.now() - examState.startTime;
      const remaining = Math.max(0, totalMs - examState.elapsed);
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      document.getElementById('exam-timer').textContent = `⏱️ ${mins}:${secs.toString().padStart(2, '0')}`;
      if (remaining <= 0) {
        document.getElementById('exam-timer').style.color = 'var(--danger)';
        finishExam();
      }
    }, 1000);
  }

  function finishExam() {
    clearInterval(examState.timerInterval);
    document.getElementById('exam-active-screen').classList.remove('active');

    // Score — handle different question types
    let correct = 0;
    examState.questions.forEach((q, i) => {
      const answer = examState.answers[i];
      const qType = q.type || 'multiple-choice';
      if (qType === 'text-input') {
        // Accept any option as correct (options array holds acceptable answers)
        const userAns = (typeof answer === 'string' ? answer : '').toLowerCase().trim();
        const isCorrect = q.options.some(opt => opt.toLowerCase().trim() === userAns);
        if (isCorrect) correct++;
      } else if (qType === 'multi-select' && Array.isArray(q.correctIndex)) {
        const sel = Array.isArray(answer) ? [...answer].sort() : [];
        const expected = [...q.correctIndex].sort();
        if (JSON.stringify(sel) === JSON.stringify(expected)) correct++;
      } else {
        if (answer === q.correctIndex) correct++;
      }
    });
    const total = examState.questions.length;
    const percent = Math.round((correct / total) * 100);
    const timeMins = Math.round(examState.elapsed / 60000);

    // Award XP
    const xpEarned = correct * 15;
    player.xp = (player.xp || 0) + xpEarned;
    player.level = Math.min(MAX_LEVEL, Math.floor(player.xp / XP_PER_LEVEL) + 1);
    localStorage.setItem('sq_session', JSON.stringify(player));

    // Results screen
    document.getElementById('exam-results-screen').classList.add('active');
    document.getElementById('exam-score-percent').textContent = percent + '%';
    document.getElementById('exam-correct-count').textContent = correct;
    document.getElementById('exam-wrong-count').textContent = total - correct;
    document.getElementById('exam-time-taken').textContent = timeMins + 'm';

    // Score label
    const label = percent >= 80 ? '🌟 Excellent!' : percent >= 60 ? '👍 Good job!' : percent >= 40 ? '💪 Getting there' : '📝 Keep practicing';
    document.getElementById('exam-score-mark').textContent = label;

    // Score circle colour
    const circle = document.getElementById('exam-score-circle');
    circle.style.borderColor = percent >= 60 ? 'var(--success)' : percent >= 40 ? 'var(--gold)' : 'var(--primary)';

    // Breakdown
    const breakdown = document.getElementById('exam-results-breakdown');
    breakdown.innerHTML = examState.questions.map((q, i) => {
      const answer = examState.answers[i];
      const qType = q.type || 'multiple-choice';
      let wasCorrect = false;
      if (qType === 'text-input') {
        const userAns = (typeof answer === 'string' ? answer : '').toLowerCase().trim();
        wasCorrect = q.options.some(opt => opt.toLowerCase().trim() === userAns);
      } else if (qType === 'multi-select' && Array.isArray(q.correctIndex)) {
        const sel = Array.isArray(answer) ? [...answer].sort() : [];
        wasCorrect = JSON.stringify(sel) === JSON.stringify([...q.correctIndex].sort());
      } else {
        wasCorrect = answer === q.correctIndex;
      }
      const worldIcon = q.world === 'reading' ? '📖' : q.world === 'writing' ? '✍️' : '🔢';
      return `<div class="exam-result-row">
        <span class="exam-result-icon">${wasCorrect ? '✅' : '❌'}</span>
        <span>${worldIcon} ${q.question.substring(0, 60)}${q.question.length > 60 ? '...' : ''}</span>
      </div>`;
    }).join('');

    // Buttons
    document.getElementById('exam-review-btn').onclick = () => {
      document.getElementById('exam-results-screen').classList.remove('active');
      showExamReview();
    };
    document.getElementById('exam-retry-btn').onclick = () => {
      document.getElementById('exam-results-screen').classList.remove('active');
      startExamFromDashboard(Object.keys(window.ExamEngine.getAllExams()).find(k =>
        window.ExamEngine.getAllExams(k).name === examState.config.name
      ) || 'reading');
    };
    document.getElementById('exam-home-btn').onclick = () => {
      document.getElementById('exam-results-screen').classList.remove('active');
      showScreen('dashboard');
    };
  }

  function showExamReview() {
    // Show review screen with exam answers
    const list = document.getElementById('review-list');
    list.innerHTML = examState.questions.map((q, i) => {
      const answer = examState.answers[i];
      const qType = q.type || 'multiple-choice';
      let wasCorrect = false;
      let userAnswerStr = 'Skipped';
      let correctAnswerStr = '';

      if (qType === 'text-input') {
        const userAns = (typeof answer === 'string' ? answer : '').toLowerCase().trim();
        wasCorrect = q.options.some(opt => opt.toLowerCase().trim() === userAns);
        userAnswerStr = answer || 'Skipped';
        correctAnswerStr = q.options[0];
      } else if (qType === 'multi-select' && Array.isArray(q.correctIndex)) {
        const sel = Array.isArray(answer) ? [...answer].sort() : [];
        wasCorrect = JSON.stringify(sel) === JSON.stringify([...q.correctIndex].sort());
        userAnswerStr = Array.isArray(answer) ? answer.map(idx => q.options[idx]).join(', ') : 'Skipped';
        correctAnswerStr = q.correctIndex.map(idx => q.options[idx]).join(', ');
      } else {
        wasCorrect = answer === q.correctIndex;
        userAnswerStr = typeof answer === 'number' ? (q.options[answer] || 'Skipped') : 'Skipped';
        correctAnswerStr = q.options[q.correctIndex];
      }

      const worldIcon = q.world === 'reading' ? '📖' : q.world === 'writing' ? '✍️' : '🔢';
      return `<div class="review-card ${wasCorrect ? 'correct-card' : ''}">
        <h4>${worldIcon} ${wasCorrect ? '✅' : '❌'} Question ${i + 1}</h4>
        ${q.passage ? `<p style="font-style:italic;color:var(--text-dim);margin-bottom:6px;">${q.passage.substring(0, 100)}...</p>` : ''}
        <p><strong>Q:</strong> ${q.question}</p>
        ${!wasCorrect ? `<p style="color:var(--danger);margin-top:4px;">Your answer: ${userAnswerStr}</p>` : ''}
        <p style="color:var(--success);margin-top:4px;">Correct: ${correctAnswerStr}</p>
        <p style="margin-top:6px;font-style:italic;">${q.explanation}</p>
      </div>`;
    }).join('');
    showScreen('review');
  }

  // ===== REPORTS =====
  function renderReports() {
    if (!player) return;
    const answers = db.getRecentAnswers(player.playerId);
    const progress = db.getProgress(player.playerId);

    // Calculate per-tag stats
    const tagStats = {};
    for (const a of answers) {
      const q = findQuestionFromAnswer(a);
      if (!q || !q.tags) continue;
      for (const tag of q.tags) {
        if (!tagStats[tag]) tagStats[tag] = { correct: 0, total: 0 };
        tagStats[tag].total++;
        if (a.correct) tagStats[tag].correct++;
      }
    }

    // Sort tags by accuracy
    const tagList = Object.entries(tagStats).map(([tag, stats]) => ({
      tag,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      total: stats.total,
    })).sort((a, b) => b.accuracy - a.accuracy);

    // Categorize
    const excels = tagList.filter(t => t.accuracy >= 80 && t.total >= 3);
    const ok = tagList.filter(t => t.accuracy >= 50 && t.accuracy < 80 && t.total >= 2);
    const focus = tagList.filter(t => t.accuracy < 50 || (t.accuracy < 60 && t.total >= 3));

    // Render tag groups
    document.getElementById('excels-list').innerHTML = excels.length
      ? excels.map(t => `<span class="report-tag good">${formatTag(t.tag)} <span class="accuracy">${t.accuracy}%</span></span>`).join('')
      : '<p style="color:var(--text-dim);font-size:0.85rem;">Play more questions to see what you\'re good at!</p>';
    document.getElementById('ok-list').innerHTML = ok.length
      ? ok.map(t => `<span class="report-tag ok">${formatTag(t.tag)} <span class="accuracy">${t.accuracy}%</span></span>`).join('')
      : '<p style="color:var(--text-dim);font-size:0.85rem;">Keep going!</p>';
    document.getElementById('focus-list').innerHTML = focus.length
      ? focus.map(t => `<span class="report-tag focus">${formatTag(t.tag)} <span class="accuracy">${t.accuracy}%</span></span>`).join('')
      : '<p style="color:var(--text-dim);font-size:0.85rem;">Nothing to worry about yet — you\'re doing great!</p>';

    // Per-world breakdown
    const worldGrid = document.getElementById('report-world-breakdown');
    const worldColors = { reading: 'var(--reading)', writing: 'var(--writing)', math: 'var(--math)' };
    const worldEmojis = { reading: '📖', writing: '✍️', math: '🔢' };
    const worldNames = { reading: 'Reading', writing: 'Grammar', math: 'Maths' };

    worldGrid.innerHTML = ['reading', 'writing', 'math'].map(world => {
      const p = progress[world] || { level: 1, answered: 0, correct: 0, xp: 0 };
      const acc = p.answered > 0 ? Math.round((p.correct / p.answered) * 100) : 0;
      return `
        <div class="report-world-row">
          <span class="report-world-icon">${worldEmojis[world]}</span>
          <div class="report-world-info">
            <h4>${worldNames[world]} — Level ${p.level}</h4>
            <div class="report-world-bar"><div class="report-world-bar-fill" style="width:${acc}%;background:${worldColors[world]}"></div></div>
            <div class="report-world-stats">
              <span>${acc}% accuracy</span>
              <span>${p.correct}/${p.answered} correct</span>
              <span>${p.xp} XP</span>
            </div>
          </div>
        </div>`;
    }).join('');

    // Recommendations
    const recs = [];
    if (focus.length > 0) {
      recs.push(`<strong>Focus on:</strong> Practice ${formatTag(focus[0].tag)} questions — you're at ${focus[0].accuracy}% accuracy and could use more reps.`);
    }
    if (progress.reading && progress.reading.answered < 10) {
      recs.push(`<strong>Get started:</strong> Answer at least 10 Reading questions to unlock your first skills report.`);
    }
    if (excels.length > 2) {
      recs.push(`<strong>Challenge yourself:</strong> Try harder questions in ${formatTag(excels[0].tag)} — you're already at ${excels[0].accuracy}%!`);
    }
    const session = db.getDailyCount(player.playerId);
    if (session < 3) {
      recs.push(`<strong>Daily streak:</strong> You've done ${session}/5 daily questions today. Finish all 5 to keep your streak alive!`);
    }
    if (Object.keys(progress).length > 0) {
      const weakest = ['reading', 'writing', 'math'].reduce((a, b) => {
        const pA = progress[a] || { answered: 0, correct: 0 };
        const pB = progress[b] || { answered: 0, correct: 0 };
        const accA = pA.answered > 0 ? pA.correct / pA.answered : 1;
        const accB = pB.answered > 0 ? pB.correct / pB.answered : 1;
        return accA < accB ? a : b;
      });
      recs.push(`<strong>Weakest world:</strong> ${worldNames[weakest]} — spend 10 minutes there today to build up your skills.`);
    }
    if (recs.length === 0) {
      recs.push('Play some questions first and your personalised recommendations will appear here!');
    }
    document.getElementById('report-recommendations').innerHTML = recs.map(r => `<div class="report-rec">${r}</div>`).join('');

    // 7-day heatmap
    const heatmap = document.getElementById('report-heatmap');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    let html = '';
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const daily = JSON.parse(localStorage.getItem('sq_daily_' + player.playerId) || '{}');
      const count = daily[dateStr] || 0;
      const active = count > 0 ? 'active' : '';
      html += `<div class="heatmap-day ${active}"><span>${days[d.getDay()]}</span><span class="heat-count">${count}</span></div>`;
    }
    heatmap.innerHTML = html;
  }

  function findQuestionFromAnswer(answer) {
    const bank = window.QuestionBank;
    if (!bank) return null;
    for (const world of Object.values(bank)) {
      for (const q of world) {
        if (q.question === answer.question) return q;
      }
    }
    return null;
  }

  function formatTag(tag) {
    return tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  // ===== MINI GAMES =====
  document.querySelectorAll('.mini-game-card').forEach(card => {
    card.addEventListener('click', () => startMiniGame(card.dataset.game));
  });

  function startMiniGame(gameId) {
    if (gameId === 'speed-math') startSpeedMath();
    else if (gameId === 'word-scramble') startWordScramble();
    else if (gameId === 'boss-battle') startBossBattle();
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
    player.level = Math.min(MAX_LEVEL, Math.floor(player.xp / XP_PER_LEVEL) + 1);
    localStorage.setItem('sq_session', JSON.stringify(player));
    if (score >= 10) localStorage.setItem('sq_badge_speed-demon', 'true');
    checkAchievements();
    showScreen('dashboard');
    setTimeout(() => {
      const msg = score >= 12 ? '🔥 Math speed demon!' : score >= 8 ? '⚡ Quick thinker!' : '💪 Keep practicing!';
      alert(`Speed Math Complete!\n\n${msg}\n\nScore: ${score}/${total}\nXP earned: +${xpEarned}`);
    }, 200);
  }

  // ===== WORD SCRAMBLE =====
  function startWordScramble() {
    showScreen('game');
    els.backBtn.onclick = () => showScreen('dashboard');
    els.questionPassage.classList.add('hidden');
    els.questionFeedback.classList.add('hidden');
    els.progressBar.style.width = '0%';

    const gameData = window.SATMiniGames?.['word-scramble'];
    if (!gameData || !gameData.levels) { showScreen('dashboard'); return; }

    // Collect all words from all levels and shuffle
    const allWords = [];
    gameData.levels.forEach(lvl => allWords.push(...lvl.words));
    const words = allWords.sort(() => Math.random() - 0.5).slice(0, 12);

    let current = 0;
    let score = 0;
    const startTime = Date.now();
    const timeLimit = 90000; // 90 seconds

    function showWord() {
      if (current >= words.length || (Date.now() - startTime) > timeLimit) {
        finishWordScramble(score, current);
        return;
      }
      const w = words[current];
      els.questionText.innerHTML = '';
      els.questionOptions.innerHTML = `
        <div class="scramble-area">
          <div class="speed-timer" id="scramble-timer">⏱️ 90s</div>
          <div class="scramble-letters">${w.scrambled}</div>
          <div class="scramble-hint">💡 ${w.hint}</div>
          <input type="text" class="scramble-input" id="scramble-answer" placeholder="Type the word..." autocomplete="off" autofocus>
          <div class="scramble-feedback" id="scramble-feedback"></div>
          <p class="scramble-score">Score: ${score}/${current}</p>
        </div>
      `;
      const input = document.getElementById('scramble-answer');
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const guess = input.value.trim().toUpperCase();
          const fb = document.getElementById('scramble-feedback');
          if (guess === w.answer.toUpperCase()) {
            score++;
            fb.textContent = '✅ Correct!';
            fb.className = 'scramble-feedback correct-fb';
          } else {
            fb.textContent = `❌ It was: ${w.answer}`;
            fb.className = 'scramble-feedback wrong-fb';
          }
          input.disabled = true;
          current++;
          els.progressBar.style.width = Math.min(100, (current / words.length) * 100) + '%';
          setTimeout(showWord, 1200);
        }
      });
      // Timer
      const timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, Math.ceil((timeLimit - elapsed) / 1000));
        const timerEl = document.getElementById('scramble-timer');
        if (timerEl) timerEl.textContent = `⏱️ ${remaining}s`;
        if (remaining <= 0) {
          clearInterval(timerInterval);
          finishWordScramble(score, current);
        }
      }, 1000);
    }
    showWord();
  }

  function finishWordScramble(score, total) {
    const xpEarned = score * 8;
    player.xp = (player.xp || 0) + xpEarned;
    player.level = Math.min(MAX_LEVEL, Math.floor(player.xp / XP_PER_LEVEL) + 1);
    localStorage.setItem('sq_session', JSON.stringify(player));
    if (score >= 8) localStorage.setItem('sq_badge_word-wizard', 'true');
    checkAchievements();
    showScreen('dashboard');
    setTimeout(() => {
      const msg = score >= 10 ? '🔥 Word wizard!' : score >= 6 ? '⚡ Great vocabulary!' : '💪 Keep unscrambling!';
      alert(`Word Scramble Complete!\n\n${msg}\n\nScore: ${score}/${total}\nXP earned: +${xpEarned}`);
    }, 200);
  }

  // ===== BOSS BATTLE =====
  function startBossBattle() {
    showScreen('game');
    els.backBtn.onclick = () => showScreen('dashboard');
    els.questionPassage.classList.add('hidden');
    els.questionFeedback.classList.add('hidden');
    els.progressBar.style.width = '0%';

    const gameData = window.SATMiniGames?.['boss-battle'];
    if (!gameData || !gameData.bosses || gameData.bosses.length === 0) { showScreen('dashboard'); return; }

    // Pick a random boss
    const boss = gameData.bosses[Math.floor(Math.random() * gameData.bosses.length)];
    const questions = boss.questions.sort(() => Math.random() - 0.5).slice(0, boss.hp);
    let current = 0;
    let bossHP = boss.hp;
    let playerHits = 0;
    let totalXP = 0;

    function showBossQuestion() {
      if (bossHP <= 0 || current >= questions.length) {
        finishBossBattle(playerHits, questions.length, totalXP, boss);
        return;
      }
      const q = questions[current];
      const hpPct = Math.max(0, (bossHP / boss.hp) * 100);
      els.questionText.innerHTML = '';
      els.questionOptions.innerHTML = '';

      // Boss header
      const header = document.createElement('div');
      header.className = 'boss-area';
      header.innerHTML = `
        <div class="boss-header">
          <span class="boss-emoji">${boss.emoji}</span>
          <h3>${boss.name}</h3>
          <div class="boss-hp-bar"><div class="boss-hp-fill" style="width:${hpPct}%"></div></div>
          <p style="color:var(--text-dim);font-size:0.85rem;">HP: ${bossHP}/${boss.hp}</p>
        </div>
      `;
      els.questionOptions.appendChild(header);

      // Passage if present
      if (q.passage) {
        const passageEl = document.createElement('div');
        passageEl.className = 'question-passage';
        passageEl.textContent = q.passage;
        els.questionOptions.appendChild(passageEl);
      }

      // Question
      const qEl = document.createElement('p');
      qEl.className = 'boss-question';
      qEl.textContent = q.question;
      els.questionOptions.appendChild(qEl);

      // Options
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          const btns = els.questionOptions.querySelectorAll('.option-btn');
          btns.forEach(b => b.disabled = true);
          const isCorrect = i === q.correctIndex;
          btn.classList.add(isCorrect ? 'correct' : 'wrong');
          if (!isCorrect) btns[q.correctIndex]?.classList.add('correct');

          if (isCorrect) {
            bossHP--;
            playerHits++;
            const xp = Math.round(boss.xpReward / boss.hp);
            totalXP += xp;
            // Show damage animation
            const dmg = document.createElement('div');
            dmg.className = 'xp-popup';
            dmg.textContent = `💥 -1 HP! +${xp} XP`;
            document.body.appendChild(dmg);
            setTimeout(() => dmg.remove(), 1000);
          }

          // Show explanation
          const expEl = document.createElement('div');
          expEl.className = 'feedback-explanation';
          expEl.textContent = q.explanation;
          expEl.style.marginTop = '12px';
          els.questionOptions.appendChild(expEl);

          const nextBtn = document.createElement('button');
          nextBtn.className = 'btn';
          nextBtn.style.marginTop = '12px';
          nextBtn.textContent = bossHP <= 0 ? 'Victory! 🎉' : current >= questions.length - 1 ? 'Finish' : 'Next Attack ⚔️';
          nextBtn.addEventListener('click', () => { current++; showBossQuestion(); });
          els.questionOptions.appendChild(nextBtn);

          els.progressBar.style.width = Math.min(100, ((boss.hp - bossHP) / boss.hp) * 100) + '%';
        });
        els.questionOptions.appendChild(btn);
      });
    }
    showBossQuestion();
  }

  function finishBossBattle(hits, total, xpEarned, boss) {
    player.xp = (player.xp || 0) + xpEarned;
    player.level = Math.min(MAX_LEVEL, Math.floor(player.xp / XP_PER_LEVEL) + 1);
    localStorage.setItem('sq_session', JSON.stringify(player));
    if (hits >= total) localStorage.setItem('sq_badge_boss-slayer', 'true');
    checkAchievements();
    showScreen('dashboard');
    setTimeout(() => {
      const defeated = hits >= total;
      const msg = defeated ? `🎉 You defeated ${boss.name}!` : `💪 ${boss.name} survived with ${total - hits} HP. Try again!`;
      alert(`Boss Battle Complete!\n\n${msg}\n\nHits: ${hits}/${total}\nXP earned: +${xpEarned}`);
    }, 200);
  }

  // ===== ACHIEVEMENTS / BADGES =====
  const BADGES = [
    { id: 'first-steps', name: 'First Steps', emoji: '👣', desc: 'Answer your first question', check: () => getTotalAnswered() >= 1 },
    { id: 'ten-streak', name: 'On Fire', emoji: '🔥', desc: 'Reach a 10-day streak', check: () => (player.streak || 0) >= 10 },
    { id: 'fifty-questions', name: 'Half Century', emoji: '⭐', desc: 'Answer 50 questions', check: () => getTotalAnswered() >= 50 },
    { id: 'hundred-questions', name: 'Centurion', emoji: '🏆', desc: 'Answer 100 questions', check: () => getTotalAnswered() >= 100 },
    { id: 'reading-master', name: 'Bookworm', emoji: '📚', desc: 'Reach Level 3 in Reading', check: () => getWorldLevel('reading') >= 3 },
    { id: 'grammar-master', name: 'Grammar Guru', emoji: '✍️', desc: 'Reach Level 3 in Grammar', check: () => getWorldLevel('writing') >= 3 },
    { id: 'maths-master', name: 'Maths Whiz', emoji: '🧮', desc: 'Reach Level 3 in Maths', check: () => getWorldLevel('math') >= 3 },
    { id: 'speed-demon', name: 'Speed Demon', emoji: '⚡', desc: 'Score 10+ in Speed Maths', check: () => (localStorage.getItem('sq_badge_speed-demon') === 'true') },
    { id: 'boss-slayer', name: 'Boss Slayer', emoji: '⚔️', desc: 'Defeat a Boss Battle', check: () => (localStorage.getItem('sq_badge_boss-slayer') === 'true') },
    { id: 'word-wizard', name: 'Word Wizard', emoji: '🧙', desc: 'Score 8+ in Word Scramble', check: () => (localStorage.getItem('sq_badge_word-wizard') === 'true') },
    { id: 'perfect-session', name: 'Perfectionist', emoji: '💎', desc: 'Get 10/10 in a session', check: () => (localStorage.getItem('sq_badge_perfect-session') === 'true') },
    { id: 'all-worlds', name: 'Explorer', emoji: '🌍', desc: 'Play all 3 worlds', check: () => {
      const p = db.getProgress(player.playerId);
      return (p.reading?.answered > 0) && (p.writing?.answered > 0) && (p.math?.answered > 0);
    }},
    { id: 'daily-five', name: 'Daily Champion', emoji: '🏅', desc: 'Complete 5 daily questions', check: () => db.getDailyCount(player.playerId) >= 5 },
    { id: 'two-hundred', name: 'Unstoppable', emoji: '🚀', desc: 'Answer 200 questions', check: () => getTotalAnswered() >= 200 },
    { id: 'max-level', name: 'SATs Legend', emoji: '👑', desc: 'Reach Level 5 in any world', check: () => getWorldLevel('reading') >= 5 || getWorldLevel('writing') >= 5 || getWorldLevel('math') >= 5 },
  ];

  function getTotalAnswered() {
    const p = db.getProgress(player.playerId);
    return (p.reading?.answered || 0) + (p.writing?.answered || 0) + (p.math?.answered || 0);
  }

  function getWorldLevel(world) {
    const p = db.getProgress(player.playerId);
    return p[world]?.level || 1;
  }

  function getEarnedBadges() {
    return JSON.parse(localStorage.getItem('sq_badges_' + player.playerId) || '[]');
  }

  function saveEarnedBadge(badgeId) {
    const earned = getEarnedBadges();
    if (!earned.includes(badgeId)) {
      earned.push(badgeId);
      localStorage.setItem('sq_badges_' + player.playerId, JSON.stringify(earned));
    }
  }

  function checkAchievements() {
    if (!player || !player.playerId) return;
    const earned = getEarnedBadges();
    for (const badge of BADGES) {
      if (earned.includes(badge.id)) continue;
      try {
        if (badge.check()) {
          saveEarnedBadge(badge.id);
          showBadgeToast(badge);
        }
      } catch(e) { /* ignore check errors */ }
    }
  }

  function showBadgeToast(badge) {
    const toast = document.createElement('div');
    toast.className = 'badge-toast';
    toast.innerHTML = `${badge.emoji}<br>${badge.name}<br><span style="font-size:0.8rem;font-weight:400;">Badge Unlocked!</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
  }

  function renderBadges() {
    const container = document.getElementById('badges-grid');
    if (!container) return;
    const earned = getEarnedBadges();
    container.innerHTML = BADGES.map(b => {
      const isEarned = earned.includes(b.id);
      return `
        <div class="badge-item ${isEarned ? 'earned' : 'locked'}" title="${b.desc}">
          <span class="badge-emoji">${b.emoji}</span>
          <span class="badge-name">${isEarned ? b.name : '???'}</span>
        </div>`;
    }).join('');
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
