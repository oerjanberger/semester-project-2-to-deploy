import { getProductFromBasket } from "../../../utils/storage.js";

export default function basketQuantityCounter() {
    const currentProductsInBasket = getProductFromBasket();
    const basketCount = document.querySelectorAll(".basket__count");
    let quantity = 0;

    if (currentProductsInBasket.length === 0) {
        basketCount.forEach(div => div.style.display = "none")
    }
    else {
        currentProductsInBasket.forEach((product) => {
            quantity += product.quantity;

            if (quantity >= 1) {
                basketCount.forEach(div => div.style.display = "block");
            }
            basketCount.forEach(div => div.innerHTML = quantity)
        });
    };
};