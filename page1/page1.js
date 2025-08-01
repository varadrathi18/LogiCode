document.getElementById('name-form').onsubmit = function(e) {
  e.preventDefault();
  let name = document.getElementById('user-name').value.trim();
  if(name) {
    localStorage.setItem('langx-username', name);
    window.location.href = '../page2/page2.html';
  }
};
