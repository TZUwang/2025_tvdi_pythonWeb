import requests

def download_ubike_data()->list:
    url = 'https://data.ntpc.gov.tw/api/datasets/010e5b15-3823-4b20-b401-b1cf000550c5/json?page=0&size=1000'
 
    try:
        response = requests.get(url)
        response.raise_for_status() #檢查 HTTP 狀態碼 如果狀態碼是 2xx (成功)，則程式會繼續往下執行
        try:
            data = response.json() #將伺服器回傳的內容從 JSON 格式轉換成 Python 的字典或列表
        except requests.exceptions.JSONDecodeError as err_json:
            raise Exception(f"發生JSON解析錯誤: {err_json}")
    # --- 捕捉各種可能的例外 ---
    except requests.exceptions.HTTPError as err_http:
        raise Exception(f"發生 HTTP 錯誤: {err_http}") #raise Exception的功能是將錯誤傳給上層程式
    except requests.exceptions.ConnectionError as err_conn:
        raise Exception(f"連線錯誤: {err_conn}")
    except requests.exceptions.Timeout as err_timeout:
        raise Exception(f"連線逾時: {err_timeout}")
    except requests.exceptions.RequestException as err:
        raise Exception(f"發生請求錯誤: {err}")
    # --- 如果 try 區塊完全沒發生任何錯誤 ---
    else:
        return data
    
def get_area(data)->list:
    """
    取得所有bike站資料的地區

    Parameters:
        data (list): UBIKE 的所有bike站資料

    Returns:
        list: UBIKE 的所有地區
    """
    areas = set() #空集合儲存
    for item in data:
        areas.add(item['sarea']) #將sarea(查json檔可以發現是:地區)加入集合
    return list(areas)

def get_sites_of_area(data,area)->list: 
    """
    取得指定地區的所有bike站資料

    Parameters:
    data (list): JSON 格式的bike站資料
    area (str): 地區的名稱

    Returns:
    list: 指定地區的所有bike站資料
    """
    sites = []
    for item in data:
        if item['sarea'] == area:
            sites.append(item)
    return sites

