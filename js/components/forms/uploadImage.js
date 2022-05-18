import { baseUrl } from "../../data/api.js";
import { getToken } from "../../utils/storage.js";
import displayMessage from "../common/displayMessage.js";
import MESSAGES from "../../constants/messages.js";
import getUploadedImage from "./getUploadedImage.js"

export default async function uploadImage() {
    const token = getToken();
    const url = baseUrl + "upload";
    const imageInput = document.querySelector("#image");
    const imageError = document.querySelector(".image__error");
    const verifyBtn = document.querySelector(".verify__btn");
    const imageUploadId = document.querySelector("#image__id");
    const imageFile = imageInput.files[0];
    const verifyLoader = document.querySelector(".verify__image__loader")
    const verifyText = document.querySelector(".verify__btn__text")
    verifyText.innerHTML = "";
    verifyLoader.style.display = "block";

    const imageFault = imageInput.files.length === 0 || imageFile.size > 200000 || imageFile.type !== "image/jpeg" && imageFile.type !== "image/jpg" && imageFile.type !== "image/png"

    const formData = new FormData();

    if (imageFault) {
        verifyBtn.innerHTML = `<div class="verify__image__loader"></div><span class="verify__btn__text">Verify
        image</span>`
        displayMessage("warning", MESSAGES.imageError, ".image__error")
    } else {
        formData.append("files", imageFile, imageFile.name);
        imageError.innerHTML = "";
    }

    const options = {
        method: "POST",
        body: formData,
        headers: { Authorization: `bearer ${token}` },
        enctype: "multipart/form-data"
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        if (response.ok) {
            verifyLoader.style.display = "none";
            verifyBtn.classList.add = "verify__success";
            verifyBtn.innerHTML = `<i class="fas fa-check" aria-label="successfully verified"></i>`;
            imageUploadId.value = json[0].id;
            getUploadedImage(imageUploadId.value);
        }

    } catch (error) {
        console.log(error);
        window.scrollTo(0, 0)
        displayMessage("error", MESSAGES.error, ".message__container");
        displayMessage("error", MESSAGES.verifyError, ".image__error");
    }
}