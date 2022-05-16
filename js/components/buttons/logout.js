import { clearUserFromStorage } from "../../utils/storage.js";

export default function logout() {
    const modalContainer = document.querySelector(".modal__container");
    const modalTitle = document.querySelector(".modal__logo");
    const modalMessage = document.querySelector(".modal__message");
    const cancelBtn = document.querySelector("#cancel__btn");
    const confirmBtn = document.querySelector("#confirm__btn");
    const logoutBtn = document.querySelectorAll(".logout__btn");
    if (logoutBtn) {
        logoutBtn.forEach((btn) => { btn.addEventListener("click", confirmLogout) });
    };

    function confirmLogout() {
        modalContainer.style.display = "block";
        modalTitle.innerHTML = `<img src="logo/Logo_svg.svg" alt="Baby Bliss logo" class="nav__logo">`;
        modalMessage.innerHTML = `<p>Are you sure you want to logout?</p>`;

        confirmBtn.addEventListener("click", () => {
            const currentPage = window.location.href;
            if (currentPage === "/edit.html" || currentPage === "/add_product.html") {
                clearUserFromStorage();
                location.href = "/";
            } else {
                clearUserFromStorage();
                location.href = currentPage;
            }
        });
        cancelBtn.addEventListener("click", () => {
            modalContainer.style.display = "none";
        });
    };
};