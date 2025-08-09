// Personalize page with name and chosen language
const uname = localStorage.getItem('langx-username') || 'User';
const lang = localStorage.getItem('langx-language') || 'your language';
document.getElementById('welcome-user').textContent = `Hi, ${uname}!`;
document.getElementById('language-line').textContent =
  `Let's personalize your journey in German.`;

// Level select logic
document.querySelectorAll('.level-card').forEach(card => {
  card.onclick = function() {
    // Visual feedback
    document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    // Save level selection
    const level = this.getAttribute('data-level');
    localStorage.setItem('langx-level', level);
    // setTimeout(() => {
    //   window.location.href = '../home/index.html';
    // }, 350);
           if (level === 'Beginner') {
      window.location.href = '../homeGB/index.html';
    }
        if (level === 'Intermediate') {
      window.location.href = '../homeGI/index.html';
    }
        if (level === 'Pro') {
      window.location.href = '../homeGP/index.html';
    }
  };
});
