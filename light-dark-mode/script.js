const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");
const darkTheme = "dark";
const lightTheme = "light";

//Dark or Light Images
const imageMode = (color) => {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
};

//Toggle Theme Mode

const toggleLightDarkMode = (color) => {
  nav.style.backgroundColor =
    color === darkTheme ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor =
    color === darkTheme ? "rgb(255 255 255 / 50%)" : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent =
    color === darkTheme ? "Dark Mode" : "Light Mode";
  color === darkTheme
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");

  color === darkTheme ? imageMode("dark") : imageMode("light");
};

//Switch Theme Dynamically
const switchTheme = (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", darkTheme);
    localStorage.setItem("theme", darkTheme);
    toggleLightDarkMode(darkTheme);
  } else {
    document.documentElement.setAttribute("data-theme", lightTheme);
    localStorage.setItem("theme", lightTheme);
    toggleLightDarkMode(lightTheme);
  }
};

//Event Listerner
toggleSwitch.addEventListener("change", switchTheme);

//Check localStorage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === darkTheme) {
    toggleSwitch.checked = true;
    toggleLightDarkMode(darkTheme);
  }
}
