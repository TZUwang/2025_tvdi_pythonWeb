// 漢堡選單 RWD 切換
document.addEventListener('DOMContentLoaded', function () {
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

            // 點擊選單項目後自動關閉選單
            Array.from(navLinks).forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        toggleBtn.classList.remove('active');
                        links.classList.remove('active');
                    }
                });
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
});