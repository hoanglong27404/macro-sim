/* ─── Global State ─────────────────────────────────────── */
let selectedGender = null;

/* ─── HOME SCREEN ──────────────────────────────────────── */
function selectGender(gender) {
  selectedGender = gender;

  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.classList.remove('selected-male', 'selected-female');
  });

  const btn = document.querySelector(`.btn-${gender}`);
  if (btn) btn.classList.add(`selected-${gender}`);

  document.body.className = `theme-${gender}`;

  const section = document.getElementById('nameInputSection');
  if (section) section.style.display = 'flex';

  document.getElementById('playerName')?.focus();
}

function startGame() {
  if (!selectedGender) return;
  const name = document.getElementById('playerName')?.value.trim() || '';
  if (!name) {
    const errEl = document.getElementById('nameError');
    const input = document.getElementById('playerName');
    if (errEl) errEl.style.display = 'block';
    if (input) input.focus();
    return;
  }
  const params = new URLSearchParams({ gender: selectedGender, name });
  sessionStorage.removeItem('gameState');
  window.location.href = `/game?${params}`;
}

function clearNameError() {
  const errEl = document.getElementById('nameError');
  if (errEl) errEl.style.display = 'none';
}

/* ─── GAME ENGINE ──────────────────────────────────────── */
const MODULES = [
  { label: 'MODULE 1 — Tài chính & Tài sản', range: [0, 2] },
  { label: 'MODULE 2 — Sản xuất & Xã hội',   range: [3, 5] },
  { label: 'MODULE 3 — Hội nhập & Tương lai', range: [6, 9] },
];

const IDEOLOGY_LABELS = {
  free:      { name: 'KTTT Tự do',    flag: '🇺🇸', tag: 'tag-free' },
  socialist: { name: 'KTTT XHCN',     flag: '🇨🇳', tag: 'tag-socialist' },
  vn:        { name: 'KTTT ĐHXHCN',   flag: '🇻🇳', tag: 'tag-vn' },
};

if (typeof QUESTIONS !== 'undefined') {
  initGame();
}

function initGame() {
  const params = new URLSearchParams(window.location.search);
  const stored = sessionStorage.getItem('gameState');

  const state = stored ? JSON.parse(stored) : {
    gender: params.get('gender') || 'male',
    playerName: params.get('name') || '',
    answers: new Array(QUESTIONS.length).fill(null),
    currentIndex: 0,
  };

  document.body.className = `theme-${state.gender}`;

  renderQuestion(state);
  renderDots(state);

  window._state = state;
}

function renderQuestion(state) {
  const q = QUESTIONS[state.currentIndex];
  const module = MODULES.find(m => state.currentIndex >= m.range[0] && state.currentIndex <= m.range[1]);

  /* Header */
  setText('eventYear', q.year);
  setText('questionTitle', q.title);
  setText('contextText', q.context);
  setText('moduleLabel', module?.label || '');
  setText('progressText', `${state.currentIndex + 1} / ${QUESTIONS.length}`);

  /* Progress bar */
  const pct = ((state.currentIndex + 1) / QUESTIONS.length) * 100;
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = `${pct}%`;

  /* Choices */
  const list = document.getElementById('choicesList');
  if (!list) return;
  list.innerHTML = '';

  q.choices.forEach(choice => {
    const selected = state.answers[state.currentIndex] === `Q${q.id}: ${choice.label}`;
    const div = document.createElement('div');
    div.className = `choice-item${selected ? ' selected' : ''}`;
    div.setAttribute('data-value', `Q${q.id}: ${choice.label}`);
    div.innerHTML = `
      <div class="choice-label">${choice.label}</div>
      <div class="choice-text">${choice.text}</div>
    `;
    div.addEventListener('click', () => selectChoice(div, `Q${q.id}: ${choice.label}`));
    list.appendChild(div);
  });

  /* Nav buttons */
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.style.visibility = state.currentIndex === 0 ? 'hidden' : 'visible';
  if (nextBtn) {
    const answered = state.answers[state.currentIndex] !== null;
    nextBtn.disabled = !answered;
    const isLast = state.currentIndex === QUESTIONS.length - 1;
    nextBtn.innerHTML = isLast
      ? `Xem kết quả <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
      : `Tiếp theo <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  }

  /* Card animation */
  const card = document.getElementById('questionCard');
  if (card) {
    card.style.animation = 'none';
    card.offsetHeight; // reflow
    card.style.animation = 'cardIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both';
  }

  saveState(state);
}

