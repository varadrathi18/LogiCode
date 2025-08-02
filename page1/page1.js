document.getElementById('startBtn').onclick = function() {
  const username = document.getElementById('username').value.trim();
  if (username === "") {
    alert("Please enter your name to begin the adventure!");
    return;
  }
  localStorage.setItem("langx-username", username);
  window.location.href = "../page2/page2.html"; // change this to your NEXT onboarding page
};
