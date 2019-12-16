import openpyxl
import requests

#엑셀파일열기
wb = openpyxl.load_workbook('add.xlsx')

#지금 활성화되어있는 시트
sheet1 = wb.active
#sheet1.insert_cols(11)
#sheet1.insert_cols(12) 열의 갯수 맞추기(original sheet와 맞추)
for row in sheet1.rows:
    row_index=row[0].row  #가로의 행의 번호체크
    location = row[3].value #현재의 엑셀의 가게이름,주소가 적힌곳 지정
    url=("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDF1pqbEh3QHTgfSMTnaRzJvefdSFt49GM&sensor=false&language=ko&address={}".format(location))
    response=requests.get(url)
    data = response.json()
    if(not data['results']): #위도 경도 전환시 안나오면 그냥 빈 공간으로 채우기
        lat=""
        lng=""
    else:
        lat = data["results"][0]["geometry"]["location"]["lat"]
        lng = data["results"][0]["geometry"]["location"]["lng"]
    sheet1.cell(row=row_index,column=13).value=str(lat)+","+str(lng) #위도 경도 전환후 값 채우
print("변형완료")
wb.save('add.xlsx')
wb.close()