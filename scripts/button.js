let gs_btn = document.getElementById("get-started-btn-flx-cntr");
if (gs_btn != null) {
  gs_btn.addEventListener("click", () => {
    window.location.href = "/features.html";
  });
}

document.getElementById("feedback-btn").addEventListener("click", (e) => {
  window.location.href = "https://forms.gle/gHay1B669W3KPcBf7";
});
document.getElementById("logo").addEventListener("click", (e) => {
  window.location.href = "/index.html";
});
let features_cards = document.getElementsByClassName("features-card");
let urls = [
  "/note.html",
  "/blockchain.html",
  "/joke.html",
  "/do_they_like_you.html",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
];

for (let i = 0; i < features_cards.length; i++) {
  features_cards[i].addEventListener("click", (e) => {
    window.location.href = urls[i];
  });
}
