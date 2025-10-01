from flask import Flask, render_template

app = Flask(__name__, static_folder="static", template_folder="templates")

"""
@app.route("/")
這個裝飾器定義了 Flask 應用程序的根 URL ("/")。
當使用根 URL 访问應用程序時，應該調用 `index` 函數。

Returns:
    str: HTML 字符串 "<h1>Hello, World!</h1>"
"""
@app.route("/")
def index():
    """根節點，呈現 index.html"""
    return render_template("index.html")

def main():
    """啟動應用程式（教學用：啟用 debug 模式）"""
    # 在開發環境下使用 debug=True，部署時請關閉 (開放給所有人正式的瀏覽器host="0.0.0.0" 開發者模式自己用host="127.0.0.1")
    app.run(host="127.0.0.1", port=5000, debug=True)

if __name__ == "__main__":
    app.run()