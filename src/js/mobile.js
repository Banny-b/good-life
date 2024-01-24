document.addEventListener('DOMContentLoaded', function() {
    const mobOpen = document.querySelector('.header-burger');
    const mobClose = document.querySelector('.mob-menu__close-btn');
    const mobile = document.querySelector('.mob-wrapper');

    mobOpen.addEventListener('click', function(event) {
        event.preventDefault();
        mobile.classList.add('active');
    });

    mobClose.addEventListener('click', function(event) {
        mobile.classList.remove('active');
    });

    // Close menu when clicking on link
    const menuMobile = document.querySelectorAll('.mob-wrapper a');

    if (menuMobile) {
        menuMobile.forEach(function(link) {
            link.addEventListener('click', function() {
                mobile.classList.remove('active');
            });
        });
    }
});
