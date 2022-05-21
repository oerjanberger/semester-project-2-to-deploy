export default function stickyNav() {
    window.onscroll = function () { addSticky() };

    const navBar = document.querySelector("header");
    const sticky = navBar.offsetTop;

    function addSticky() {
        if (window.pageYOffset > sticky) {
            navBar.classList.add("sticky");
        } else {
            navBar.classList.remove("sticky");
        }
    };
}