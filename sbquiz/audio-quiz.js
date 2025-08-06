// Initialize lives and points with language-level namespacing:
// Pass your language-level prefix here, e.g. 'sp-beginner-'
function initGame(prefix) {
  if (localStorage.getItem(prefix + 'lives') === null) {
    localStorage.setItem(prefix + 'lives', '5');
  }
  if (localStorage.getItem(prefix + 'points') === null) {
    localStorage.setItem(prefix + 'points', '0');
  }
}

// Helpers for lives and points
function getLives(prefix) {
  return parseInt(localStorage.getItem(prefix + 'lives') || '5', 10);
}
function setLives(prefix, val) {
  localStorage.setItem(prefix + 'lives', val.toString());
}
function getPoints(prefix) {
  return parseInt(localStorage.getItem(prefix + 'points') || '0', 10);
}
function setPoints(prefix, val) {
  localStorage.setItem(prefix + 'points', val.toString());
}

// Update display
function updateStatusBar(prefix) {
  const livesCount = getLives(prefix);
  const pointsCount = getPoints(prefix);
  const livesEl = document.getElementById('lives-count');
  const pointsEl = document.getElementById('points-count');
  if (livesEl) livesEl.textContent = livesCount;
  if (pointsEl) pointsEl.textContent = pointsCount;
}

// Load a question with correct answer, next page, and prefix
function loadQuestion({answer, next, prefix = 'sp-beginner-'}) {
  initGame(prefix);
  updateStatusBar(prefix);

  // Play audio on click of word or button
  document.querySelectorAll('#play-audio, #spanish-word, #french-word, #german-word, #english-word').forEach(el => {
    el.onclick = e => {
      e.preventDefault();
      const audio = document.getElementById('q-audio');
      if (audio) audio.play();
    };
  });

  let answered = false;
  const options = document.querySelectorAll('.choices li');
  options.forEach(option => {
    option.onclick = () => {
      if (answered) return;
      answered = true;

      const isCorrect = option.dataset.correct === "true";
      let points = getPoints(prefix);
      let lives = getLives(prefix);

      const popupZone = document.getElementById('popup-zone');
      popupZone.innerHTML = "";

      let popup = document.createElement('div');
      popup.className = 'popup-overlay';

      if (isCorrect) {
        points += 20;
        setPoints(prefix, points);
        popup.innerHTML = `
          <div class="popup">
            <h1>Hurray!</h1>
            <h2>Congratulations! You earned 20 points.</h2>
            <button id="next-btn">Next Question</button>
          </div>`;
      } else {
        lives = Math.max(lives - 1, 0);
        setLives(prefix, lives);
        if (lives === 0) {
          popup.innerHTML = `
            <div class="popup">
              <h1 class="wrong">No Lives Left!</h1>
              <p>You've used all your lives.</p>
              <div style="display:flex;justify-content:center;gap:12px;margin-top:10px;">
                <button onclick="window.location.href='../buy-lives.html'">Buy Lives</button>
                <button onclick="window.location.href='../../home.html'">Go to Home</button>
              </div>
            </div>`;
        } else {
          popup.innerHTML = `
            <div class="popup">
              <h1 class="wrong">Oops!</h1>
              <h2>Your answer is incorrect.<br>Correct answer: <strong>${answer}</strong></h2>
              <button id="next-btn">Next Question</button>
            </div>`;
        }
      }

      popupZone.appendChild(popup);

      updateStatusBar(prefix);

      const nextBtn = document.getElementById('next-btn');
      if(nextBtn) {
        nextBtn.onclick = () => {
          // If lives zero and purchase or home shown - next is no longer valid
          if(lives === 0) return;
          window.location.href = next;
        };
      }
    };
  });
}
