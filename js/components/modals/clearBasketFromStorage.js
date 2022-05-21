import renderBasket from "../../components/renderHtml/renderBasket.js";
import basketQuantityCounter from "../common/nav/basketQuantityCounter.js";
import { BASKET_KEY, } from "../../constants/keys.js";

export function clearBasketFromStorage() {
    const modalContainer = document.querySelector(".modal__container");
    const modalLogo = document.querySelector(".modal__logo");
    const modalMessage = document.querySelector(".modal__message");
    const cancelBtn = document.querySelector("#cancel__btn");
    const confirmBtn = document.querySelector("#confirm__btn");

    modalContainer.style.display = "block";
    modalLogo.innerHTML = `<i class="fas fa-shopping-bag modal__basket" title="shopping basket .modal__basket"></i>`;
    modalMessage.innerHTML = `<p>Are you sure you want to remove all products from your basket?</p>`;
    (function getFocus() {
        cancelBtn.focus();
    })();

    confirmBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
        localStorage.removeItem(BASKET_KEY);
        renderBasket();
        basketQuantityCounter()
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