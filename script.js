// Theme handling
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Initialize theme based on system preference
setTheme(prefersDarkScheme.matches);

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    setTheme(e.matches);
});

// Manual theme toggle
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
});

// Mobile menu handling
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Gallery data
const galleryData = [
    {
        src: 'https://imgse.com/i/pERHG34',
        category: 'painting',
        title: '毕加索的睡女神'
    },
    {
        src: 'https://imgse.com/i/pERH14U',
        category: 'painting',
        title: '近身描绘'
    },
    {
        src: 'https://imgse.com/i/pERHJgJ',
        category: 'painting',
        title: '印象派的睡女神'
    },
    {
        src: 'https://imgse.com/i/pERHNuR',
        category: 'painting',
        title: '写实派的睡女神'
    },
    {
        src: 'https://imgse.com/i/pERH8CF',
        category: 'painting',
        title: '水彩系的睡女神'
    },
    {
        src: 'https://imgse.com/i/pERHYv9',
        category: 'painting',
        title: '皮克斯的羽球女神'
    },
    {
        src: 'https://imgse.com/i/pERHUD1',
        category: 'painting',
        title: '卧室里的小荧'
    },
    {
        src: 'https://imgse.com/i/pERHaHx',
        category: 'painting',
        title: '花园里的小荧'
    },
    {
        src: 'https://imgse.com/i/pERHwE6',
        category: 'painting',
        title: '吃冰棍的小荧'
    },
    
    // Add more images as needed(photography or painting category)
];

// Gallery functionality
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;

function createGalleryItem(item) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.category = item.category;
    
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    img.loading = 'lazy';
    
    galleryItem.appendChild(img);
    galleryItem.addEventListener('click', () => openLightbox(galleryData.indexOf(item)));
    
    return galleryItem;
}

function renderGallery(filter = 'all') {
    galleryGrid.innerHTML = '';
    const filteredItems = filter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === filter);
    
    filteredItems.forEach(item => {
        galleryGrid.appendChild(createGalleryItem(item));
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImage.src = galleryData[index].src;
    lightboxImage.alt = galleryData[index].title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    lightboxImage.src = galleryData[currentImageIndex].src;
    lightboxImage.alt = galleryData[currentImageIndex].title;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    lightboxImage.src = galleryData[currentImageIndex].src;
    lightboxImage.alt = galleryData[currentImageIndex].title;
}

// Event listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderGallery(button.dataset.filter);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});

// Initialize gallery
renderGallery(); 