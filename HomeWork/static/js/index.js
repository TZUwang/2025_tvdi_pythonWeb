// 通用功能和初始化
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeFormValidation();
    initializeCardAnimations();
    initializeAlerts();
});

// 導覽列功能
function initializeNavigation() {
    const toggleBtn = document.getElementById('navbar-toggle');
    const links = document.getElementById('navbar-links');
    const navLinks = links ? links.getElementsByTagName('a') : [];
    const navbar = document.querySelector('.navbar');

    // 設置選單項目的動畫延遲
    Array.from(navLinks).forEach((link, index) => {
        link.style.setProperty('--item-index', index);
    });

    if (toggleBtn && links) {
        toggleBtn.addEventListener('click', function () {
            toggleBtn.classList.toggle('active');
            links.classList.toggle('active');
        });

        // 點擊選單項目後自動關閉選單
        Array.from(navLinks).forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleBtn.classList.remove('active');
                    links.classList.remove('active');
                }
            });
        });

        // 點擊選單外部時關閉選單
        document.addEventListener('click', function (event) {
            if (!toggleBtn.contains(event.target) &&
                !links.contains(event.target) &&
                window.innerWidth <= 768 &&
                links.classList.contains('active')) {
                toggleBtn.classList.remove('active');
                links.classList.remove('active');
            }
        });
    }
}

// 表單驗證
function initializeFormValidation() {
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

// 卡片動畫
function initializeCardAnimations() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 提示訊息自動消失
function initializeAlerts() {
    var alerts = document.querySelectorAll('.alert:not(.alert-info):not(.alert-warning)');
    alerts.forEach(function (alert) {
        setTimeout(function () {
            alert.style.opacity = '0';
            setTimeout(function () {
                alert.remove();
            }, 300);
        }, 3000);
    });
}

// 通用工具函數
function toggleCollapse(targetId, button) {
    const target = document.getElementById(targetId);
    if (target) {
        const isExpanded = target.classList.contains('show');
        target.classList.toggle('show');
        button.setAttribute('aria-expanded', !isExpanded);
    }
}