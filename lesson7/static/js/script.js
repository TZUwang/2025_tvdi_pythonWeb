document.addEventListener('DOMContentLoaded', function() { // 包住所有的程式碼，它的作用就是等待 HTML 文件本身完全載入和解析後，才會執行內部的 JavaScript
    const toggleButton = document.querySelector('.toggle-button'); // 尋找第一個 class 為 'toggle-button' 的元素，並將其存入常數 toggleButton
    const answerContent = document.querySelector('.answer-content'); // 第一個 class 為 'answer-content' 的元素，並將其存入常數 answerContent
    if (toggleButton && answerContent) { //檢查 toggleButton 和 answerContent 是否都成功被選取到
        toggleButton.addEventListener('click', function() { // 為 toggleButton 這個按鈕元素添加一個click事件的監聽器
            answerContent.classList.toggle('visible');// 當按鈕被點擊時，在 answerContent 這個元素的 class 列表上新增/移除 'visible' 這個 class
        });
    }
});