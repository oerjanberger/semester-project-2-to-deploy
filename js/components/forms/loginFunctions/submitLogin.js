import displayMessage from "../../common/displayMessage.js";
import MESSAGES from "../../../constants/messages.js";
import sendLoginData from "./sendLoginData.js";
import { checkLength, checkEmail, checkPassword } from "../validationFunctions.js";

export default function submitLogin(event) {
    event.preventDefault();

    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const usernameError = document.querySelector(".username__error");
    const passwordError = document.querySelector(".password__error");

    usernameError.innerHTML = "";
    passwordError.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    let formIsValid = true;

    if (checkLength(usernameValue, 1) || !checkEmail(usernameValue)) {
        formIsValid = false
        displayMessage("warning", MESSAGES.noUsername, ".username__error");
    };

    if (checkLength(passwordValue, 1) || !checkPassword(passwordValue)) {
        formIsValid = false
        displayMessage("warning", MESSAGES.noPassword, ".password__error");
    };
    if (formIsValid === true) {
        sendLoginData(usernameValue, passwordValue)
    };

}