## 這是一個flask的專案
## 專案使用uv 虛擬環境,如果要執行'python app.py', 請改為使用'uv run .\HomeWork\python app.py'
## Flask 網頁樣板使用預設的templates資料夾, CSS, js, image使用預設的static資料夾
## 若有修改網頁內的css, 請增加至網頁對應的css檔案內
0,0 @@
# HomeWork: Flask 專案實作 - 待辦事項清單 (Todo List)

本單元將引導你從零開始建立一個完整的 Flask Web 應用程式：一個簡單的待辦事項清單 (Todo List) 網站。

## 專案目標

建立一個具備以下功能的 Web 應用：
1.  顯示目前的待辦事項清單。
2.  允許使用者新增待辦事項。
3.  允許使用者將待辦事項標記為「完成」。
4.  允許使用者刪除待辦事項。

## 專案架構

一個典型的 Flask 專案會包含以下結構：

```
lesson6/
├── main.py         # Flask 主程式
├── templates/
│   └── index.html  # HTML 頁面樣板
└── static/
    └── style.css   # CSS 樣式表 (可選)
```

-   **`main.py`**: 這是我們應用的核心。它包含了所有的 Python 程式碼，用來定義網站的路由 (URL)、處理使用者請求、以及與資料互動。
-   **`templates/`**: 這個資料夾專門用來存放 HTML 檔案。Flask 會自動在這個資料夾中尋找樣板檔案。
-   **`static/`**: 這個資料夾用來存放靜態檔案，例如 CSS、JavaScript、圖片等。在 HTML 中可以透過 `/static/` 路徑來引用這些檔案。

## 關鍵檔案說明

### 1. `main.py` - Flask 應用程式

這是我們網站的後端邏輯。

```python
from flask import Flask, render_template, request, redirect, url_for

# 建立 Flask 應用程式實體
app = Flask(__name__)

# 使用一個簡單的 Python 列表來模擬資料庫
todos = [
    {"task": "學習 Flask", "done": True},
    {"task": "建立一個 Todo List 應用", "done": False}
]

# 定義首頁路由 (Route)
@app.route('/')
def index():
    # 渲染 index.html 樣板，並傳入 todos 列表
    return render_template('index.html', todos=todos)

# 定義新增待辦事項的路由
@app.route('/add', methods=['POST'])
def add():
    # 從表單中獲取新任務
    new_todo = request.form.get('todo')
    if new_todo:
        todos.append({"task": new_todo, "done": False})
    # 重定向回首頁
    return redirect(url_for('index'))

# 主程式進入點
if __name__ == '__main__':
    # 啟動開發伺服器，並開啟偵錯模式
    app.run(debug=True)
```

-   **`Flask(__name__)`**: 建立一個 Flask 應用。
-   **`@app.route('/')`**: 裝飾器 (Decorator)，用來告訴 Flask 當使用者瀏覽網站根目錄 (`/`) 時，應該執行 `index()` 函數。
-   **`render_template('index.html', ...)`**: 渲染 `templates/` 資料夾中的 `index.html` 檔案，並將 Python 變數（例如 `todos`）傳遞給 HTML，以便在頁面上顯示。
-   **`request.form.get('todo')`**: 從 POST 請求的表單資料中，獲取名為 `todo` 的欄位值。
-   **`redirect(url_for('index'))`**: 將使用者重定向到 `index` 函數對應的 URL（也就是 `/`）。

### 2. `templates/index.html` - HTML 樣板

這是我們網站的前端介面，使用 Jinja2 樣板引擎語法來顯示動態資料。

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>Todo List</title>
</head>
<body>
    <h1>我的待辦事項</h1>

    <!-- 顯示待辦事項列表 -->
    <ul>
        {% for todo in todos %}
            <li>{{ todo.task }} - {% if todo.done %}已完成{% else %}未完成{% endif %}</li>
        {% endfor %}
    </ul>

    <!-- 新增待辦事項的表單 -->
    <form action="{{ url_for('add') }}" method="post">
        <input type="text" name="todo" placeholder="新增待辦事項">
        <button type="submit">新增</button>
    </form>
</body>
</html>
```

-   **`{% for todo in todos %}` ... `{% endfor %}`**: Jinja2 的迴圈語法，用來遍歷從 `main.py` 傳過來的 `todos` 列表。
-   **`{{ todo.task }}`**: Jinja2 的變數語法，用來在 HTML 中顯示 Python 變數的值。
-   **`<form action="{{ url_for('add') }}" method="post">`**: 建立一個表單，當提交時，會向 `/add` URL 發送一個 POST 請求。

## 如何執行專案

1.  **確認依賴**：確保你已經安裝 Flask。如果沒有，請在終端機執行：
    ```bash
    uv install flask
    ```

2.  **啟動伺服器**：在 `HomeWork` 資料夾下，執行主程式：
    ```bash
    python main.py
    ```

3.  **瀏覽網站**：打開你的瀏覽器，並訪問 `http://127.0.0.1:5000`，你將會看到你的待辦事項清單網站。