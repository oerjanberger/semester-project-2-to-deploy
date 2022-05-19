export default function filterProducts() {
    const filterInput = document.querySelector(".search");
    const filterBtnContainer = document.querySelector(".filter__btn__container");

    filterInput.onkeyup = function () {
        filterValue = filterInput.value.trim().toLowerCase();
        filterBtnContainer.innerHTML = `<a href="search.html?search=${filterValue}"><button type="button" class="filter__btn"><i
        class="fas fa-search"></i></button></a>`;
    }
}

