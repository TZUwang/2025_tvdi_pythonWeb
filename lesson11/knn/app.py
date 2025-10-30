from flask import Blueprint, render_template

knn_bp = Blueprint(
    "knn",
    __name__,
    url_prefix="/knn", 
    template_folder="../templates/knn", #當使用者訪問/knn時，將會讀取 templates/knn 目錄下的檔案
)

@knn_bp.route("/index")
def knn_index():
    return render_template("knn.html")