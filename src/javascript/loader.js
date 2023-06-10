window.addEventListener('load', function () {
  var loader = document.getElementById('loader');
  loader.style.display = 'block';

  setTimeout(function () {
    loader.style.display = 'none';
  }, 1000);
});
