export default function setToFeatured() {
    const featuredYesBtn = document.querySelector(".featured__yes");
    const featuredNoBtn = document.querySelector(".featured__no");
    const featuredInput = document.querySelector(".featured__checkbox");

    // Added for accessibility
    featuredYesBtn.onkeyup = function (event) {
        if (event.keyCode === 13) {
            featuredInput.checked === true;
            featuredYesBtn.style.color = "#B2C6BD";
            featuredNoBtn.style.color = "#423F38";
        }
    }
    // Added for accessibility
    featuredNoBtn.onkeyup = function (event) {
        if (event.keyCode === 13) {
            featuredInput.checked === false;
            featuredYesBtn.style.color = "#423F38";
            featuredNoBtn.style.color = "#E28D8D";
        }
    }

    featuredYesBtn.addEventListener("click", productFeatured);
    featuredNoBtn.addEventListener("click", productNotFeatured);

    if (featuredInput.checked === false) {
        featuredNoBtn.style.color = "#E28D8D";
    } else {
        featuredYesBtn.style.color = "#B2C6BD";
        featuredNoBtn.style.color = "#423F38";
    };

    function productFeatured() {
        featuredYesBtn.style.color = "#B2C6BD";
        featuredNoBtn.style.color = "#423F38";
        featuredInput.checked = true
    }

    function productNotFeatured() {
        featuredYesBtn.style.color = "#423F38";
        featuredNoBtn.style.color = "#E28D8D";
        featuredInput.checked = false
    }
}