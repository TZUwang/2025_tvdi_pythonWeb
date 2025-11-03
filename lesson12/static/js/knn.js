let currentK = 5;
// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function () {
    // 固定使用花瓣長度(2)和花瓣寬度(3)
    loadKnnData()
})

async function loadKnnData() { 
    showLoading(true);
    try { //善用try catch除錯
        const url = `/knn/api/data?k=${currentK}&feature_x=2&feature_y=3`
        const response = await fetch(url)  //等待fetch回傳Promise實體
        const data = await response.json() //等待response.json()回傳
        console.table(data)
    } catch (error) {
        console.log(error.message)
    }

}

function showLoading(show) { 
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.add('active')
    } else {
        loading.classList.remove('active')
    }
}