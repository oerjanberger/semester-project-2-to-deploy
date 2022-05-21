import renderFavorites from "../../components/renderHtml/renderFavorites.js";
import navHeart from "../common/nav/navHeart.js";
import { FAVORITES_KEY } from "../../constants/keys.js";

export function clearFavoritesFromStorage() {
    const modalContainer = document.querySelector(".modal__container");
    const modalLogo = document.querySelector(".modal__logo");
    const modalMessage = document.querySelector(".modal__message");
    const cancelBtn = document.querySelector("#cancel__btn");
    const confirmBtn = document.querySelector("#confirm__btn");

    modalContainer.style.display = "block";
    modalLogo.innerHTML = `<i class="fas fa-heart modal__favorite"></i>`;
    modalMessage.innerHTML = `<p>Are you sure you want to remove all products from favorites?</p>`;
    (function getFocus() {
        cancelBtn.focus();
    })();

    confirmBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
        localStorage.removeItem(FAVORITES_KEY);
        renderFavorites();
        navHeart();
    });

    cancelBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    window.onclick = function (event) {
        if (event.target === modalContainer) {
            modalContainer.style.display = "none";
        }
    }
}