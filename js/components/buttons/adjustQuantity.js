import { getProductFromBasket, saveToBasket } from "../../utils/storage.js";
import renderBasket from "../renderHtml/renderBasket.js";
import basketQuantityCounter from "../common/basketQuantityCounter.js";
import renderModalBasket from "../modals/renderModalBasket.js";

export function plusProduct() {
    const id = this.dataset.id
    const currentProductsInBasket = getProductFromBasket();

    const thisProduct = currentProductsInBasket.find((product) => {
        return product.id === id;
    });
    thisProduct.quantity++;
    saveToBasket(currentProductsInBasket);
    renderBasket();
    renderModalBasket();
    basketQuantityCounter();
};

export function minusProduct() {
    const id = this.dataset.id
    const modalContainer = document.querySelector(".modal__container");
    const modalLogo = document.querySelector(".modal__logo");
    const modalMessage = document.querySelector(".modal__message");
    const cancelBtn = document.querySelector("#cancel__btn");
    const confirmBtn = document.querySelector("#confirm__btn");

    const currentProductsInBasket = getProductFromBasket();
    const thisProduct = currentProductsInBasket.find((product) => {
        return product.id === id;
    });

    if (thisProduct.quantity > 1) {

        thisProduct.quantity--;
        saveToBasket(currentProductsInBasket);

    } else if (thisProduct.quantity === 1) {

        modalContainer.style.display = "block";
        modalLogo.innerHTML = `<i class="fas fa-shopping-bag modal__basket" title="shopping basket"></i>`;
        modalMessage.innerHTML = `<p>Please confirm that you want to remove ${thisProduct.title} from your basket</p>`;
        (function getFocus() {
            cancelBtn.focus();
        })();

        confirmBtn.addEventListener("click", () => {
            modalContainer.style.display = "none";
            const updatedBasket = currentProductsInBasket.filter((product) => product.id !== id);
            saveToBasket(updatedBasket);
            renderBasket();
            renderModalBasket();
            basketQuantityCounter();
        });

        cancelBtn.addEventListener("click", () => {
            modalContainer.style.display = "none";
        });
    }
    renderBasket();
    renderModalBasket();
    basketQuantityCounter();
}