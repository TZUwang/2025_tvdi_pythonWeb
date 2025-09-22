def calculate_sum(a, b):
    result = a + b
    return result #回傳result的值

def main(): #在偵測模式下才會設中斷點(在行數左側紅點設定) 分段偵錯執行
    number1 = 10
    number2 = 20
    total = calculate_sum(number1, number2) #呼叫calculate_sum函式將兩個數字代入相加
    print(f"計算結果: {total}")

'''
if __name__ == "__main__": #如果這個檔案(lesson2_1.py)是被python直接執行,__name__這個全域變數的值一定會是main
    print("這是python直接執行的檔案")
else:
    print("這不是python直接執行的檔案")
'''
if __name__ == "__main__":
    main() #呼叫main function 代表程式真正的執行點