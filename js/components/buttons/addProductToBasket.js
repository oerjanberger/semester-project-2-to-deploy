import { getProductFromBasket, saveToBasket } from "../../utils/storage.js";
import basketQuantityCounter from "../common/basketQuantityCounter.js";

export default function addProductToBasket() {
    const addToBasketBtn = document.querySelector(".add__to__basket");

    addToBasketBtn.addEventListener("click", addToBasketClick);

    function addToBasketClick() {
        const modalContainer = document.querySelector(".modal__container");
        const modalLogo = document.querySelector(".modal__logo");
        const modalMessage = document.querySelector(".modal__message");
        const continueShoppingBtn = document.querySelector("#cancel__btn");
        const basketBtn = document.querySelector("#confirm__btn");
        const id = this.dataset.id;
        const title = this.dataset.title;
        const image = this.dataset.image;
        const alt = this.dataset.alt;
        const price = this.dataset.price;
        let productCount = 1;
        continueShoppingBtn.innerHTML = "Got it"
        basketBtn.innerHTML = "Basket"
        modalContainer.style.display = "block"

        const currentProductsInBasket = getProductFromBasket();

        const productExists = currentProductsInBasket.find((product) => {
            return product.id === id;
        });

        if (!productExists) {
            const thisProduct = { id: id, title: title, image: image, alt: alt, price: price, quantity: productCount };
            currentProductsInBasket.push(thisProduct);
            saveToBasket(currentProductsInBasket);

            modalLogo.innerHTML = `<i class="fas fa-shopping-bag modal__basket" title="shopping basket"></i>`;
            modalMessage.innerHTML = `<p>1 x ${title} added to basket.</p>`;
        } else {
            const specificProduct = currentProductsInBasket.find((product) => {
                return product.id === id;
            });
            specificProduct.quantity++;
            modalLogo.innerHTML = `<i class="fas fa-shopping-bag modal__basket" title="shopping basket"></i>`;
            modalMessage.innerHTML = `<p>1 x "${title}" added to basket.Now ${specificProduct.quantity} "${title}" in Basket</p>`;
            saveToBasket(currentProductsInBasket);
        };

        continueShoppingBtn.addEventListener("click", () => {
            modalContainer.style.display = "none";

        });
        basketBtn.addEventListener("click", () => {
            location.href = "/basket.html"
        });

        basketQuantityCounter()

    }
}