const container = document.querySelector('.home-trending__content');
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  container.classList.add('active');
});

container.addEventListener('mouseleave', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mouseup', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1; // Velocidade do scroll
  container.scrollLeft = scrollLeft - walk;
});


document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.getElementById('toggleButton');
    var toggleComponent = document.getElementById('toggleComponent');

    toggleButton.addEventListener('click', function() {
        toggleComponent.classList.toggle('hidden');
    });
});

function navigateTo(url) {
    window.location.href = url;
}
