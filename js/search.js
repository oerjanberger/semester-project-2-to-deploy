import { baseUrl } from "./data/api.js";
import createNav from "./components/common/createNav.js";
import displayMessage from "./components/common/displayMessage.js";
import MESSAGES from "./constants/messages.js";
import renderProducts from "./components/renderHtml/renderProducts.js"

createNav();

const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const queryValue = params.get("search");
const filterValue = queryValue.toLowerCase().trim()
const filterContentHeading = document.querySelector(".filter__content__heading");
const messageContainer = document.querySelector(".message__container");
const loadingContainer = document.querySelector(".loading__products")
const pageTitle = document.querySelector("title");
const pageDescription = document.querySelector(`meta[name="description"]`);

filterContentHeading.innerHTML = `We could not find any products with "${filterValue}" in the Title or Description:`;

pageTitle.innerHTML = "";
pageDescription.innerHTML = "";

pageTitle.innerHTML = `Baby Bliss || Search results "${filterValue}"`;
pageDescription.innerHTML = `This page shows the searches for "${filterValue}"`;

if (filterValue === null || filterValue === "") {
    displayMessage("warning", MESSAGES.noSearch, ".message__container");
    loadingContainer.style.display = "none"
} else {
    (async function searchProducts() {
        const searchUrl = baseUrl + "products?pagination[page]=1&pagination[pageSize]=100&populate=*";
        messageContainer.innerHTML = ""
        filterContentHeading.innerHTML = `Products that have "${filterValue}" in the Title or Description:`;

        try {
            const response = await fetch(searchUrl);
            const json = await response.json();
            const searchResult = json.data;
            loadingContainer.style.display = "none"

            const filteredProducts = searchResult.filter(function (searchResult) {
                if (searchResult.attributes.Title.toLowerCase().includes(filterValue) || searchResult.attributes.Description.toLowerCase().includes(filterValue)) {
                    return true
                }
            });
            renderProducts(filteredProducts);
        } catch (error) {
            console.log(error);
            displayMessage("error", MESSAGES.error, ".message__container");
        }
    })();
}

