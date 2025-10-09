document.addEventListener('DOMContentLoaded', function() {
    initializeUI();
    initializeAnimations();
    initializeFormValidation();
    initializeInteractions();
});

function initializeUI() {
    // 初始化應用場景列表
    const applicationsBtn = document.querySelector('[data-toggle="applications"]');
    const applicationsList = document.querySelector('.applications-list');
    
    if (applicationsBtn && applicationsList) {
        applicationsList.style.maxHeight = '0';
        applicationsList.style.overflow = 'hidden';
        applicationsList.style.transition = 'max-height 0.3s ease-out';

        applicationsBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded) {
                applicationsList.style.maxHeight = applicationsList.scrollHeight + 'px';
                this.setAttribute('aria-expanded', 'true');
                this.innerHTML = '收起應用場景 <i class="fas fa-chevron-up"></i>';
            } else {
                applicationsList.style.maxHeight = '0';
                this.setAttribute('aria-expanded', 'false');
                this.innerHTML = '顯示應用場景 <i class="fas fa-chevron-right"></i>';
            }
        });
    }

    // 初始化工具提示
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
            
            setTimeout(() => tooltip.classList.add('show'), 10);
        });

        element.addEventListener('mouseleave', function() {
            const tooltips = document.querySelectorAll('.custom-tooltip');
            tooltips.forEach(tooltip => {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 200);
            });
        });
    });
}

function initializeAnimations() {
    // 特徵項目的進入動畫
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    featureItems.forEach(item => observer.observe(item));

    // 監督式學習徽章動畫
    const badge = document.querySelector('.supervised-badge');
    if (badge) {
        badge.classList.add('animate-fade-in');
    }
}

function initializeFormValidation() {
    const form = document.querySelector('.features-form');
    const featuresInput = document.getElementById('features');
    
    if (form && featuresInput) {
        featuresInput.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value < 1) {
                this.setCustomValidity('特徵數量必須大於等於1');
                this.classList.add('is-invalid');
            } else {
                this.setCustomValidity('');
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });

        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    }
}

function initializeInteractions() {
    // 提交按鈕互動效果
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        // 點擊效果
        submitBtn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        submitBtn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    }

    // 卡片互動效果
    const cards = document.querySelectorAll('.tree-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// 添加樣式
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .custom-tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transition: all 0.2s ease;
        pointer-events: none;
    }

    .custom-tooltip.show {
        opacity: 1;
        transform: translateY(-5px);
    }

    @keyframes cardHover {
        0% { transform: translateY(0); }
        100% { transform: translateY(-5px); }
    }

    .btn-submit:active {
        transform: translateY(1px) !important;
    }

    .feature-item i {
        transition: transform 0.2s ease;
    }

    .feature-item:hover i {
        transform: scale(1.2);
    }
`;
document.head.appendChild(styleSheet);
document.head.appendChild(styleSheet);