const toggleBtn = document.querySelector(".toggle_icon");
const toggleMenu = document.querySelector(".toggle_menu");

toggleBtn.addEventListener("click", () => {
    toggleMenu.classList.toggle("active");
})