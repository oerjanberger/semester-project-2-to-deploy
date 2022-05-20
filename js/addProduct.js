import createNav from "./components/common/createNav.js";
import setToFeatured from "./components/buttons/setToFeatured.js"
import validateAddProductForm from "./components/forms/validateAddProductForm.js";

createNav();
setToFeatured();

const successMessage = document.querySelector(".message__container");

const form = document.querySelector(".add__product__form");
form.addEventListener("submit", validateAddProductForm);
form.addEventListener("keypress", resetMessage);

function resetMessage() {
    successMessage.innerHTML = "";
};