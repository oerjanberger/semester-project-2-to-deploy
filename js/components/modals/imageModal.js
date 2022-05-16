export default function imageModal() {
    const productDetailsImage = document.querySelector(".product__details__image");
    const imageModalContainer = document.querySelector(".image__modal__container");
    const imageModal = document.querySelector(".image__modal");
    const closeBtn = document.querySelector(".close");

    productDetailsImage.addEventListener("click", showImageModal);

    function showImageModal() {
        imageModalContainer.style.display = "block";
        imageModal.src = this.src;
        imageModal.alt = this.alt;
    }

    closeBtn.onclick = function () {
        imageModalContainer.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target === imageModalContainer) {
            imageModalContainer.style.display = "none";
        }

    }
}