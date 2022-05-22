import { baseUrl } from "./data/api.js";
import createNav from "./components/common/nav/createNav.js";
import renderProducts from "./components/renderHtml/renderProducts.js";
import MESSAGES from "./constants/messages.js";
import displayMessage from "./components/common/displayMessage.js";
import filterProducts from "./components/search/filterProducts.js";

let count = 1;
let totalPages = 0;
const previousPage = document.querySelector(".fa-chevron-left")
const nextPage = document.querySelector(".fa-chevron-right")
const messageContainer = document.querySelector(".pagination__message__container");
const loadingProducts = document.querySelector(".loading__products")

createNav();

async function getAllProducts() {
    const productUrl = `${baseUrl}products?pagination[page]=${count}&pagination[pageSize]=12&populate=*`;

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

filterProducts()

function showPreviousPageButton() {
    if (count === 1) {
        previousPage.style.display = "none";
    } else {
        previousPage.style.display = "block";
    }
}

function showNextPageButton() {
    if (count >= totalPages) {
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

// Added for accessibility
previousPage.onkeyup = function (event) {
    if (event.keyCode === 13) {
        showPreviousPage();
    }
}
nextPage.addEventListener("click", showNextPage);

// Added for accessibility
nextPage.onkeyup = function (event) {
    if (event.keyCode === 13) {
        showNextPage();
    }
}