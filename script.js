// Theme handling
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const header = document.querySelector('header');

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
        src: 'https://s21.ax1x.com/2025/04/20/pE4BaQO.jpg',
        category: 'sleep',
        title: '小欣觉觉6'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/20/pE4BdyD.jpg',
        category: 'sleep',
        title: '小欣觉觉5'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/19/pE4QTij.jpg',
        category: 'sleep',
        title: '小欣觉觉4'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/19/pE4QHWn.jpg',
        category: 'sleep',
        title: '小欣觉觉3'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/19/pE4Q7Js.jpg',
        category: 'sleep',
        title: '小欣觉觉2'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/19/pE4QIoQ.jpg',
        category: 'sleep',
        title: '小欣觉觉1'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/17/pEhRVED.jpg',
        category: 'sleep',
        title: '直线小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/17/pEh2Q7F.jpg',
        category: 'sleep',
        title: 'gpt-4o的最抽象小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/17/pEhMgOS.jpg',
        category: 'sleep',
        title: 'Wassily Kandinsky的抽象小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/17/pEhMPaj.jpg',
        category: 'sleep',
        title: '抽象小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/17/pEhMCZQ.jpg',
        category: 'sleep',
        title: '康定斯基式的小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/16/pEfflVO.jpg',
        category: 'sleep',
        title: '樱桃小丸子小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/16/pEfsGw9.jpg',
        category: 'sleep',
        title: '皮克斯小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/16/pEfs1L4.jpg',
        category: 'sleep',
        title: '低多边形3D小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/16/pEfsJoR.jpg',
        category: 'sleep',
        title: '蜡笔小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWhEDK.jpg',
        category: 'sleep',
        title: '新艺术派小欣觉觉'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHG34.png',
        category: 'sleep',
        title: '毕加索的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHJgJ.png',
        category: 'sleep',
        title: '印象派的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERHNuR.png',
        category: 'sleep',
        title: '写实派的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERH8CF.png',
        category: 'sleep',
        title: '水彩系的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWw6sA.jpg',
        category: 'sleep',
        title: '野兽派的睡女神'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERbirR.jpg',
        category: 'sleep',
        title: '动漫睡眠小欣'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWwyMd.jpg',
        category: 'painting',
        title: '概念小黄鸭'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/13/pERH14U.jpg',
        category: 'painting',
        title: '近身描绘'
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
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWNW3d.jpg',
        category: 'painting',
        title: '小女单角色立绘'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWNg4e.jpg',
        category: 'painting',
        title: '奔跑的小欣'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWN5ut.jpg',
        category: 'painting',
        title: '海边小溪静坐'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWNR9H.jpg',
        category: 'painting',
        title: '春日小狄'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWNcND.jpg',
        category: 'painting',
        title: '小欣毛毛球起跳'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWNfgA.jpg',
        category: 'painting',
        title: '小欣的泡泡畅想1'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWNhjI.jpg',
        category: 'painting',
        title: '小欣的泡泡畅想2'
    },
    {
        src: 'https://s21.ax1x.com/2025/04/14/pEWNIDP.png',
        category: 'painting',
        title: '小欣的泡泡畅想3'
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
    img.dataset.src = item.src;
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    img.alt = item.title;
    img.className = 'lazy-load';
    
    // 检查图片宽高比
    const image = new Image();
    image.onload = function() {
        const aspectRatio = this.width / this.height;
        if (aspectRatio > 1.2) { // 如果宽高比大于1.2，则认为是宽图
            galleryItem.classList.add('wide');
        }
    };
    image.src = item.src;
    
    galleryItem.appendChild(img);
    galleryItem.addEventListener('click', () => openLightbox(galleryData.indexOf(item)));
    
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

// 监听页面滚动，给header加阴影和模糊
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}); 