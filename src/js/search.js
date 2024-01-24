document.addEventListener("DOMContentLoaded", function() {
    const searchLink = document.querySelector(".header-inner__search-link");
    const searchImg = document.querySelector(".header-inner__search-img");
    const searchInputContainer = document.querySelector(".search-input-container");

    const toggleSearchInput = () => {
        searchInputContainer.style.display = (searchInputContainer.style.display === "block") ? "none" : "block";
    };

    const clickHandler = (event) => {
        if (!event.target.matches('.header-inner__search-link, .header-inner__search-img')) {
            searchInputContainer.style.display = "none";
        }
    };

    searchLink.addEventListener("click", toggleSearchInput);
    searchImg.addEventListener("click", toggleSearchInput);

    searchInputContainer.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    document.addEventListener("click", clickHandler);
});