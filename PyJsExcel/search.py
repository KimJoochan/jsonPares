import requests

location = "동의대"
url=("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDF1pqbEh3QHTgfSMTnaRzJvefdSFt49GM&sensor=false&language=ko&address={}".format(location))
response=requests.get(url)
data = response.json()
lat = data["results"][0]["geometry"]["location"]["lat"]
lng = data["results"][0]["geometry"]["location"]["lng"]

print(lat)
print(lng)