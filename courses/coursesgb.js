// Handles plan selection and redirection
document.querySelectorAll('.plan-card').forEach(function(card) {
  card.addEventListener('click', function() {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    // Identify which plan
    let nextPage = '';
    if(card.id === "weekly-plan") nextPage = "qr_weeklygb.html";
    if(card.id === "monthly-plan") nextPage = "qr_monthlygb.html";
    if(card.id === "yearly-plan") nextPage = "qr_yearlygb.html";
    setTimeout(() => {
      window.location.href = nextPage;
    }, 350); // For a quick click effect
  });
});
