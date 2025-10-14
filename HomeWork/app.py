from flask import Flask, render_template, request

app = Flask(__name__, static_folder="static", template_folder="templates")

@app.route("/")
def index():
    """首頁：展示機器學習概述"""
    return render_template("index.html")

@app.route("/regression")
def regression():
    """線性回歸頁面"""
    return render_template("regression.html")

@app.route("/knn")
def knn():
    """K近鄰分類頁面"""
    return render_template("knn.html")

@app.route("/decision_tree", methods=['GET', 'POST'])
def decision_tree():
    """決策樹分類頁面"""
    # 準備傳遞給模板的資料
    tree_info = {
        'algorithm': "決策樹分類器",
        'applications': ["垃圾郵件分類", "客戶流失預測", "疾病診斷"],
        'pros': ["容易理解", "不需要特徵縮放", "可視化清晰"],
        'cons': ["容易過度擬合", "對數據微小變動敏感", "處理不平衡數據時可能產生偏見"],
        'is_supervised': True
    }
    
    # 處理表單提交
    if request.method == 'POST':
        features = request.form.get('features', 0)
        tree_info['features'] = features
        
    return render_template("decision_tree.html", **tree_info)

def main():
    """
    應用程式入口點
    開發環境：使用 debug=True，host="127.0.0.1"
    生產環境：使用 debug=False，host="0.0.0.0"
    """
    app.run(host="127.0.0.1", port=5000, debug=True)

if __name__ == "__main__":
    main()