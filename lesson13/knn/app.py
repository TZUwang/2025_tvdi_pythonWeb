from flask import Blueprint,render_template,jsonify,request
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split #切割訓練集與測試集
from sklearn.neighbors import KNeighborsClassifier #K近鄰 分類演算法
from sklearn.metrics import accuracy_score, confusion_matrix #計算準確率 以及 混淆矩陣 

knn_bp = Blueprint(
    'knn', #Blueprint 的名稱
    __name__, #藍圖所在的模組
    url_prefix='/knn', #這個Blueprint的所有網址前綴
    template_folder='../templates', #模板所在的資料夾
    static_folder='../static' #靜態檔案的資料夾
)

@knn_bp.route('/knn_index')
def knn_index():
    return render_template('knn.html')

@knn_bp.route('/api/data')
def knn_data():
    """knn 分類 API - 使用鳶尾花資料集"""
    iris = load_iris()

    try:
        # 載入鳶尾花資料集
        X = iris.data   # X 是包含 150 個樣本、4 個特徵的資料
        y = iris.target # y 是包含 150 個樣本對應的品種標籤
        # 特徵名稱翻譯
        feature_names_zh = ["花萼長度", "花萼寬度", "花瓣長度", "花瓣寬度"]
        target_names_zh = ["山鳶尾", "變色鳶尾", "維吉尼亞鳶尾"]

        #取得特徵索引 (預設使用花瓣長度和花瓣寬度)
        feature_x = int(request.args.get('feature_x', 2)) 
        feature_y = int(request.args.get('feature_y', 3))
        #取得K值 (預設使用5)
        k_neighbors = int(request.args.get('k', 5))

        #驗證參數是否正確
        if feature_x < 0 or feature_x >= X.shape[1]:
            feature_x = 2
        if feature_y < 0 or feature_y >= X.shape[1]:
            feature_y = 3
        if k_neighbors < 1 or k_neighbors > 20:
            k_neighbors = 5

        #取出兩個特徵進行分類
        X_2d =(X[:, [feature_x, feature_y]])

        #切割訓練集與測試集
        X_train, X_test, y_train, y_test = train_test_split(X_2d, y, test_size=0.3, random_state=42) #傳出訓練集與測試集

        #訓練模型
        knn = KNeighborsClassifier(n_neighbors=k_neighbors) #建立模型
        knn.fit(X_train, y_train) #訓練模型

        #預測
        y_pred = knn.predict(X_test) #預測測試集的類別

        #計算評估指標
        accuracy = accuracy_score(y_test, y_pred) #計算準確率 (前面放的是測試集的資料,後面放的是預測的資料 看準確的程度)
        conf_matric = confusion_matrix(y_test, y_pred) #計算混淆矩陣

        #回傳json格式的資料
        response = {
            "success":True, #是否成功
            "feature_names": feature_names_zh, #特徵名稱
            "target_names": target_names_zh, #目標名稱
            "current_features":{
                "x": feature_names_zh[feature_x], # 這裡的 'x' 是指 X 軸的「名稱」 '花瓣長度'
                "y": feature_names_zh[feature_y], # 這裡的 'y' 是指 Y 軸的「名稱」 '花瓣寬度'
                #0是花萼長度 1是花萼寬度 2是花瓣長度 3是花瓣寬度
                "x_idx": feature_x, # 2
                "y_idx": feature_y  # 3
            },
            "k_neighbors": k_neighbors,
            "data":{ 
                "train":{ #訓練集
                    "x": X_train[:, 0].tolist(), #取出訓練集的第一個特徵 也就是花瓣長度
                    "y": X_train[:, 1].tolist(), #取出訓練集的第二個特徵 也就是花瓣寬度
                    "labels": y_train.tolist()   #取出訓練集的目標
                },
                "test":{ #測試集
                    "x": X_test[:, 0].tolist(),
                    "y": X_test[:, 1].tolist(),
                    "labels": y_test.tolist(),
                    "predictions": y_pred.tolist() #預測結果
                }
            },
            "metrics":{ #評估指標
                "accuracy": round(accuracy,4), #準確率 取四位小數
                "confusion_matric": conf_matric.tolist() #混淆矩陣
            },
            "description":{ #描述
                "dataset": "鳶尾花資料集",
                "samples": len(y), #總樣本數
                "train_size": len(y_train), #訓練集樣本數
                "test_size": len(y_test),   #測試集樣本數
                "classes": len(target_names_zh) #類別數
            }
        }

        return jsonify(response)
    
    except Exception as error: #捕捉錯誤
        return jsonify({
            "success": False,
            "error": str(error)
        }), 500