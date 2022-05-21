import createNav from "./components/common/nav/createNav.js";
import submitLogin from "./components/forms/loginFunctions/submitLogin.js"

createNav();

const loginForm = document.querySelector(".login__form");
loginForm.addEventListener("submit", submitLogin);



