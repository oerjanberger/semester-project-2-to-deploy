import { getProductFromFavorites, saveToFavorites } from "../../../utils/storage.js";
import navHeart from "../../common/nav/navHeart.js";

export default function addProductToFavorites() {
    const favbtn = document.querySelectorAll(".favorite__button");

    favbtn.forEach((button) => { button.addEventListener("click", favoriteClick) });

    function favoriteClick() {
        this.classList.toggle("far");
        this.classList.toggle("fas");

        const id = this.dataset.id;
        const title = this.dataset.title;
        const image = this.dataset.image;
        const alt = this.dataset.alt;
        const price = this.dataset.price;

        const currentFavorites = getProductFromFavorites();

        const productExists = currentFavorites.find((fav) => {
            return fav.id === id;
        })

        if (!productExists) {
            const thisProduct = { id: id, title: title, image: image, alt: alt, price: price };
            currentFavorites.push(thisProduct);
            saveToFavorites(currentFavorites);
        } else {
            const newFavorite = currentFavorites.filter((fav) => fav.id !== id);
            saveToFavorites(newFavorite);
        };
        navHeart();
    }

}

