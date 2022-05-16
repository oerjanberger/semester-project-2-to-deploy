import { baseUrl } from "../../data/api.js";
import MESSAGES from "../../constants/messages.js";
import displayMessage from "../common/displayMessage.js";
import renderProducts from "../renderHtml/renderProducts.js";



export default function filterProducts() {
    const filterInput = document.querySelector(".filter");
    const filterMessageContainer = document.querySelector(".filter__message__container");

    filterInput.onkeyup = function () {
        const filterValue = filterInput.value.trim().toLowerCase();
        filterMessageContainer.style.display = "block";
        filterMessageContainer.innerHTML = `<h4>Products that contain "${filterValue}" in the Title or Description:</h4>`;

        if (!filterValue) {
            filterMessageContainer.style.display = "none";
        } else {
            (async function searchProducts() {
                const searchUrl = baseUrl + "products?pagination[page]=1&pagination[pageSize]=100&populate=*";
                try {
                    const response = await fetch(searchUrl);
                    const json = await response.json();
                    const searchResult = json.data;

                    const filteredProducts = searchResult.filter(function (searchResult) {
                        if (searchResult.attributes.Title.toLowerCase().includes(filterValue) || searchResult.attributes.Description.toLowerCase().includes(filterValue)) {
                            return true;
                        };
                    });
                    renderProducts(filteredProducts);
                } catch (error) {
                    console.log(error);
                    displayMessage("error", MESSAGES.error, ".filter__message__container");
                }
            })();
        }

    }
}
