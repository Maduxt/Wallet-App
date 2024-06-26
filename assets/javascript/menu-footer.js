document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

    dropdownToggle.addEventListener('click', () => {
        // Alterna a exibição do menu suspenso
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';

        // Troca a imagem
        const currentSrc = dropdownToggle.getAttribute('src');
        const altSrc = dropdownToggle.getAttribute('data-alt-src');
        dropdownToggle.setAttribute('src', altSrc);
        dropdownToggle.setAttribute('data-alt-src', currentSrc);
    });
});