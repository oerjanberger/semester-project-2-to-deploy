import renderBasket from "../components/renderHtml/renderBasket.js";
import { BASKET_KEY, FAVORITES_KEY, USERNAME, TOKEN_KEY } from "../constants/keys.js";
import basketQuantityCounter from "../components/common/basketQuantityCounter.js";
import renderFavorites from "../components/renderHtml/renderFavorites.js";

export function saveToken(token) {
    saveToStorage(TOKEN_KEY, token);
}

export function getToken() {
    return getFromStorage(TOKEN_KEY);
}

export function saveUser(user) {
    saveToStorage(USERNAME, user);
}

export function getUsername() {
    const user = getFromStorage(USERNAME);

    if (user) {
        return user.username;
    }

    return null;
}

export function saveToFavorites(product) {
    saveToStorage(FAVORITES_KEY, product);
}

export function getProductFromFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);

    if (!favorites) {
        return [];
    }
    return JSON.parse(favorites);
}

export function saveToBasket(product) {
    saveToStorage(BASKET_KEY, product);
}

export function getProductFromBasket() {
    const myBasket = localStorage.getItem(BASKET_KEY);

    if (!myBasket) {
        return [];
    }
    return JSON.parse(myBasket);
}

export function clearBasketFromStorage() {
    const modalContainer = document.querySelector(".modal__container");
    const modalLogo = document.querySelector(".modal__logo");
    const modalMessage = document.querySelector(".modal__message");
    const cancelBtn = document.querySelector("#cancel__btn");
    const confirmBtn = document.querySelector("#confirm__btn");

    modalContainer.style.display = "block";
    modalLogo.innerHTML = `<i class="fas fa-shopping-bag modal__basket" aria-label="shopping basket"></i>`;
    modalMessage.innerHTML = `<p>Are you sure you want to clear your basket?</p>`;

    confirmBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
        localStorage.removeItem(BASKET_KEY);
        renderBasket();
        basketQuantityCounter()
    });

    cancelBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
}

export function clearFavoritesFromStorage() {
    const modalContainer = document.querySelector(".modal__container");
    const modalLogo = document.querySelector(".modal__logo");
    const modalMessage = document.querySelector(".modal__message");
    const cancelBtn = document.querySelector("#cancel__btn");
    const confirmBtn = document.querySelector("#confirm__btn");

    modalContainer.style.display = "block";
    modalLogo.innerHTML = `<i class="fas fa-heart modal__favorite"></i>`;
    modalMessage.innerHTML = `<p>Are you sure you want to remove all products from favorites?</p>`;

    confirmBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
        localStorage.removeItem(FAVORITES_KEY);
        renderFavorites();
    });

    cancelBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
}

export function clearUserFromStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
}