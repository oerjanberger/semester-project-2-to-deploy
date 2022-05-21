import { getProductFromFavorites, saveToFavorites } from "../../../utils/storage.js";
import renderFavorites from "../../renderHtml/renderFavorites.js";
import navHeart from "../../common/nav/navHeart.js";

export default function removeProductFromFavorites() {
    const favbtn = document.querySelectorAll(".favorite__button");

    favbtn.forEach((button) => { button.addEventListener("click", removeFromFavorites) });

    function removeFromFavorites() {
        this.classList.toggle("far");
        this.classList.toggle("fas");

        const id = this.dataset.id;
        const currentFavorites = getProductFromFavorites();

        const productExists = currentFavorites.find((fav) => {
            return fav.id === id;
        });

        if (productExists) {
            const newFavorite = currentFavorites.filter((fav) => fav.id !== id);
            saveToFavorites(newFavorite);
            renderFavorites();
        }
        navHeart();
    }
}