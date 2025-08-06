// Show the name from page1
let uname = localStorage.getItem('langx-username') || '';
document.getElementById('welcome-name').textContent = `Welcome${uname ? ', ' + uname : ''}!`;

// Language select
document.querySelectorAll('.lang-card').forEach(card => {
  card.addEventListener('click', () => {
    // Save user choice
    let lang = card.getAttribute('data-lang');
    localStorage.setItem('langx-language', lang);

    // Redirect based on language
    if (lang === 'German') {
      window.location.href = '../levelG/page3.html';
    } else if (lang === 'French') {
      window.location.href = '../levelF/page3.html';
    } else if (lang === 'Spanish') {
      window.location.href = '../levelS/page3.html';
    }
    // Add more languages if needed
  });
});

