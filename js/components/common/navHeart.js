import { getProductFromFavorites } from "../../utils/storage.js";

export default function navHeart() {
    const savedToFavorites = getProductFromFavorites();
    const navHearts = document.querySelectorAll(".nav__heart");

    if (savedToFavorites.length > 0) {
        navHearts.forEach(navigationHearts => navigationHearts.classList.add("fa"));
    } else {
        navHearts.forEach(navigationHearts => navigationHearts.classList.remove("fa"));
    }
}