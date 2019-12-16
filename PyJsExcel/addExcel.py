import openpyxl
#엑셀파일열기
wb = openpyxl.load_workbook('add.xlsx')
wb2 = openpyxl.load_workbook('original.xlsx')

#지금 활성화되어있는 시트
add = wb.active
origin=wb2.active

for r2 in add.rows:
    li2=[]
    if(r2[1].value==None):
        break
    for num in range(13):
        if(str(r2[num].value)==None): #값이 비어있다면 None이라는 문자를 넣는 것이 아니라 빈공백으로 넣기
            li2.append("")
        elif(str(r2[num].value)=="None"):#값이 비어있다면 None이라는 문자를 넣는 것이 아니라 빈공백으로 넣
            li2.append("")
        else:
            li2.append(str(r2[num].value))
    else:
        origin.append(li2)  
        
print("추가완료")
wb2.save('original.xlsx')
wb2.close()
wb.close()
