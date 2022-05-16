import createNav from "./components/common/createNav.js";
import submitLogin from "./components/forms/submitLogin.js"

createNav();

const loginForm = document.querySelector(".login__form");
loginForm.addEventListener("submit", submitLogin);



