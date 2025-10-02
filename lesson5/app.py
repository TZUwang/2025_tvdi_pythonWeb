from flask import Flask, render_template

app = Flask(__name__, static_folder="static", template_folder="templates")


@app.route("/") #下面要立即定義一個function
def index():
    """根節點，呈現 index.html"""
    return render_template("index.html")

@app.route("/machine")
def machine():
    return render_template("machine.html")



def main():
    # 在開發環境下使用 debug=True，部署時請關閉 (開放給所有人正式的瀏覽器host="0.0.0.0" 開發者模式自己用host="127.0.0.1")
    app.run(host="127.0.0.1", port=5000, debug=True)

if __name__ == "__main__":
    main()