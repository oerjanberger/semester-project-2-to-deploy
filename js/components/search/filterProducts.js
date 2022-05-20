export default function filterProducts() {
    const filterInput = document.querySelector(".search");
    const filterBtnContainer = document.querySelector(".filter__btn__container");
    const filterBtn = document.querySelector(".filter__btn")
    let filterValue = filterInput.value.trim().toLowerCase();

    filterInput.onkeyup = function () {
        filterValue = filterInput.value.trim().toLowerCase();
        filterBtnContainer.innerHTML = `<a href="search.html?search=${filterValue}"><button type="button" class="filter__btn"><i
        class="fas fa-search"></i></button></a>`;
    }

    filterBtn.onclick = function () {
        filterValue = filterInput.value.trim().toLowerCase();
        filterBtnContainer.innerHTML = `<a href="search.html?search=${filterValue}"><button type="button" class="filter__btn"><i
        class="fas fa-search"></i></button></a>`;
    }
}

