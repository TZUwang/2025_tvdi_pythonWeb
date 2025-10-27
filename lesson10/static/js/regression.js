let chart = null; //圖表實體 let 宣告全域變數 可以重新賦予值
let modelData = null; //儲存模型資料

//頁面載入完成後才執行
document.addEventListener('DOMContentLoaded', function () {
    loadRegressionData();
});

/*
定義一個名為 loadRegressionData 的函式，
這個函式的作用是從後端 API 取得迴歸分析的資料。
 */
async function loadRegressionData() { //使用await來等待 必須使用async function非同步函式
    showLoading(true);
    try { //若嘗試成功 則執行下面的程式碼
        const response = await fetch('/api/regression/data') //await 等待fetch回傳
        if (!response.ok) { //判斷回傳是否成功 若不成功則拋出錯誤
            throw new Error(`網路出現問題:${response.statusText}`)
        }
        const data = await response.json() //await 等待response.json()回傳

        if (!data.success) { //判斷API邏輯是否成功 若不成功則拋出錯誤
            throw new Error(`解析JSON失敗`);
        }
        modelData = data //將回傳的資料儲存到全域變數modelData中

        // 執行繪圖的函式
        renderChart(data)

    } catch (error) { //若嘗試失敗 則執行下面的程式碼
        showError(error.message)
    } finally { //不論成功或失敗都會執行
        showLoading(false);
    }

};

function renderChart(data) {
    const ctx = document.getElementById('regressionChart').getContext('2d') //抓取畫布與2D工具

    //如果圖表已經存在則刪除
    if (chart) {
        chart.destroy();
    }

    //準備訓練資料集
    //檢查是否為陣列console.log(Array.isArray(data.data.train.x))
    //檢查是否為陣列console.log(data.data.train.y instanceof Array)
    const trainData = data.data.train.x.map((xvalue, index) => //要省略return 外面就不需要加大括號
    ({
        x: xvalue,
        y: data.data.train.y[index]
    })
    );

    //準備測試資料集
    const testData = data.data.test.x.map((xvalue, index) =>
    ({
        x: xvalue,
        y: data.data.test.y[index]
    })
    );

    //準備迴歸線資料集
    const regressionLine = data.data.regression_line.x.map((xvalue, index) =>
    ({
        x: xvalue,
        y: data.data.regression_line.y[index]
    })
    );

    //建立圖表
    chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '訓練資料',
                    data: trainData,
                    backgroundColor: 'rgba(102, 126, 234, 0.6)', //點的顏色
                    borderColor: 'rgba(102, 126, 234, 1)', //點的邊框顏色
                    pointRadius: 6, //點的大小
                    pointHoverRadius: 8 //滑鼠滑過時點的大小
                },
                {
                    label: '測試資料集',
                    data: testData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: '迴歸線',
                    data: regressionLine,
                    type: 'line',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 3,
                    fill: false,
                    pointRadius: 0,
                    tension: 0
                }
            ]
        },
        options: { //圖表外觀樣式
            responsive: true,
            maintainAspectRatio: false,
            onClick: function (evt, activeElements) { //點擊標題時觸發的事件
                if (activeElements.length > 0) { //判斷是否有點擊到圖表上的點
                    const element = activeElements[0];
                    const datasetIndex = element.datasetIndex;
                    const index = element.index;
                    const dataset = chart.data.datasets[datasetIndex];

                    if (datasetIndex === 0 || datasetIndex === 1) { //訓練資料與測試資料
                        const point = dataset.data[index] //取得點的資料
                        const rooms = point.x //取得房間數
                        
                        //更新輸入框
                        document.getElementById('rooms-input').value = rooms.toFixed(1) 
                        predictPrice(rooms) //預測房價
                    }
                }
            },
            plugins: { //plugins放在options裡面
                title: {
                    display: true,
                    text: '平均房間數 vs 房價',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: {
                        top: 5,
                        bottom: 30
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) { //tooltip.callbacks.label中，Chart.js 會傳入一個 context 物件(物件包含了當前情境的所有資訊，包括滑鼠懸停的資料點)
                            const datasetLabel = context.dataset.label || ''; // 如果 dataset.label 不存在則為空字串
                            const xValue = context.parsed.x.toFixed(2); // 取得滑鼠懸停資料點的x軸數值 toFixed(2)表示保留小數點後兩位
                            const yValue = context.parsed.y.toFixed(2); 
                            return `${datasetLabel}: (平均房間數:${xValue}, 房價:${yValue})`;
                        },
                        afterLabel: function (context) { //afterLabel是在 label 之後顯示的內容
                            if (context.datasetIndex === 0 || context.datasetIndex === 1) { // 如果 datasetIndex 為 0 或 1 (只要訓練資料0和測試資料1 不需要回歸線資料是2)
                                return '點擊可預測此資料點';
                            }  
                            return ''; // 如果 datasetIndex 不為 0 或 1 則返回空字串(代表訓練資料與測試資料會顯示點擊可預測此資料點 而回歸線不會顯示)
                        }
                    }
                }
                
            },
            animation: {
                duration: 1000, //動畫持續時間
                easing: 'easeInOutQuad' //動畫效果
            },
            scales: { //scales放在options裡面
                x: {
                    title: {
                        display: true,
                        text: `${data.description.feature_name} (${data.description.feature_unit})`,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: `${data.description.target_name} (${data.description.target_unit})`,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    })
}


async function predictPrice(rooms) {
    if (isNaN(rooms) || rooms < 1 || rooms > 15) {
        alert('請輸入有效的房間數(1~15間)');
        return;
    }

    const response = await fetch(`/api/regression/predict?rooms=${rooms}`) //await 等待fetch回傳
    
}



// 定義一個名為 showLoading 的函式，它接受一個參數 show
function showLoading(show) {
    const loading = document.getElementById('loading'); // 透過 getElementById 尋找 HTML 中 id 為 'loading' 的元素
    if (show) {
        loading.classList.add('active'); // 如果 show 是 true，就在 'loading' 元素的 class 列表中新增 'active'
    } else {
        loading.classList.remove('active'); // 如果 show 是 false，就從 'loading' 元素的 class 列表中移除 'active'
    }
};

function showError(message) {
    alert('錯誤訊息:' + message);
    console.log(message)
}