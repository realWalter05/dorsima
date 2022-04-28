
document.addEventListener("scroll", NavbarScroll);
function NavbarScroll() {
    if (window.pageYOffset > document.getElementById("services").offsetTop + 20) {
        document.getElementById("navbar").classList.remove("navbar-dark");
        document.getElementById("navbar").classList.add("navbar-light");
        document.getElementById("navbar").classList.add("navbar-white");
    } else {
        document.getElementById("navbar").classList.remove("navbar-light");
        document.getElementById("navbar").classList.remove("navbar-white");
        document.getElementById("navbar").classList.add("navbar-dark");
    }
}
