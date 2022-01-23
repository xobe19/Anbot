let joke_title = document.querySelector("#main-text p");
let joke_text = document.querySelector("#description-text p");
let button = document.querySelector("#get-started-btn");
let joke_loaded = false;
let img = document.querySelector("#main-img");
let dots = 1;
fetch("https://backend-omega-seven.vercel.app/api/getjoke")
  .then((res) => res.json())
  .then((data) => {
    data = data[0];
    joke_title.innerText = data.question;
    joke_text.innerText = data.punchline;
    joke_loaded = true;
    joke_text.parentElement.style.display = "block";
    button.style.display = "block";
    img.setAttribute("src", "./image_assets/laughing.png")
  });



