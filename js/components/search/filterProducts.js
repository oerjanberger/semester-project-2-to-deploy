export default function filterProducts() {
    const filterInput = document.querySelector(".search");
    const filterBtnContainer = document.querySelector(".filter__btn__container");
    const filterBtn = document.querySelector(".filter__btn")
    let filterValue = filterInput.value.toLowerCase().trim();

    filterInput.oninput = function () {
        filterValue = filterInput.value.toLowerCase().trim();
        filterBtnContainer.innerHTML = `<a href="search.html?search=${filterValue}"><button type="button" class="filter__btn"><i
        class="fas fa-search"></i></button></a>`;
    }

    filterBtn.onclick = function () {
        filterValue = filterInput.value.toLowerCase().trim();
        filterBtnContainer.innerHTML = `<a href="search.html?search=${filterValue}"><button type="button" class="filter__btn"><i
        class="fas fa-search"></i></button></a>`;
    }
}

