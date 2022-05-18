import { baseUrl } from "./data/api.js";
import createNav from "./components/common/createNav.js";
import renderFeatured from "./components/renderHtml/renderFeatured.js";
import displayMessage from "./components/common/displayMessage.js";
import MESSAGES from "./constants/messages.js";
import renderHeroBanner from "./components/renderHtml/renderHeroBanner.js";

const url = baseUrl + "products?populate=*";
const loadingProducts = document.querySelector(".loading__products");
const loadingHeroBanner = document.querySelector(".loading__herobanner");
const loadingHomePage = document.querySelector(".loading__home__container");
createNav();

setTimeout(function () {
    loadingHomePage.style.display = "none";
},
    3000);

(async function getHomeBanner() {
    try {
        const homeBannerUrl = baseUrl + "home?populate=*";
        const response = await fetch(homeBannerUrl);
        const result = await response.json();
        loadingHeroBanner.style.display = "none";
        renderHeroBanner(result)
    }
    catch (error) {
        loadingHeroBanner.style.display = "none";
        console.log(error)
    }
})();

(async function getIndexContent() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        loadingProducts.style.display = "none";
        const products = result.data
        renderFeatured(products)
    }
    catch (error) {
        console.log(error)
        loadingProducts.style.display = "none";
        displayMessage("error", MESSAGES.error, ".message__container")
    }
})();





