// Initialize lives/points if first question
if(!localStorage.getItem('quizLives')) localStorage.setItem('quizLives',5);
if(!localStorage.getItem('quizPoints')) localStorage.setItem('quizPoints',0);

function updateStatus() {
  document.getElementById('lives-count').textContent = localStorage.getItem('quizLives');
  document.getElementById('points-count').textContent = localStorage.getItem('quizPoints');
}

function handleAnswer(isCorrect, correctText) {
  const feedbackEl = document.getElementById('feedback');
  if(isCorrect) {
    feedbackEl.innerHTML = `<span style="color:#2df52d;font-weight:700;">Hurray! Correct.</span>`;
    let pts = parseInt(localStorage.getItem('quizPoints')) + 20;
    localStorage.setItem('quizPoints', pts);
  } else {
    feedbackEl.innerHTML = `<span style="color:#ff6b6b;font-weight:700;">Incorrect.</span> Correct answer: <strong>${correctText}</strong>`;
    let lives = parseInt(localStorage.getItem('quizLives')) - 1;
    localStorage.setItem('quizLives', Math.max(lives,0));
  }
  updateStatus();
  // Show next button
  document.getElementById('next-btn').style.display = 'inline-block';
}

document.addEventListener('DOMContentLoaded', updateStatus);
