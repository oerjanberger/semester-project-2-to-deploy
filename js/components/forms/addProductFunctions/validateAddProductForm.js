import MESSAGES from "../../../constants/messages.js";
import displayMessage from "../../common/displayMessage.js";
import addNewProduct from "./addNewProduct.js";
import { checkPrice, checkLength } from "../validationFunctions.js"

export default function validateAddProductForm(event) {
    event.preventDefault();
    const title = document.querySelector("#title");
    const titleError = document.querySelector(".title__error");
    const description = document.querySelector("#description");
    const descriptionError = document.querySelector(".description__error");
    const price = document.querySelector("#price");
    const priceError = document.querySelector(".price__error");
    const image = document.querySelector("#image");
    const imageError = document.querySelector(".image__error");
    const imageAlt = document.querySelector("#image__alt");
    const imageAltError = document.querySelector(".image__alt__error");
    const featuredInput = document.querySelector(".featured__checkbox");
    const successMessage = document.querySelector(".message__container")

    titleError.innerHTML = "";
    descriptionError.innerHTML = "";
    priceError.innerHTML = "";
    imageError.innerHTML = "";
    imageAltError.innerHTML = "";
    successMessage.innerHTML = "";

    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value.trim();
    const imageFile = image.files[0];
    const imageAltValue = imageAlt.value.trim();
    const featuredValue = featuredInput.checked;

    var validForm = true;

    if (checkLength(titleValue, 4)) {
        displayMessage("warning", MESSAGES.titleError, ".title__error");
        displayMessage("form__warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    }
    if (checkLength(descriptionValue, 19)) {
        displayMessage("warning", MESSAGES.descriptionError, ".description__error");
        displayMessage("form__warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    };
    if (!checkPrice(priceValue)) {
        displayMessage("warning", MESSAGES.priceError, ".price__error");
        displayMessage("form__warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    };
    if (image.files.length === 0 || imageFile.size > 200000 || imageFile.type !== "image/jpeg" && imageFile.type !== "image/jpg" && imageFile.type !== "image/png") {
        displayMessage("warning", MESSAGES.imageError, ".image__error");
        displayMessage("form__warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    };
    if (checkLength(imageAltValue, 1)) {
        displayMessage("warning", MESSAGES.imageAltError, ".image__alt__error");
        displayMessage("form__warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    };
    if (validForm) {
        addNewProduct(titleValue, descriptionValue, priceValue, imageFile, imageAltValue, featuredValue)
    };

};