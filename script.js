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
        src: 'https://s21.ax1x.com/2025/04/13/pERHG34.png',
        category: 'painting',
        title: '毕加索的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERH14U.jpg',
        category: 'painting',
        title: '近身描绘'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHJgJ.png',
        category: 'painting',
        title: '印象派的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHNuR.png',
        category: 'painting',
        title: '写实派的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERH8CF.png',
        category: 'painting',
        title: '水彩系的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHYv9.jpg',
        category: 'painting',
        title: '皮克斯的羽球女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHUD1.jpg',
        category: 'painting',
        title: '卧室里的小荧'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHaHx.jpg',
        category: 'painting',
        title: '花园里的小荧'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHwE6.jpg',
        category: 'painting',
        title: '吃冰棍的小荧'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbPM9.png',
        category: 'painting',
        title: '玩泡泡的小欣'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbFq1.jpg',
        category: 'painting',
        title: '走在花园里的小荧'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbirR.jpg',
        category: 'painting',
        title: '动漫睡眠小欣'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbEa6.png',
        category: 'painting',
        title: '氛围感夜灯小欣'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbAVx.jpg',
        category: 'painting',
        title: '花园里的小荧'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbVIK.jpg',
        category: 'painting',
        title: '一张封神小欣'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbePO.jpg',
        category: 'painting',
        title: '小欣抽卡界面'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbmGD.jpg',
        category: 'painting',
        title: '小欣角色立绘'
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

// Lazy loading functionality
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
                const image = new Image();
                image.onload = () => {
                    img.src = src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                };
                image.src = src;
            }
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

function createGalleryItem(item) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.category = item.category;
    
    const img = document.createElement('img');
    img.dataset.src = item.src; // 使用data-src存储实际图片地址
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'; // 使用一个1x1的透明SVG作为占位图
    img.alt = item.title;
    img.className = 'lazy-load';
    
    galleryItem.appendChild(img);
    galleryItem.addEventListener('click', () => openLightbox(galleryData.indexOf(item)));
    
    // 开始观察图片元素
    lazyLoadObserver.observe(img);
    
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
    const img = new Image();
    img.onload = () => {
        lightboxImage.src = galleryData[index].src;
        lightboxImage.alt = galleryData[index].title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    img.src = galleryData[index].src;
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