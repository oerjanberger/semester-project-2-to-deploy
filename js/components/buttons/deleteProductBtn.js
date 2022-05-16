import { baseUrl } from "../../data/api.js";
import { getToken, getProductFromBasket, saveToBasket, getProductFromFavorites, saveToFavorites } from "../../utils/storage.js";

export default function deleteProductBtn() {
    const deleteBtn = document.querySelector("#delete__product__btn");
    const querystring = document.location.search;
    const params = new URLSearchParams(querystring);
    const id = params.get("id");
    deleteBtn.onclick = function () {
        const modalContainer = document.querySelector(".modal__container");
        const modalLogo = document.querySelector(".modal__logo");
        const modalMessage = document.querySelector(".modal__message");
        const cancelBtn = document.querySelector("#cancel__btn");
        const confirmBtn = document.querySelector("#confirm__btn");

        modalContainer.style.display = "block";
        modalLogo.innerHTML = `<img src="logo/Logo_svg.svg" alt="Baby Bliss logo" class="nav__logo">`;
        modalMessage.innerHTML = `<p>Please confirm that you want to delete this product</p>`;

        confirmBtn.onclick = async function () {
            const productUrl = baseUrl + "products/" + id;
            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const response = await fetch(productUrl, options);
                const json = await response.json();
                location.href = "/";
                console.log(json);

                const currentProductsInBasket = getProductFromBasket();
                const productExistInBasket = currentProductsInBasket.find((product) => {
                    return product.id === id;
                });

                if (productExistInBasket) {
                    const updateBasket = currentProductsInBasket.filter(product => product.id !== id)
                    saveToBasket(updateBasket)
                };

                const currentFavorites = getProductFromFavorites();
                const productExistsInFavorites = currentFavorites.find((fav) => {
                    return fav.id === id;
                });
                if (productExistsInFavorites) {
                    const updateFavorites = currentFavorites.filter(product => product.id !== id)
                    saveToFavorites(updateFavorites)
                };
            } catch (error) {
                console.log(error);
            }
        };
        cancelBtn.addEventListener("click", () => {
            modalContainer.style.display = "none";
        });
    };
};