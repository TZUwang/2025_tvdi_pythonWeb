import tools #匯入自訂的function tools

def main():
    try:
        data = tools.download_ubike_data() #從自訂的tools模組呼叫download_ubike_data這個function
        areas = tools.get_area(data) #從自訂的tools模組呼叫get_area這個function
        print("目前可以查詢的地區:\n")
        for area in areas: #印出所有地區
            print(area,end=" ")
        print("\n")
        selected = input("請選擇地區:")
        sites_of_area = tools.get_sites_of_area(data,selected) #從自訂的tools模組呼叫get_sites_of_area這個function
        print(sites_of_area)

    except Exception as e:
        print(f"發生錯誤\n{e}")
    


if __name__ == "__main__": #這是一個 Python 的慣例，放在這裡面的程式碼只有在「直接執行這個 .py 檔案」時才會被執行。如果這個檔案被其他程式當作模組 import，這段程式碼就不會執行
    main() #呼叫main function
