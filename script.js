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
let isLoading = false;
let currentPage = 1;
const imagesPerPage = 12;

// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

// Scroll Observer for infinite loading
const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading) {
        loadMoreImages();
    }
}, {
    root: null,
    rootMargin: '100px',
    threshold: 0
});

function createGalleryItem(item) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.category = item.category;
    
    const img = document.createElement('img');
    img.dataset.src = item.src;
    img.alt = item.title;
    
    // 预加载图片以获取实际尺寸
    const tempImg = new Image();
    tempImg.src = item.src;
    tempImg.onload = function() {
        const aspectRatio = this.width / this.height;
        const baseHeight = 200; // 基础高度
        const rowHeight = 1.5; // 每行的高度比例
        
        // 根据图片高度计算需要跨越的行数
        const rows = Math.ceil((this.height / baseHeight) * rowHeight);
        galleryItem.style.gridRow = `span ${rows}`;
    };
    
    galleryItem.appendChild(img);
    galleryItem.addEventListener('click', () => openLightbox(galleryData.indexOf(item)));
    imageObserver.observe(img);
    
    return galleryItem;
}

function loadMoreImages() {
    if (isLoading) return;
    isLoading = true;
    
    const start = (currentPage - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    const currentImages = galleryData.slice(start, end);
    
    if (currentImages.length === 0) {
        isLoading = false;
        return;
    }
    
    currentImages.forEach(item => {
        galleryGrid.appendChild(createGalleryItem(item));
    });
    
    currentPage++;
    isLoading = false;
}

function renderGallery(filter = 'all') {
    galleryGrid.innerHTML = '';
    currentPage = 1;
    
    const filteredItems = filter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === filter);
    
    const initialImages = filteredItems.slice(0, imagesPerPage);
    initialImages.forEach(item => {
        galleryGrid.appendChild(createGalleryItem(item));
    });
    
    // 设置无限滚动观察器
    const sentinel = document.createElement('div');
    sentinel.className = 'scroll-sentinel';
    galleryGrid.appendChild(sentinel);
    scrollObserver.observe(sentinel);
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