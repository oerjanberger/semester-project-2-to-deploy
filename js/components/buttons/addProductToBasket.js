import MESSAGES from "../../constants/messages.js";
import { getProductFromBasket, saveToBasket } from "../../utils/storage.js";
import displayMessage from "../common/displayMessage.js";
import basketQuantityCounter from "../common/basketQuantityCounter.js";

export default function addProductToBasket() {
    const addToBasketBtn = document.querySelector(".add__to__basket");

    addToBasketBtn.addEventListener("click", addToBasketClick);

    function addToBasketClick() {
        const id = this.dataset.id;
        const title = this.dataset.title;
        const image = this.dataset.image;
        const alt = this.dataset.alt;
        const price = this.dataset.price;
        let productCount = 1;

        const currentProductsInBasket = getProductFromBasket();

        const productExists = currentProductsInBasket.find((product) => {
            return product.id === id;
        });

        if (!productExists) {
            const thisProduct = { id: id, title: title, image: image, alt: alt, price: price, quantity: productCount };
            currentProductsInBasket.push(thisProduct);
            saveToBasket(currentProductsInBasket);
        } else {
            const specificProduct = currentProductsInBasket.find((product) => {
                return product.id === id;
            });
            specificProduct.quantity++;
            saveToBasket(currentProductsInBasket);
        };
        window.scrollTo(0, 0)
        displayMessage("success", MESSAGES.productAddedToBasket, ".message__container")
        basketQuantityCounter()

    }
}