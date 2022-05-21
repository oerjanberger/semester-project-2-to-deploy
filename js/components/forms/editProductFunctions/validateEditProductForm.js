import MESSAGES from "../../../constants/messages.js";
import displayMessage from "../../common/displayMessage.js";
import { editProduct } from "./editProduct.js";
import { checkPrice, checkLength } from "../validationFunctions.js"

export default function validateEditProductForm(event) {
    event.preventDefault();
    const title = document.querySelector("#title");
    const titleError = document.querySelector(".title__error");
    const description = document.querySelector("#description");
    const descriptionError = document.querySelector(".description__error");
    const price = document.querySelector("#price");
    const priceError = document.querySelector(".price__error");
    const imageAlt = document.querySelector("#image__alt");
    const imageAltError = document.querySelector(".image__alt__error");
    const featuredInput = document.querySelector(".featured__checkbox");
    const productId = document.querySelector("#product__id");
    const successMessage = document.querySelector(".message__container")

    titleError.innerHTML = "";
    descriptionError.innerHTML = "";
    priceError.innerHTML = "";
    imageAltError.innerHTML = "";
    successMessage.innerHTML = "";

    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value.trim();
    const imageAltValue = imageAlt.value.trim();
    const featuredValue = featuredInput.checked;
    const productIdValue = productId.value.trim();

    var validForm = true;

    if (checkLength(titleValue, 4)) {
        displayMessage("warning", MESSAGES.titleError, ".title__error");
        displayMessage("warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    }
    if (checkLength(descriptionValue, 19)) {
        displayMessage("warning", MESSAGES.descriptionError, ".description__error");
        displayMessage("warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    };
    if (!checkPrice(priceValue)) {
        displayMessage("warning", MESSAGES.priceError, ".price__error");
        displayMessage("warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    };
    if (checkLength(imageAltValue, 1)) {
        displayMessage("warning", MESSAGES.imageAltError, ".image__alt__error");
        displayMessage("warning", MESSAGES.inputMissing, ".message__container");
        validForm = false;
        window.scrollTo(0, 0)
    };
    if (validForm) {
        editProduct(titleValue, descriptionValue, priceValue, imageAltValue, featuredValue, productIdValue)
    }

}