function renderDots(state) {
  const wrap = document.getElementById('questionDots');
  if (!wrap) return;
  wrap.innerHTML = '';
  QUESTIONS.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'q-dot';
    if (idx === state.currentIndex) dot.classList.add('current');
    else if (state.answers[idx] !== null) dot.classList.add('answered');
    wrap.appendChild(dot);
  });
}

function selectChoice(el, value) {
  const state = window._state;
  state.answers[state.currentIndex] = value;

  document.querySelectorAll('.choice-item').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) nextBtn.disabled = false;

  renderDots(state);
  saveState(state);
}

function nextQuestion() {
  const state = window._state;
  if (state.answers[state.currentIndex] === null) return;

  if (state.currentIndex === QUESTIONS.length - 1) {
    goToResult(state);
    return;
  }

  state.currentIndex++;
  renderQuestion(state);
  renderDots(state);
}

function prevQuestion() {
  const state = window._state;
  if (state.currentIndex === 0) return;
  state.currentIndex--;
  renderQuestion(state);
  renderDots(state);
}

function goToResult(state) {
  saveState(state);
  window.location.href = '/result';
}

function saveState(state) {
  sessionStorage.setItem('gameState', JSON.stringify(state));
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ─── RESULT SCREEN ────────────────────────────────────── */
const VERDICT_DATA = {
  free:      { name: 'KTTT Tự do',       flag: '🇺🇸', fillClass: 'fill-free' },
  socialist: { name: 'KTTT XHCN',        flag: '🇨🇳', fillClass: 'fill-socialist' },
  vn:        { name: 'KTTT ĐHXHCN',      flag: '🇻🇳', fillClass: 'fill-vn' },
};

if (document.getElementById('resultScreen')) {
  initResult();
}

async function initResult() {
  const stored = sessionStorage.getItem('gameState');
  if (!stored) { window.location.href = '/'; return; }

  const state = JSON.parse(stored);
  document.body.className = `theme-${state.gender}`;

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: state.answers.filter(Boolean),
        gender: state.gender,
        playerName: state.playerName,
      }),
    });

    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('resultContent').style.display = 'flex';
    document.getElementById('resultContent').style.flexDirection = 'column';
    document.getElementById('resultContent').style.gap = '28px';

    renderVerdict(data, state);
    renderScores(data, state.answers.length);
    renderAnalysis(data.analysis);
    renderAnswerReview(state);
  } catch (err) {
    console.error(err);
    document.querySelector('.loading-title').textContent = 'Không thể kết nối AI — hiển thị kết quả cơ bản';
    document.querySelector('.loading-sub').textContent = 'Vui lòng kiểm tra GEMINI_API_KEY trong file .env';
  }
}

function renderVerdict(data, state) {
  const v = VERDICT_DATA[data.dominantIdeology] || VERDICT_DATA.vn;
  document.getElementById('verdictFlag').textContent = v.flag;
  document.getElementById('verdictName').textContent = v.name;

  const nameWrap = document.getElementById('verdictPlayerName');
  if (nameWrap && state.playerName) {
    nameWrap.textContent = state.playerName;
  }

  animateRing(data.consistency || 0);
  setText('consistencyPct', `${data.consistency || 0}%`);
}

function animateRing(pct) {
  const circle = document.getElementById('consistencyRing');
  if (!circle) return;
  const circumference = 213.6;
  const offset = circumference - (pct / 100) * circumference;
  requestAnimationFrame(() => {
    circle.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
      circle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';
      circle.style.strokeDashoffset = offset;
      circle.style.stroke = 'url(#rGrad)';
    });
  });

  const svg = circle.closest('svg');
  if (svg && !svg.querySelector('defs')) {
    svg.insertAdjacentHTML('afterbegin', `
      <defs>
        <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:var(--clr-primary)"/>
          <stop offset="100%" style="stop-color:var(--clr-accent)"/>
        </linearGradient>
      </defs>
    `);
    circle.style.stroke = 'url(#rGrad)';
  }
}

