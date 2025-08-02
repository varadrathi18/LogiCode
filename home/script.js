// Button navigation highlight
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Start Lesson button
const lessonStartBtn = document.getElementById('lesson-start-btn');
lessonStartBtn.addEventListener('click', () => {
  alert("Starting your next lesson! (Hook this to your lesson logic.)");
});

// Change course select to update the welcome display
const courseSelect = document.getElementById('course-select');
courseSelect.addEventListener('change', function(){
  // For future: dynamically update courses or show lessons
  alert("Course switched to " + courseSelect.value);
});

// Images for different lives (ensure these images exist in your project)
const heartImgs = [
  'heart-0.png', // 0 lives - empty
  'heart-1.png', // 1 life left
  'heart-2.png', // 2 lives
  'heart-3.png', // 3 lives
  'heart-4.png', // 4 lives
  'heart-5.png'  // 5 lives - full
];

// Update the heart display according to current lives
function updateHearts(lives) {
  const heartImg = document.getElementById('hearts-img');
  if(lives >= 0 && lives <= 5) {
    heartImg.src = heartImgs[lives];
  }
  document.getElementById('lives').textContent = lives;
}

// EXAMPLE: Decrease lives (you can hook to your app logic)
let currentLives = 5;
updateHearts(currentLives);

// Example for testing: Remove this in your real app!
/*
document.getElementById('lesson-start-btn').onclick = () => {
  if(currentLives > 0){
    currentLives--;
    updateHearts(currentLives);
  }
};
*/

// (Keep your old JS for button navigation etc!)