document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card.animate');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalBestseller = document.getElementById('modal-bestseller');
    const closeModal = document.querySelector('.close');
    const header = document.querySelector('header');

    if (!modal || !modalImage || !modalTitle || !modalDescription || !closeModal || !header) {
        console.error('Elemen tidak ditemukan di dalam DOM.');
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.remove('inactive');
            } else {
                entry.target.classList.add('inactive');
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.1
    });

    productCards.forEach(card => {
        observer.observe(card);

        card.addEventListener('click', function() {
            const imageSrc = card.getAttribute('data-image');
            const title = card.getAttribute('data-title');
            const longDescription = card.getAttribute('data-long-description');
            const isBestSeller = card.classList.contains('bestseller');

            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = longDescription;

            if (isBestSeller) {
                modalBestseller.style.display = 'inline-block';
            } else {
                modalBestseller.style.display = 'none';
            }

            modal.classList.add('show');
            modal.classList.remove('hide');
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
        });
    });

    function closeModalFunction() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            modalImage.src = '';
            modalTitle.textContent = '';
            modalDescription.textContent = '';
            modalBestseller.style.display = 'none'; 
        }, 500);
    }

    closeModal.addEventListener('click', closeModalFunction);

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModalFunction();
        }
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('small');
        } else {
            header.classList.remove('small');
        }
    });
});
