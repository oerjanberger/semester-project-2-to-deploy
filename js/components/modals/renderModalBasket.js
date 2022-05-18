import { getProductFromBasket } from "../../utils/storage.js";

export default function renderModalBasket() {
    const basket = getProductFromBasket();
    const minibasketModalContainer = document.querySelector(".minibasket__modal__container");
    const minibasketModalProductContainer = document.querySelector(".minibasket__products__container");
    const minibasketTotalSum = document.querySelector(".minibasket__modal__total__sum")

    minibasketModalProductContainer.innerHTML = "";
    let sum = 0.00;

    if (basket.length === 0) {
        minibasketModalContainer.style.display = "none"
    }

    basket.forEach(function (product) {
        const sumPriceSpecificProduct = parseFloat(product.price).toFixed(2) * parseFloat(product.quantity);
        sum += sumPriceSpecificProduct;
        const totalPrice = sum.toFixed(2);

        minibasketModalProductContainer.innerHTML += `<div class="minibasket__modal__content">
                                                    <div class="minibasket__modal__products">
                                                        <a href="product_details.html?id=${product.id}">
                                                            <div class="minibasket__modal__card">
                                                                <img src="${product.image}" alt="${product.alt}"
                                                                    class="minibasket__modal__product__img">
                                                                <div class="minibasket__modal__product__info">
                                                                    <h3>${product.title}</h3>
                                                                    <div class="minibasket__quantity__container">
                                                                        <p>Quantity:</p>
                                                                        <p>${product.quantity}</p>
                                                                    </div>
                                                                    <div class="minibasket__price__container">
                                                                        <p>Price:</p>
                                                                        <p>NOK ${sumPriceSpecificProduct}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>`
        minibasketTotalSum.innerHTML = `NOK ${totalPrice}`
    });
}