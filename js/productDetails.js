import createNav from "./components/common/nav/createNav.js";
import { baseUrl } from "./data/api.js";
import displayMessage from "./components/common/displayMessage.js";
import MESSAGES from "./constants/messages.js";
import renderProductDetails from "./components/renderHtml/renderProductDetails.js";


createNav();

const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const productSpecificUrl = baseUrl + "products/" + id + "?populate=*";
const loadingProducts = document.querySelector(".loading__products");
const pageTitle = document.querySelector("title");
const pageDescription = document.querySelector(`meta[name="description"]`);

(async function getProductDetails() {
    try {
        const response = await fetch(productSpecificUrl);
        const json = await response.json();
        loadingProducts.style.display = "none";
        const product = json.data
        renderProductDetails(product)

        pageTitle.innerHTML = `Baby Bliss || ${product.attributes.Title}`;
        pageDescription.innerHTML = `Product Title: ${product.attributes.Title} Product description ${product.attributes.Description}`;

    } catch (error) {
        console.log(error)
        loadingProducts.style.display = "none";
        displayMessage("error", MESSAGES.error, ".message__container")

    }
})();

