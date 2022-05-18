import createNav from "./components/common/createNav.js";
import renderFavorites from "./components/renderHtml/renderFavorites.js"

createNav();

renderFavorites()

const allProductsBtn = document.querySelector(".all__products__link__container");

allProductsBtn.addEventListener("mouseenter", e => {
    allProductsBtn.innerHTML = `<p>View all products</p> <img src="./logo/flying_stork.svg" alt="Babybliss stork logo"class="logo__btn flying__logo">`;
});
allProductsBtn.addEventListener("mouseleave", e => {
    allProductsBtn.innerHTML = `<p>View all products</p> <img src="./logo/Stork_SVG.svg" alt="Babybliss stork logo"class="logo__btn">`;
});

// Added because there where issues with the button where not directing the mobile users
allProductsBtn.addEventListener("click", () => {
    location.href = "/products.html"
});