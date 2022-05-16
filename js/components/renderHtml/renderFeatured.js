import MESSAGES from "../../constants/messages.js";
import displayMessage from "../common/displayMessage.js";
import { getToken, getProductFromFavorites } from "../../utils/storage.js";
import addProductToFavorites from "../buttons/addProductToFavorites.js";

export default function renderFeatured(products) {
    if (products.length === 0) {
        return displayMessage("warning", MESSAGES.noResult, ".featured__message__container");
    }

    const featuredContainer = document.querySelector(".featured__container");

    featuredContainer.innerHTML = "";

    products.forEach(function (product) {
        if (product.attributes.Featured) {
            const token = getToken();

            if (token) {
                var productButtons = `<a href="product_details.html?id=${product.id}"><button class="standard__cta__btn"><span>View product</span></button></a>
                                    <a href="edit.html?id=${product.id}"><button class="standard__cta__btn edit__btn"><span>Edit product</span></button></a>`
            } else if (!token) {
                var productButtons = `<a href="product_details.html?id=${product.id}"><button class="standard__cta__btn"><span>View product</span></button></a>`
            }
            const productImage = product.attributes.Image.data.attributes.url;
            const productImageAlt = product.attributes.Image_alt_text;
            const productTitle = product.attributes.Title;
            const productPrice = product.attributes.Price;
            const productId = product.id;

            let cssClass = "far";
            let heartAriaLabel = "add"
            let heartAriaLabelCont = "to my favorites"
            const favorites = getProductFromFavorites();
            const isFav = favorites.find((fav) => {
                return parseInt(fav.id) === productId;
            })

            if (isFav) {
                cssClass = "fas";
                heartAriaLabel = "remove"
                heartAriaLabelCont = "from my favorites"
            };

            featuredContainer.innerHTML += `
            <div class="product__card">
                <div class="favorite__icon__container"><i class="${cssClass} fa-heart favorite__button" data-id="${productId}" data-title="${productTitle}" data-image="${productImage}" data-alt="${productImageAlt}" data-price="${productPrice}" aria-label="${heartAriaLabel}${productTitle}${heartAriaLabelCont}"></i></div>
                <a href="product_details.html?id=${product.id}" class="product__card__info__container">
                    <div class="product__img__container"><img src="${productImage}" alt="${productImageAlt}" class="product__image"></div>
                    <div class="product__card__info">
                        <h3>${productTitle}</h3>
                        <p class="product__card__price">NOK ${productPrice},-</p>
                    </div>
                </a>
                <div class="button__container">
                    ${productButtons}
                </div>
            </div>`;

        };
    });
    addProductToFavorites();
};