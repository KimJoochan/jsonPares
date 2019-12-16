#엑셀파일을 Json으로 바꾸는 코

import openpyxl
from collections import OrderedDict
import json
wb = openpyxl.load_workbook('original.xlsx')
sh=wb.active
cars_list=[]
for rownum in sh.rows:
    cars = OrderedDict()
    cars['num'] = rownum[0].value
    cars['date'] = str(rownum[1].value)
    cars['address'] = rownum[3].value
    cars['state'] = rownum[4].value
    cars['orders'] = rownum[9].value
    if(rownum[11].value==None):
        cars['theme'] = ""
    elif(rownum[11].value=='None'):
        cars['theme'] = ""
    else:
        cars['theme'] = rownum[11].value
    cars['local'] = rownum[12].value
    cars_list.append(cars)
    if(rownum[0].value==None):
        break
# Serialize the list of dicts to JSON
j = json.dumps(cars_list, ensure_ascii=False)
key = OrderedDict()
key['data']=cars_list
#print("-----------")
#print(w)
# Write to file
with open('data.json', 'w', encoding='UTF-8-sig') as f:
     f.write(json.dumps(key, ensure_ascii=False))
