from flask import Flask, render_template

app = Flask(__name__, static_folder="static", template_folder="templates")

@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/") #下面要立即定義一個function
def index():
    """根節點，呈現 index.html"""
    return render_template("index.html")

@app.route("/regression")
def regression():
    return render_template("regression.html")

@app.route("/knn")
def knn():
    return render_template("knn.html")

@app.route("/lesson6_1")
def lesson6_1():
    page_title = "這是一個首頁"
    user = [
        {"name": "阿瘸", "age": 25, "gender": "male"},
        {"name": "V老大", "age": 30, "gender": "female"},
        {"name": "阿薛", "age": 35, "gender": "male"},
        {"name": "腰子", "age": 28, "gender": "female"},
    ]
    return render_template("lesson6_1.html", title=page_title, user_list=user)



def main():
    # 在開發環境下使用 debug=True，部署時請關閉 (開放給所有人正式的瀏覽器host="0.0.0.0" 開發者模式自己用host="127.0.0.1")
    app.run(host="127.0.0.1", port=5000, debug=True)

if __name__ == "__main__":
    main()