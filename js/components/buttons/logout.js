import { clearUserFromStorage } from "../../utils/storage.js";

export default function logout() {
    const modalContainer = document.querySelector(".modal__container");
    const modalTitle = document.querySelector(".modal__logo");
    const modalMessage = document.querySelector(".modal__message");
    const cancelBtn = document.querySelector("#cancel__btn");
    const confirmBtn = document.querySelector("#confirm__btn");
    const logoutBtn = document.querySelectorAll(".logout__btn");
    const altLogoutBtn = document.querySelector(".alt__logout__btn")
    if (logoutBtn) {
        logoutBtn.forEach((btn) => { btn.addEventListener("click", confirmLogout) });
    };
    if (altLogoutBtn) {
        // Added for accessibility
        altLogoutBtn.onkeyup = function (event) {
            if (event.keyCode === 13) {
                confirmLogout();
            }
        }
    }



    function confirmLogout() {
        modalContainer.style.display = "block";
        modalTitle.innerHTML = `<img src="logo/Logo_svg.svg" alt="Baby Bliss logo" class="nav__logo modal__logo">`;
        modalMessage.innerHTML = `<p>Are you sure you want to logout?</p>`;
        (function getFocus() {
            cancelBtn.focus();
        })();

        confirmBtn.addEventListener("click", () => {
            clearUserFromStorage();
            location.href = "/";
        });

        cancelBtn.addEventListener("click", () => {
            modalContainer.style.display = "none";
        });
        window.onclick = function (event) {
            if (event.target === modalContainer) {
                modalContainer.style.display = "none";
            }
        }
    };

};