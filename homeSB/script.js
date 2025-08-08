// Configuration: Set the localStorage prefix for your current course/language
const STORAGE_PREFIX = "sp-beginner-";  // Change this as needed per course

// Initialize lives and points in localStorage if not already set
if (localStorage.getItem(STORAGE_PREFIX + 'lives') === null) {
  localStorage.setItem(STORAGE_PREFIX + 'lives', '5');
}
if (localStorage.getItem(STORAGE_PREFIX + 'points') === null) {
  localStorage.setItem(STORAGE_PREFIX + 'points', '0');
}

/**
 * Updates the navigation status indicators for lives and points.
 * Fetches current values from localStorage and updates the text contents.
 */
function updateNavStatus() {
  const lives = localStorage.getItem(STORAGE_PREFIX + 'lives');
  const points = localStorage.getItem(STORAGE_PREFIX + 'points');

  const livesElem = document.getElementById('nav-lives');
  const pointsElem = document.getElementById('nav-points');

  if (livesElem) {
    livesElem.textContent = lives !== null ? lives : '5';
  }
  if (pointsElem) {
    pointsElem.textContent = points !== null ? points : '0';
  }
}

// Initial status update on page load
updateNavStatus();

// Update the nav status every 2 seconds in case it changes elsewhere
setInterval(updateNavStatus, 2000);

/**
 * Handles the Start Quiz button click event.
 * Redirects the user to the first quiz question page for the course.
 * Modify the URL as required for your specific quiz start page.
 */
function setupStartQuizButton() {
  const startBtn = document.querySelector('.hero-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // Optional: Uncomment to reset lives and points on start
      // localStorage.setItem(STORAGE_PREFIX + 'lives', '5');
      // localStorage.setItem(STORAGE_PREFIX + 'points', '0');

      // Navigate to the first quiz question page
      window.location.href = '../sbquiz/spanish-beginner-q1.html';  // Update this URL as needed
    });
  }
}

// Setup event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupStartQuizButton();
});
