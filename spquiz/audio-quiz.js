// // Reset lives and points at first question load
// (function initGame() {
//   const page = location.pathname.split("/").pop();
//   if (page === "french-pro-q1.html" || page === "german-pro-q1.html" || page === "french-beginner-q1.html") {
//     localStorage.setItem('quizLives', "5");
//     localStorage.setItem('quizPoints', "0");
//   }
// })();

// // Update lives and points in UI
// function updateStatusBar() {
//   const livesCount = localStorage.getItem('quizLives') || '5';
//   const pointsCount = localStorage.getItem('quizPoints') || '0';
//   document.getElementById('lives-count').textContent = livesCount;
//   document.getElementById('points-count').textContent = pointsCount;
// }
// updateStatusBar();

// // Load Question Logic
// function loadQuestion(cfg) {
//   // Audio play on clicking word or icon
//   document.querySelectorAll('#play-audio, #french-word, #german-word, #english-word').forEach(el => {
//     el.onclick = e => {
//       e.preventDefault();
//       const audio = document.getElementById('q-audio');
//       if (audio) audio.play();
//     };
//   });

//   // Prevent multiple answering
//   let answered = false;

//   const options = document.querySelectorAll('.choices li');
//   options.forEach(option => {
//     option.onclick = () => {
//       if (answered) return;
//       answered = true;
//       const isCorrect = option.dataset.correct === "true";
//       let points = parseInt(localStorage.getItem('quizPoints') || '0');
//       let lives = parseInt(localStorage.getItem('quizLives') || '5');

//       // Create popup
//       const popupZone = document.getElementById('popup-zone');
//       popupZone.innerHTML = "";

//       let popup = document.createElement('div');
//       popup.className = 'popup-overlay';

//       if (isCorrect) {
//         points += 20;
//         localStorage.setItem('quizPoints', points);
//         popup.innerHTML = `
//           <div class="popup">
//             <h1>Hurray!</h1>
//             <h2>Congratulations! You earned 20 points.</h2>
//             <button id="next-btn">Next Question</button>
//           </div>
//         `;
//       } else {
//         lives = Math.max(lives - 1, 0);
//         localStorage.setItem('quizLives', lives);
//         popup.innerHTML = `
//           <div class="popup">
//             <h1 class="wrong">Oops!</h1>
//             <h2>Your answer is incorrect.<br>Correct answer: <strong>${cfg.answer}</strong></h2>
//             <button id="next-btn">Next Question</button>
//           </div>
//         `;
//       }

//       popupZone.appendChild(popup);

//       updateStatusBar();

//       if (lives === 0) {
//         // Show special popup for out of lives after next
//         document.getElementById('next-btn').onclick = () => {
//           popupZone.innerHTML = '';
//           showOutOfLivesPopup();
//         };
//       } else {
//         document.getElementById('next-btn').onclick = () => {
//           window.location.href = cfg.next;
//         };
//       }
//     };
//   });
// }

// // Popup for out of lives
// function showOutOfLivesPopup() {
//   const popupZone = document.getElementById('popup-zone');
//   popupZone.innerHTML = `
//     <div class="popup-overlay">
//       <div class="popup">
//         <h1 class="wrong">No Lives Left!</h1>
//         <p>You've used all your lives.</p>
//         <div style="display:flex; gap: 16px; justify-content:center;">
//           <button onclick="window.location.href='../buy-lives.html'">Buy Lives</button>
//           <button onclick="window.location.href='../../home.html'">Go to Home</button>
//         </div>
//       </div>
//     </div>
//   `;
// }

// Only reset lives and points at first question
(function(){
  let page = location.pathname.split('/').pop();
  if (page === "spanish-beginner-q1.html" || page === "spanish-beginner-q1") {
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
  document.querySelectorAll('#spanish-word, #play-audio').forEach(el => {
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
