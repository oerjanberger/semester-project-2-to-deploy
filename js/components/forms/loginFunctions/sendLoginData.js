import { baseUrl } from "../../../data/api.js";
import displayMessage from "../../common/displayMessage.js";
import MESSAGES from "../../../constants/messages.js";
import { saveToken, saveUser } from "../../../utils/storage.js";

export default async function sendLoginData(username, password) {
    const url = baseUrl + "auth/local";
    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.user) {
            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/";
        }

        if (json.error) {
            displayMessage("error", MESSAGES.wrongLogin, ".message__container");
        };
    } catch (error) {
        console.log(error);
        displayMessage("error", MESSAGES.error, ".")
    }
}

