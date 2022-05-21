import { BASKET_KEY, FAVORITES_KEY, USERNAME, TOKEN_KEY } from "../constants/keys.js";

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