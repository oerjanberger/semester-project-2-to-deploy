import MESSAGES from "../../constants/messages.js";
import displayMessage from "../common/displayMessage.js";
import { getToken, getProductFromFavorites } from "../../utils/storage.js";
import { clearFavoritesFromStorage } from "../modals/clearFavoritesFromStorage.js"
import removeProductFromFavorites from "../buttons/favoritesButtons/removeProductFromFavorites.js";

export default function renderFavorites() {
    const favorites = getProductFromFavorites();
    const favoritesContainer = document.querySelector(".favorite__grid");
    const favoriteMessage = document.querySelector(".message__container");
    const clearFavoritesBtn = document.querySelector(".clear__favorites__btn");
    const token = getToken();



    favoritesContainer.innerHTML = "";
    favoriteMessage.innerHTML = "";
    if (favorites.length === 0) {
        displayMessage("warning", MESSAGES.noFavorites, ".message__container");
    }

    favorites.forEach((product) => {
        const favoritesPrice = parseFloat(product.price);
        const favoritesId = parseFloat(product.id);
        if (token) {
            var productButtons = `<a href="product_details.html?id=${product.id}"><button class="standard__cta__btn">View product</button></a>
                                <a href="edit.html?id=${product.id}"><button class="standard__cta__btn edit__btn">Edit product</button></a>`;
        } else if (!token) {
            var productButtons = `<a href="product_details.html?id=${product.id}"><button class="standard__cta__btn">View product</button></a>`;
        };

        favoritesContainer.innerHTML += `<div class="product__card">
        <div class="favorite__icon__container"><i class="fas fa-heart favorite__button" tabindex="0" data-id="${favoritesId}" title="remove ${product.title} from my favorites"></i></div>
        <a href="product_details.html?id=${product.id}" class="product__card__info__container">
            <div class="product__img__container"><img src="${product.image}" alt="${product.alt}" class="product__image"></div>
            <div class="product__card__info">
                <h3>${product.title}</h3>
                <p class="product__card__price">NOK ${favoritesPrice}</p>
            </div>
        </a>
        <div class="button__container">
        ${productButtons}
    </div>
    </div>`;
    });

    clearFavoritesBtn.addEventListener("click", clearFavoritesFromStorage);
    removeProductFromFavorites();
};