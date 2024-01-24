const modal = document.getElementById('mod');
const openModal = document.getElementById('open-mod');
const closeModal = document.getElementById('close-mod');

openModal.addEventListener('click', (event) => {
    event.preventDefault(); // Cancel standard click action on a link
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
});

closeModal.addEventListener('click', () => {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
});