import { getProductFromFavorites, getToken } from "../../utils/storage.js";
import addProductToFavorites from "../buttons/favoritesButtons/addProductToFavorites.js";
import addProductToBasket from "../buttons/basketButtons/addProductToBasket.js";
import imageModal from "../modals/imageModal.js";

export default function renderProductDetails(product) {
    const productDetailsContainer = document.querySelector(".product__details__container");
    const productDescription = product.attributes.Description;
    const productImage = product.attributes.Image.data.attributes.url;
    const productImageAlt = product.attributes.Image.data.attributes.alternativeText
    const productTitle = product.attributes.Title;
    const productPrice = product.attributes.Price;
    const token = getToken();

    let cssClass = "far";
    let heartAriaLabel = "add"
    let heartAriaLabelCont = "to my favorites"
    const favorites = getProductFromFavorites();
    const isFav = favorites.find((fav) => {
        return parseInt(fav.id) === product.id;
    })

    if (isFav) {
        cssClass = "fas";
        heartAriaLabel = "remove"
        heartAriaLabelCont = "from my favorites"
    };

    if (token) {
        var productButtons = `<a href="edit.html?id=${product.id}"><button class="standard__cta__btn edit__btn" data-id="${product.id}" data-title="${productTitle}" data-price="${productPrice}" data-image="${productImage}" data-alt="${productImageAlt}">Edit product</button></a>
        <button class="standard__cta__btn add__to__basket" data-id="${product.id}" data-title="${productTitle}" data-price="${productPrice}" data-image="${productImage}" data-alt="${productImageAlt}">Add to basket</button>`
    } else if (!token) {
        var productButtons = `<button class="standard__cta__btn add__to__basket product__details__btn" data-id="${product.id}" data-title="${productTitle}" data-price="${productPrice}" data-image="${productImage}" data-alt="${productImageAlt}">Add to basket</button>`
    }

    productDetailsContainer.innerHTML += `
        <div class="loading__products"></div>
        <div class="product__detail__title">
            <h1>${productTitle}</h1>
        </div>
        <div class="product__detail__grid">
            <div class="details__img__fav__container">
                <div class="favorite__icon__container"><i class="${cssClass}  fa-heart favorite__button" tabindex="0" data-id="${product.id}" data-title="${productTitle}" data-image="${productImage}" data-alt="${productImageAlt}" data-price="${productPrice}" title="${heartAriaLabel}${productTitle}${heartAriaLabelCont}"></i></div>
                <div>
                    <div class="product__details__img__container">
                    <img src="${productImage}" alt="${productImageAlt}" class="product__details__image" tabindex="0"></div>
                </div>
            </div>
            <div class="image__modal__container">
            <div class="close"><i class="fas fa-times close__btn" title="close image" tabindex="0"></i></div>
            <img class="image__modal">
        </div>
            <div class="product__detail__info">
                <h2>Product description</h2>
                <p>${productDescription}</p>
                <p class="product__detail__price">NOK ${productPrice}</p>     
            </div>
            <div class="basket__btn__container product__details__btn__container">${productButtons}</div>
        </div>`;
    addProductToFavorites();
    addProductToBasket();
    imageModal();
}



