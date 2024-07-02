document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggle = document.getElementById('dropdownMenuButton');
  const dropdownMenu = document.getElementById('dropdownMenu');

  dropdownToggle.addEventListener('click', () => {
    // Alterna a exibição do menu suspenso
    dropdownMenu.style.display =
      dropdownMenu.style.display === 'block' ? 'none' : 'block';

    // Troca a imagem
    const currentSrc = dropdownToggle.getAttribute('src');
    const altSrc = dropdownToggle.getAttribute('data-alt-src');
    dropdownToggle.setAttribute('src', altSrc);
    dropdownToggle.setAttribute('data-alt-src', currentSrc);
  });
});

document.getElementById('toggleButton').addEventListener('click', function () {
  const menu = document.getElementById('toggleComponent');
  menu.classList.toggle('active');
});

document.getElementById('toggle-input-image').addEventListener('click', function() {
  const searchInput = document.getElementById('search-input');
  if (searchInput.style.display === 'none' || searchInput.style.display === '') {
      searchInput.style.display = 'block';
  } else {
      searchInput.style.display = 'none';
  }
});