// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Lightbox Carousel/Slider Functionality
let currentProjectImages = [];
let currentImageIndex = 0;

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalCounter = document.getElementById("modalCounter");
const prevBtn = document.getElementById("modalPrev");
const nextBtn = document.getElementById("modalNext");
const closeBtn = document.querySelector(".modal .close");

// Attach click listeners to all gallery items dynamically
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const imagesData = item.getAttribute('data-images');
        
        if (imagesData) {
            try {
                currentProjectImages = JSON.parse(imagesData);
            } catch (e) {
                currentProjectImages = imagesData.split(',');
            }
        } else {
            // Fallback for single images (like certificates section)
            const singleImg = item.querySelector('img').src;
            currentProjectImages = [singleImg];
        }
        
        if (currentProjectImages.length > 0) {
            currentImageIndex = 0;
            openModal();
        }
    });
});

function openModal() {
    modal.style.display = "flex"; // Using flex for exact layout centering
    updateModalImage();
    document.body.style.overflow = "hidden"; // Block page content scroll
}

function updateModalImage() {
    modalImg.src = currentProjectImages[currentImageIndex];
    modalCounter.textContent = `${currentImageIndex + 1} / ${currentProjectImages.length}`;
    
    // Hide navigation utilities if only 1 image exists
    if (currentProjectImages.length <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        modalCounter.style.display = "none";
    } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        modalCounter.style.display = "block";
    }
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function nextImage() {
    if (currentProjectImages.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        updateModalImage();
    }
}

function prevImage() {
    if (currentProjectImages.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateModalImage();
    }
}

// Event Listeners for controls
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
});

closeBtn.addEventListener('click', closeModal);

// Close modal when background wrapper overlay is clicked
modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
        closeModal();
    }
});

// Keyboard controls handler
document.addEventListener('keydown', function(e) {
    if (modal.style.display === "flex") {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    }
});