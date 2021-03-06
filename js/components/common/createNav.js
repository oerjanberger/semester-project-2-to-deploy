import { getToken } from "../../utils/storage.js";
import stickyNav from "./stickyNav.js";
import navHeart from "./navHeart.js";
import basketQuantityCounter from "./basketQuantityCounter.js";
import logout from "../buttons/logout.js";
import renderModalBasket from "../modals/renderModalBasket.js";

export default function createNav() {
    stickyNav();

    const { pathname } = document.location;
    const navContainer = document.querySelector(".nav");
    const hamburgerMenu = document.querySelector(".hamburger__label");
    const menuCheckbox = document.querySelector(".hamburger__menu__input");
    const altNavContainer = document.querySelector(".alt__nav__container");
    const token = getToken();

    let authLink = `<li><a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">
                    Login</a><a href="login.html"><i class="fas fa-user-alt" title="login"></i></a></li>`;
    let secondAuthlink = `<li class="alt__nav__user">
    <a href="login.html"><i class="fas fa-user-alt" title="login"></i></a>
</li>`;

    if (token) {
        authLink = `<li><a href="add_product.html" class="${pathname === "/add_product.html" ? "active" : ""}">Add Product</a><a href="add_product.html"><i class="fas fa-plus" title="add product"></i></a></li>
        <li><button class="standard__cta__btn logout__btn logout__nav">Logout</button></li>`;
        if (screen.width >= 720) {
            secondAuthlink = `<li class="alt__nav__add"><a href="add_product.html"><i class="fas fa-plus" title="add product"></i></a></li>
            <li class="alt__nav__user logout__btn"><a><i class="fas fa-user-alt alt__logout__btn" title="logout user" tabindex="0"></i><div class="logout__user__x">X</div></a></li>`;
        } else {
            secondAuthlink = `<li class="alt__nav__user logout__btn" tabindex="0"><a><i class="fas fa-user-alt alt__logout__btn" title="log out user" tabindex="0"></i><div class="logout__user__x">X</div></a></li>`;
        }

    }

    navContainer.innerHTML = `<ul class="nav__list">
                                <li><a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a></li>
                                <li><a href="products.html" class="${pathname === "/products.html" ? "active" : ""}">Products</a></li>
                                <li><a href="basket.html" class="${pathname === "/basket.html" ? "active" : ""}">Basket </a>
                                <a href="basket.html"><div class="basket__icon__container"><i class="fas fa-shopping-bag" title="shopping basket"></i>
                                <div class="basket__count"></div></div></a></li>
                                <li><a href="favorites.html" class="${pathname === "/favorites.html" ? "active" : ""}">Favorites</a>
                                <a href="favorites.html"><i class="far fa-heart nav__heart" title="my favorites"></i></a></li>
                                <li><a href="about.html" class="${pathname === "/about.html" ? "active" : ""}">About us</a></li>
                                ${authLink}
                        </ul>`;

    altNavContainer.innerHTML = `<ul class="alt__navigation">
                                        <li class="alt__nav__basket">
                                            <a href="basket.html"><i class="fas fa-shopping-bag" title="shopping basket"></i></a>
                                            <div class="basket__count"></div>
                                            <div class="minibasket__modal__container">
                                                <div class="minibasket__products__container"></div>
                                                <hr>
                                                <div class="minibasket__modal__total__container">
                                                    <h3>Total sum:</h3>
                                                    <p class="minibasket__modal__total__sum"></p>
                                                </div>
                                                <div class="basket__btn__container">
                                                    <a href="basket.html"><button class="standard__cta__btn edit__btn modal__btn"
                                                            title="cancel">Basket</button></a>
                                                    <a><button class="standard__cta__btn modal__btn"
                                                            title="confirm">Checkout</button></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="alt__nav__favorites">
                                            <a href="favorites.html"><i class="far fa-heart nav__heart" title="my favorites"></i></a>
                                        </li>
                                        ${secondAuthlink}
                                    </ul>`;
    navHeart();

    hamburgerMenu.addEventListener("click", toggleNav);
    function toggleNav() {
        if (!menuCheckbox.checked) {
            navContainer.style.display = "block"

        } else if (menuCheckbox.checked) {
            navContainer.style.display = "none"
        }
    };

    hamburgerMenu.onkeyup = function () {
        if (!menuCheckbox.checked) {
            navContainer.style.display = "block"
        } else if (menuCheckbox.checked) {
            navContainer.style.display = "none"
        }
    }

    basketQuantityCounter();
    renderModalBasket()
    logout()
}