function renderScores(data, total) {
  const container = document.getElementById('scoreBars');
  if (!container) return;
  container.innerHTML = '';

  const items = [
    { key: 'free',      label: '🇺🇸 KTTT Tự do',    fillClass: 'fill-free' },
    { key: 'socialist', label: '🇨🇳 KTTT XHCN',     fillClass: 'fill-socialist' },
    { key: 'vn',        label: '🇻🇳 KTTT ĐHXHCN',   fillClass: 'fill-vn' },
  ];

  items.forEach(({ key, label, fillClass }) => {
    const count = data.scores?.[key] || 0;
    const pct = Math.round((count / total) * 100);

    const wrap = document.createElement('div');
    wrap.className = 'score-bar-item';
    wrap.innerHTML = `
      <div class="score-bar-meta">
        <span class="score-bar-label">${label}</span>
        <span class="score-bar-count">${count}/${total} lựa chọn (${pct}%)</span>
      </div>
      <div class="score-bar-track">
        <div class="score-bar-fill ${fillClass}" data-pct="${pct}"></div>
      </div>
    `;
    container.appendChild(wrap);
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.score-bar-fill').forEach(el => {
      el.style.width = `${el.dataset.pct}%`;
    });
  });
}

function renderAnalysis(text) {
  const el = document.getElementById('analysisText');
  if (!el) return;
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i >= text.length) { clearInterval(interval); return; }
    i = Math.min(i + 4, text.length);
    el.textContent = text.slice(0, i);
  }, 16);
}

function renderAnswerReview(state) {
  const list = document.getElementById('answerList');
  if (!list || typeof QUESTIONS === 'undefined') return;

  list.innerHTML = '';
  state.answers.forEach((ans, idx) => {
    if (!ans) return;
    const q = QUESTIONS[idx];
    const choiceLetter = ans.split(': ')[1]?.trim();
    const choice = q?.choices.find(c => c.label === choiceLetter);
    const ideology = choice?.ideology || 'vn';
    const ideologyInfo = IDEOLOGY_LABELS[ideology];

    const item = document.createElement('div');
    item.className = 'answer-item';
    item.innerHTML = `
      <div class="answer-num ideology-${ideology}">${idx + 1}</div>
      <div class="answer-content">
        <span class="answer-event">${q?.year} — ${q?.title}</span>
        <span class="answer-choice">Chọn ${choiceLetter}: ${choice?.text || ''}</span>
        <span class="answer-ideology ${ideologyInfo?.tag || ''}">${ideologyInfo?.flag || ''} ${ideologyInfo?.name || ''}</span>
      </div>
    `;
    list.appendChild(item);
  });
}

function restartGame() {
  sessionStorage.removeItem('gameState');
  window.location.href = '/';
}

function shareResult() {
  const stored = sessionStorage.getItem('gameState');
  if (!stored) return;
  const state = JSON.parse(stored);

  const verdictEl = document.getElementById('verdictName');
  const verdict = verdictEl?.textContent || 'KTTT ĐHXHCN';

  const shareText = `Tôi vừa hoàn thành "Hệ thống Giả lập Vĩ mô" và kết quả cho thấy tư duy của tôi thuộc hệ thống ${verdict}! 🌐\n\nBạn có muốn thử không?`;

  if (navigator.share) {
    navigator.share({ title: 'Hệ thống Giả lập Vĩ mô', text: shareText })
      .catch(() => fallbackCopy(shareText));
  } else {
    fallbackCopy(shareText);
  }
}

function fallbackCopy(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('Đã sao chép kết quả vào clipboard!'))
    .catch(() => alert('Không thể chia sẻ. Hãy thử screenshot kết quả!'));
}
