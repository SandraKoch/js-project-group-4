     window.addEventListener('scroll', function() {
            var backToTopButton = document.getElementById('back-to-top');
            if (window.scrollY > 250) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        window.addEventListener('DOMContentLoaded', function() {
            var backToTopButton = document.getElementById('back-to-top');
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                var header = document.querySelector('#header');
                header.scrollIntoView({ behavior: 'smooth' });
            });
        });