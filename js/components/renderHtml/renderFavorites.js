import MESSAGES from "../../constants/messages.js";
import displayMessage from "../common/displayMessage.js";
import { getToken, getProductFromFavorites } from "../../utils/storage.js";
import removeProductFromFavorites from "../buttons/removeProductFromFavorites.js";

export default function renderFavorites() {
    const favorites = getProductFromFavorites();
    const favoritesContainer = document.querySelector(".favorite__grid");
    const favoriteMessage = document.querySelector(".message__container");
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
            var productButtons = `<a href="product_details.html?id=${product.id}"><button class="standard__cta__btn"><span>View product</span></button></a>
                                <a href="edit.html?id=${product.id}"><button class="standard__cta__btn edit__btn"><span>Edit product</span></button></a>`
        } else if (!token) {
            var productButtons = `<a href="product_details.html?id=${product.id}"><button class="standard__cta__btn"><span>View product</span></button></a>`
        }

        favoritesContainer.innerHTML += `<div class="product__card">
        <div class="favorite__icon__container"><i class="fas fa-heart favorite__button" data-id="${favoritesId}" aria-label="remove ${product.title} from my favorites"></i></div>
        <a href="product_details.html?id=${product.id}" class="product__card__info__container">
            <div class="product__img__container"><img src="${product.image}" alt="${product.alt}" class="product__image"></div>
            <div class="product__card__info">
                <h3>${product.title}</h3>
                <p class="product__card__price">NOK ${favoritesPrice},-</p>
            </div>
        </a>
        <div class="button__container">
        ${productButtons}
    </div>
    </div>`;
    });
    removeProductFromFavorites()
};