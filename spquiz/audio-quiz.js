// Initialize lives and points for a specific prefix (language-level)
function initGame(prefix) {
  if(localStorage.getItem(prefix + 'lives') === null) {
    localStorage.setItem(prefix + 'lives', '5');
  }
  if(localStorage.getItem(prefix + 'points') === null) {
    localStorage.setItem(prefix + 'points', '0');
  }
}

// Get lives and points
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

// Update status bar UI
function updateStatusBar(prefix) {
  const lives = getLives(prefix);
  const points = getPoints(prefix);
  const livesEl = document.getElementById('lives-count');
  const pointsEl = document.getElementById('points-count');
  if(livesEl) livesEl.textContent = lives;
  if(pointsEl) pointsEl.textContent = points;
}

// Load and handle question interface
function loadQuestion({answer, next, prefix}) {
  initGame(prefix);
  updateStatusBar(prefix);
  document.querySelectorAll('#play-audio, #spanish-word, #english-word, #french-word, #german-word').forEach(el => {
    el.onclick = e => {
      e.preventDefault();
      const audio = document.getElementById('q-audio');
      if(audio) audio.play();
    };
  });

  let answered = false;
  const options = document.querySelectorAll('.choices li');
  options.forEach(option => {
    option.onclick = () => {
      if(answered) return;
      answered = true;
      const isCorrect = option.dataset.correct === "true";
      let lives = getLives(prefix);
      let points = getPoints(prefix);
      const popupZone = document.getElementById('popup-zone');
      popupZone.innerHTML = "";
      let popup = document.createElement('div');
      popup.className = 'popup-overlay';

      if(isCorrect) {
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
        if(lives === 0) {
          popup.innerHTML = `
            <div class="popup">
              <h1 class="wrong">No Lives Left!</h1>
              <p>You've used all your lives.</p>
              <div style="display:flex; gap:12px; justify-content:center;">
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
          if(lives === 0) return; // do not proceed if out of lives and popup shows buy/home
          window.location.href = next;
        };
      }
    };
  });
}
