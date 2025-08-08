


// Only reset lives and points at first question
(function(){
  let page = location.pathname.split('/').pop();
  if (page === "french-beginner-q1.html" || page === "french-beginner-q1") {
    localStorage.setItem('quizPoints', "0");
    localStorage.setItem('quizLives', "5");
  }
})();

// Utility to update status bars on each page
function updateStatusBar() {
  document.getElementById('lives-count').textContent = localStorage.getItem('quizLives') || '5';
  document.getElementById('points-count').textContent = localStorage.getItem('quizPoints') || '0';
}
updateStatusBar();

function loadQuestion(cfg) {
  // Support audio play when clicking word or button
  document.querySelectorAll('#french-word, #play-audio').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('q-audio').play();
    });
  });

  // Handle user answer
  let answered = false;
  document.querySelectorAll('.choices li').forEach(option => {
    option.addEventListener('click', function() {
      if (answered) return;
      answered = true;

      let isCorrect = option.dataset.correct === "true";
      let popup = document.createElement('div');
      popup.className = 'popup-overlay';

      let lives = parseInt(localStorage.getItem('quizLives') || '5');
      let points = parseInt(localStorage.getItem('quizPoints') || '0');
      let outOfLives = false;

      if(isCorrect) {
        points += 20;
        localStorage.setItem('quizPoints', points);
      } else {
        lives = Math.max(0, lives - 1);
        localStorage.setItem('quizLives', lives);
        if(lives <= 0) outOfLives = true;
      }

      updateStatusBar();

      // Popup content
      let popupHTML = '';
      if (outOfLives) {
        popupHTML = `
          <div class="popup">
            <h1 class="wrong">No Lives Left!</h1>
            <p>You've used all your lives.</p>
            <div class="buy-or-home">
              <button onclick="window.location.href='../buy-lives.html'">Buy Lives</button>
              <button onclick="window.location.href='../../home.html'">Go to Home</button>
            </div>
          </div>
        `;
      } else if (isCorrect) {
        popupHTML = `
          <div class="popup">
            <h1>Hurray!</h1>
            <h2>Congratulations, you earned 20 points!</h2>
            <button onclick="proceedNext()">Next Question</button>
          </div>
        `;
      } else {
        popupHTML = `
          <div class="popup">
            <h1 class="wrong">Oops!</h1>
            <h2 class="wrong">Your answer is incorrect.<br>
              Correct answer: <span style='color:#134dc1'>${cfg.answer}</span>
            </h2>
            <button onclick="proceedNext()">Next Question</button>
          </div>
        `;
      }

      popup.innerHTML = popupHTML;
      document.body.appendChild(popup);

      // Animate/focus popup (optional)
      document.querySelector('.popup button').focus();
    });
  });

  // For "Next Question" buttons
  window.proceedNext = function() {
    const popup = document.querySelector('.popup-overlay');
    if (popup) popup.remove();

    // If out of lives, stay
    let lives = parseInt(localStorage.getItem('quizLives') || '0');
    if(lives <= 0) return;

    // Else, go to next
    window.location.href = cfg.next;
  };
}

document.addEventListener('DOMContentLoaded', updateStatusBar);
