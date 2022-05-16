import { baseUrl } from "./data/api.js";
import createNav from "./components/common/createNav.js";
import setToFeatured from "./components/buttons/setToFeatured.js"
import validateEditProductForm from "./components/forms/validateEditProductForm.js";
import { populateEditPage } from "./components/forms/populateEditPage.js";
import uploadImage from "./components/forms/uploadImage.js";
import displayMessage from "./components/common/displayMessage.js";
import MESSAGES from "./constants/messages.js";
import deleteProductBtn from "./components/buttons/deleteProductBtn.js";

createNav();

const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const productSpecificUrl = baseUrl + "products/" + id + "?populate=*";

const loadingProducts = document.querySelector(".loading__products");
const pageTitle = document.querySelector("title");
const pageDescription = document.querySelector(`meta[name="description"]`);
const verifyBtn = document.querySelector(".verify__btn");

if (!id) {
    document.location = "/";
}

(async function getEditProductDetails() {
    try {
        const response = await fetch(productSpecificUrl);
        const json = await response.json();
        loadingProducts.style.display = "none";
        const product = json.data
        populateEditPage(product)

        pageTitle.innerHTML = "";
        pageDescription.innerHTML = "";

        pageTitle.innerHTML = `Baby Bliss || Edit ${product.attributes.Title}`;
        pageDescription.innerHTML = `On this page you as an admin user can edit this product: ${product.attributes.Title}`;

    } catch (error) {
        console.log(error)
        loadingProducts.style.display = "none";
        displayMessage("error", MESSAGES.error, ".message__container")

    }
})();
setToFeatured();
deleteProductBtn();

verifyBtn.addEventListener("click", uploadImage);

const successMessage = document.querySelector(".message__container")

const form = document.querySelector(".edit__product__form");
form.addEventListener("submit", validateEditProductForm)
form.addEventListener("click", resetMessage)

function resetMessage() {
    successMessage.innerHTML = "";
}