// 漢堡選單 RWD 切換
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('navbar-toggle');
    const links = document.getElementById('navbar-links');
    if (toggleBtn && links) {
        toggleBtn.addEventListener('click', function () {
            links.classList.toggle('active');
        });
    }
});