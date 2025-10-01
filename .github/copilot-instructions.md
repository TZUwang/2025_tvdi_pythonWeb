
# AI Copilot 指南 - TVDI Python Web 課程專案

## 專案架構與設計重點
- **課程導向結構**：每個 lesson 目錄（如 `lesson1/`, `lesson2/`, `lesson3/`）對應一個教學單元，內容循序漸進，從基礎語法到進階應用。
- **主程式與模組分離**：主程式通常以 `if __name__ == "__main__":` 開頭，計算/邏輯功能獨立為函數或模組（如 `tools.py`）。
- **Flask 應用**：`main.py` 展示最小 Flask 網站，路由與回應皆有中文註解，適合教學。
- **資料夾命名規則**：`lesson{n}_{m}.py`、`.ipynb`，對應課程進度與主題。
- **中英文混合註解**：變數/函數名稱為英文，註解為繁體中文，強調教學易懂。
- **多媒體資源**：`link/README.md` 記錄課程錄影與資源連結。

## 依賴與開發環境
- **Python 3.10**（由 `.python-version` 或 `pyproject.toml` 指定）
- **依賴管理**：僅用 `uv`，安裝指令為 `uv install`，依賴於 `pyproject.toml`/`uv.lock`，勿用 pip/poetry。
- **主要套件**：Flask、requests
- **虛擬環境**：`.venv/` 已忽略於版控

## 典型開發流程
```bash
# 安裝依賴
uv install
# 執行單一課程腳本
python lesson2/lesson2_1.py
# 啟動 Jupyter notebook（互動教學）
jupyter notebook lesson1/
# 啟動 Flask 網站（教學範例）
python main.py
```

## 重要設計與教學模式
- **函數教學**：`lesson2/AGENTS.md`、`lesson2/README.md` 詳細說明函數定義、參數、回傳值、常見錯誤，並有多個教學範例。
- **類別與物件導向**：`lesson2/類別與實體.md` 以多個範例（如計算機、銀行帳戶、學生管理、繼承）循序介紹 OOP 概念。
- **工具模組**：如 `lesson3/tools.py`，封裝 API 資料取得與處理邏輯，主程式（如 `lesson3_3.py`）僅負責互動與流程控制。
- **主程式慣例**：所有可執行腳本皆以 `if __name__ == "__main__":` 為入口，利於單元測試與模組重用。
- **中文註解**：所有關鍵邏輯、流程、錯誤處理均有繁體中文註解，便於初學者理解。

## VS Code 與偵錯
- 偵錯器名稱：「Python 偵錯工具: 目前檔案」
- 執行時使用整合終端機，介面建議設為繁體中文

## 其他注意事項
- 僅用 uv 管理依賴，勿混用 pip/poetry
- 程式碼應簡潔、註解清楚，符合教學導向
- 新增教學內容時，請依 lesson 結構命名與分層

---
如需更深入設計規範，請參考 `lesson2/AGENTS.md`、`lesson2/類別與實體.md`、`lesson3/tools.py` 範例。