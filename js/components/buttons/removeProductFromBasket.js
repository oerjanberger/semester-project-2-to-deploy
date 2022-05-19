import { getProductFromBasket, saveToBasket } from "../../utils/storage.js";
import renderBasket from "../renderHtml/renderBasket.js";
import basketQuantityCounter from "../common/basketQuantityCounter.js";
import renderModalBasket from "../modals/renderModalBasket.js";

export default function removeProductFromBasket() {
    const modalContainer = document.querySelector(".modal__container");
    const modalLogo = document.querySelector(".modal__logo");
    const modalMessage = document.querySelector(".modal__message");
    const cancelBtn = document.querySelector("#cancel__btn");
    const confirmBtn = document.querySelector("#confirm__btn");
    const removeProductBtn = document.querySelectorAll(".product__trash");

    removeProductBtn.forEach((btn) => { btn.addEventListener("click", removeProduct) });

    function removeProduct() {
        const id = this.dataset.id;
        const currentProductsInBasket = getProductFromBasket();
        const productExists = currentProductsInBasket.find((product) => {
            return product.id === id;
        });

        if (productExists) {
            modalContainer.style.display = "block"
            modalLogo.innerHTML = `<i class="fas fa-shopping-bag modal__basket" aria-label="shopping basket"></i>`;
            modalMessage.innerHTML = `<p>Please confirm that you want to remove ${productExists.quantity} x ${productExists.title} from your basket</p>`;

            confirmBtn.addEventListener("click", () => {
                modalContainer.style.display = "none";
                const updatedBasket = currentProductsInBasket.filter((product) => product.id !== id);
                saveToBasket(updatedBasket);
                renderBasket();
                renderModalBasket()
            });
            cancelBtn.addEventListener("click", () => {
                modalContainer.style.display = "none";
            });

        };
        basketQuantityCounter();
    };

};