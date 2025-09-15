from flask import Flask # 從 flask 這個套件中，匯入 Flask 這個類別

app = Flask(__name__) # 建立一個 Flask 應用程式的實例(instance)

#app裡面的route(app.route) > 實體中的方法()-decorator的實體方法route("/") 前面要加一個@
@app.route("/") #有人透過跟目錄來到我的網站時執行
def index():
    return '<h1 style="color:red">您好~ Flask!</h1>'

'''
當你直接執行此 Python 檔案時 (例如在終端機輸入 python main.py)，Python 直譯器會自動將 __name__ 這個變數的值設為 __main__ (一個字串)。但是，如果這個檔案是被其他 Python 檔案匯入 (import) 的，那麼 __name__ 的值會是這個檔案的名稱 (在這個例子中是 main)
'''

@app.route("/name") #製作第二個路由點
def name():
    return'<h1 style="color:blue">Hello QQQ!</h1>'

if __name__ == "__main__": 
#if __name__ == "__main__":程式碼建立了一個判斷式，用來檢查這個程式是不是被當作主程式直接執行 只有在直接執行此檔案時，if 區塊內的程式碼（也就是 app.run(debug=True)）才會被觸發
    app.run(debug=True) #啟動網站伺服器 debug預設是False 要啟用要改True

'''
1. **類別 (Class) - 就像一個設計藍圖或工廠**
   - 在這裡，`Flask` (大寫F) 就是一個類別。
   - 它定義了一個 Flask 網站應用程式應該具備的所有屬性（資料）和方法（功能）。

2. **實體 (Instance) - 根據藍圖製造出來的實際產品**
   - `app = Flask(__name__)` 這行程式碼就是「實體化」(Instantiation)。
   - 我們使用 `Flask` 這個藍圖，建立了一個名為 `app` 的實際應用程式物件。
   - `app` 就是 `Flask` 類別的一個「實體」。

3. **實體方法 (Instance Method) - 產品的按鈕或功能**
   - 建立 `app` 這個實體後，我們就可以呼叫它所擁有的方法來執行特定任務。
   - 例如：
     - `@app.route('/')`: 這是 `app` 的 `route()` 方法，用來設定網址路徑與處理函式的對應關係。
     - `app.run()`: 這是 `app` 的 `run()` 方法，用來啟動網站伺服器，讓應用程式開始運作。
'''
