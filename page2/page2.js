// Show the name from page1
let uname = localStorage.getItem('langx-username') || '';
document.getElementById('welcome-name').textContent = `Welcome${uname ? ', ' + uname : ''}!`;

// Language select
document.querySelectorAll('.lang-card').forEach(card => {
  card.onclick = function() {
    // Save user choice
    let lang = this.getAttribute('data-lang');
    localStorage.setItem('langx-language', lang);

    // Visual feedback (optional)
    document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');

    // After animation, go to home page
    setTimeout(() => {
      window.location.href = '../page3/page3.html';
    }, 350);
  };
});
