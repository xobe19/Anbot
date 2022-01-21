let currentColor = "aqua";
let colorElems = document.getElementsByClassName("color-circle");
let ta = document.getElementById("note-text-area");
let hding = document.querySelector(".mid-text p");
const switchColTextArea = (col) => {
  ta.style.color = col;
};
let local_cookie = {
  note: "",
  color: "aqua",
};

const switchCol = (col) => {
  for (let i = 0; i < colorElems.length; i++) {
    if (colorElems[i].classList[1] === col) {
      colorElems[i].parentElement.classList.add("active-color");
      switchColTextArea(col);
      currentColor = col;
      storeNoteInCookie(ta.value);
    } else {
      colorElems[i].parentElement.classList.remove("active-color");
    }
  }
};

for (let i = 0; i < colorElems.length; i++) {
  colorElems[i].addEventListener("click", (e) => {
    let col = e.target.classList[1];
    console.log(col);
    switchCol(col);
  });
}

const updateFromCookie = () => {
  if (document.cookie === "") local_cookie.color = "aqua";
  else local_cookie = JSON.parse(document.cookie);
};
const storeNoteInCookie = (note) => {
  local_cookie.note = note;
  local_cookie.color = currentColor;
  document.cookie = JSON.stringify(local_cookie);
};

const changeText = (fin_text) => {
  hding.innerHTML = fin_text;
  storeNoteInCookie(ta.value);
};

var timer;
ta.addEventListener("input", (e) => {
  clearTimeout(timer);
  changeText("Saving..");
  timer = setTimeout(() => changeText("Saved!"), 1500);
});

updateFromCookie();
ta.value = local_cookie.note;
switchCol(local_cookie.color);
