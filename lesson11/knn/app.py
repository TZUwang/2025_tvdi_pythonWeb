from flask import Blueprint, render_template

knn_bp = Blueprint(
    "knn", # 藍圖的名稱
    __name__,
    url_prefix="/knn", # 藍圖的網址
    template_folder="../static", #當使用者訪問 /knn/knn_index
)

@knn_bp.route("/knn_index")
def knn_index():
    return render_template("knn.html")