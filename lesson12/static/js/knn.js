
let currentK = 5;
let modleData = null; //儲存模型資料(原本是區域變數，要改成全域變數讓其他函式使用 let宣告全域變數可以重新賦予值)
let targetNames = null;
let featureNames = null;
let chart = null;

document.addEventListener('DOMContentLoaded', function () { // 頁面載入完成後執行
    // 固定使用花瓣長度(2)和花瓣寬度(3)
    loadKnnData()
})

async function loadKnnData() { 
    showLoading(true);
    try { //善用try catch除錯
        const url = `/knn/api/data?k=${currentK}&feature_x=2&feature_y=3`
        const response = await fetch(url)  //等待fetch回傳Promise實體
        const data = await response.json() //等待response.json()回傳
        if(data.success) {
            modleData = data; //將回傳的資料儲存到全域變數modleData中
            targetNames = data.target_names;
            featureNames = data.feature_names; 
            
            //繪製圖表
            renderChart(data);
        }else{
            showError(data.error) //請求錯誤(已經成功連接到後端，但後端邏輯失敗)
        }
    } catch (error) {
        showError(error.message) //顯示錯誤訊息(無法連接到後端)
    } finally { //不論成功或失敗都會執行
        showLoading(false) //關閉loading
    }

}

//繪製圖表的函式
function renderChart(data) {
    console.table(modleData);
    console.table(chart);
}

// 顯示/隱藏 loading 的函式
function showLoading(show) { 
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.add('active')
    } else {
        loading.classList.remove('active')
    }
}

// 顯示錯誤訊息的函式
function showError(message) {
    alert('錯誤訊息:' + message)
    console.error(message)
}