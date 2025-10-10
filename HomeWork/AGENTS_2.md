作業內容要求
✅ 必做項目

**任務 1：新增路由**

在 app.py 中新增 /decision_tree 路由
路由對應的函式名稱為 decision_tree()
渲染模板 decision_tree.html

**任務 2：建立模板檔案**

在 templates/ 目錄下建立 decision_tree.html
繼承 base.html 模板
使用 {% block content %} 區塊

**任務 3：更新導覽列**

修改 base.html 的導覽列
新增「決策樹分類」導覽項目
連結到 /decision_tree 路由
實作 active 狀態顯示（當前頁面高亮）

**任務 4：頁面內容設計**

頁面標題：<h1>決策樹分類</h1>
新增一個說明段落，介紹決策樹的基本概念（至少 50 字）
使用現有的 CSS 樣式美化頁面

**任務 5：傳遞資料到模板**

在 decision_tree() 函式中建立一個字典變數 tree_info
包含以下欄位：
algorithm: "決策樹分類器"
applications: ["垃圾郵件分類", "客戶流失預測", "疾病診斷"]
pros: ["容易理解", "不需要特徵縮放", "可視化清晰"]
將資料傳遞到模板並顯示

**任務 6：使用 Jinja2 語法**

使用 {{ }} 顯示 algorithm
使用 {% for %} 迴圈顯示 applications 列表
使用 {% for %} 迴圈顯示 pros 列表
🌟 進階挑戰（選做）

**挑戰 1：新增 CSS 樣式檔**

建立 static/css/decision_tree.css
為決策樹頁面設計獨特的樣式
在模板中正確引入 CSS 檔案

**挑戰 2：新增 JavaScript 互動**

建立 static/js/decision_tree.js
實作一個按鈕，點擊後顯示/隱藏應用場景列表
在模板中正確引入 JS 檔案

**挑戰 3：使用 Jinja2 條件判斷**

在 decision_tree() 函式中傳遞一個布林值 is_supervised
在模板中使用 {% if %} 判斷
根據布林值顯示不同的訊息

**挑戰 4：建立表單**

新增一個簡單的表單，讓使用者輸入資料特徵數量
使用 Flask 的 request 處理表單提交
顯示提交的結果