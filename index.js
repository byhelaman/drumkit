// Functions
function keyClick(e) {
  let code;
  (e.target.tagName === "KBD") | (e.target.tagName === "SPAN")
    ? (code = e.target.parentElement.dataset.key)
    : (code = e.target.dataset.key);

  playSound(code);
}

function keyPress(e) {
  const code = e.code;
  playSound(code);
}

function remove(e) {
  // if (e.propertyName !== "transform") return;
  e.target.classList.remove("press"); //remove animation
}

function playSound(code) {
  const audio = document.querySelector(`audio[data-key="${code}"]`);
  const key = document.querySelector(`div[data-key="${code}"]`);

  if (!audio) return; //stop

  key.classList.toggle("press");
  audio.currentTime = 0; //rewind
  audio.play();
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", remove));
keys.forEach((key) => key.addEventListener("click", keyClick));
window.addEventListener("keydown", keyPress);

// Dark theme

const toggle = document.querySelector(".toggle");
const container = document.querySelector(".container");

load();

toggle.addEventListener("click", () => {
  store(container.classList.toggle("dark"));
  toggle.classList.toggle("bx-sun");
});

function load() {
  const dark = localStorage.getItem("dark");

  if (!dark) {
    store("false");
    toggle.classList.toggle("bx-moon");
  } else if (dark == "true") {
    container.classList.toggle("dark");
    toggle.classList.remove("bx-moon");
    toggle.classList.toggle("bx-sun");
  }
}

function store(value) {
  localStorage.setItem("dark", value);
  toggle.classList.toggle("bx-moon");
}
