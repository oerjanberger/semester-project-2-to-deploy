import { baseUrl } from "./data/api.js";
import createNav from "./components/common/createNav.js";
import renderProducts from "./components/renderHtml/renderProducts.js";
import MESSAGES from "./constants/messages.js";
import displayMessage from "./components/common/displayMessage.js";
import filterProducts from "./components/search/searchProducts.js";

let count = 1;
let totalPages = 0;
const previousPage = document.querySelector(".fa-chevron-left")
const nextPage = document.querySelector(".fa-chevron-right")
const messageContainer = document.querySelector(".pagination__message__container");
const loadingProducts = document.querySelector(".loading__products")

createNav();

async function getAllProducts() {
    const productUrl = `${baseUrl}products?pagination[page]=${count}&pagination[pageSize]=16&populate=*`;
    try {
        const response = await fetch(productUrl);
        const result = await response.json();
        loadingProducts.style.display = "none";
        const products = result.data;
        const pages = result.meta;
        totalPages = pages.pagination.pageCount;

        renderProducts(products);
        showPreviousPageButton()
        showNextPageButton()
        filterProducts()

        const paginationContainer = document.querySelector(".pagination__container");
        if (pages.pagination.pageCount >= 2) {
            paginationContainer.style.display = "flex";

            const pageContainer = document.querySelector(".pages__container");
            pageContainer.innerHTML = "";
            pageContainer.innerHTML = `<p>${pages.pagination.page}</p>`;

        } else {
            paginationContainer.style.display = "none";
            messageContainer.innerHTML = "";
        }
    }
    catch (error) {
        console.log(error);
        loadingProducts.style.display = "none";
        displayMessage("error", MESSAGES.error, ".message__container");
    }
};
getAllProducts();

function showPreviousPageButton() {
    if (count === 1) {
        previousPage.style.display = "none";
    } else {
        previousPage.style.display = "block";
    }
}

function showNextPageButton() {
    if (count >= totalPages) {
        displayMessage("error", MESSAGES.noMoreProducts, ".pagination__message__container");
        nextPage.style.display = "none";
    } else {
        nextPage.style.display = "block";
        messageContainer.innerHTML = "";
    }
}

function showNextPage() {
    count++;
    getAllProducts();
    window.scrollTo(0, 0)
};

function showPreviousPage() {
    count--;
    getAllProducts();
    window.scrollTo(0, 0)
};

previousPage.addEventListener("click", showPreviousPage);
nextPage.addEventListener("click", showNextPage);