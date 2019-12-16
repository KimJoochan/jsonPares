 let naArray = new Array();
 let theArray = new Array();
 let uniqueName = new Array();
 let uniqueTheme = new Array();
 //테마와 이름 select option값
 let lat_array;
 let lon_array;
 let name_array;
 let open_array;
 let state_array;
 let order_array;

 /*$('#select').change(function () {
     deleteMarkers();
     var sele = $(this).val();
     for (let item of jsonData) {
         if (item['name'].indexOf(sele) != -1) {
             addPoint(item);
         } else if (sele == "") {
             addPoint(item);
         }
     }
 })*/
 /*$('#select2').change(function () {
     deleteMarkers();
     var sele = $(this).val();
     for (let item of jsonData) {
         if (item['theme'].indexOf(sele) != -1) {
             addPoint(item);
         } else if (sele == "") {
             addPoint(item);
         }
     }
 })*/
 function addPoint(item) {
     latLng = item['local'].split(',')
     lat = latLng[0].trim();
     lng = latLng[1].trim();
     var latlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
     let title = item['address'];
     let open = item['date'];
     let state = item['state'];
     let orDers = item['orders'];
     if (orDers == null) {
         orNum = 0
     } else {
         orNum = orDers.split(' ')[1].replace("콜", "");
     }
     addMarker(latlng, title, open, state, orNum);
 }


 function reset() { //배열 리셋
     lat_array = new Array();
     lon_array = new Array();
     name_array = new Array();
     open_array = new Array();
     state_array = new Array();
     order_array = new Array();
 }
 reset();

 let lat;
 let lng;
 let locat;

 function array_add(res) { //배열에 값넣기
     let loc = res['local']
     if (loc != null) {
         locat = loc.split(',');
         if (locat[0] != "" && locat[1] != "") {
             lat = locat[0].trim();
             lng = locat[1].trim();
         } else {
             lat = "";
             lng = "";
         }
     } else {
         lat = "";
         lng = "";
     }
     lat_array.push(lat);
     lon_array.push(lng);
     name_array.push(res['address']);
     open_array.push(res['date']);
     state_array.push(res['state']);
 }

 function addMarker(location, title, open, state, orders) {
     switch (state) {
         case "운영중지":
         case "폐점":
             orders = 88;
             break;
     }
     iconSet = {
         path: google.maps.SymbolPath.CIRCLE,
         scale: 8.5,
         fillColor: "#f00",
         fillOpacity: 0.4,
         strokeWeight: 0.4
     }
     var marker = new google.maps.Marker({
         position: location,
         map: map,
         icon: iconSet
     });
     /*
          map.panTo(location);*/
     markers.push(marker);
     //클릭시 infowindow
     var contentString = title;
     var infowindow = new google.maps.InfoWindow({
         content: contentString
     });
     marker.addListener('click', function () {
         infowindow.open(map, marker);
         $('#menuBar>.name').find('p').remove();
         $('#menuBar>.state').find('p').remove();
         $('#menuBar').find('.name').append(`<p class="item">${title}</p>`);
         /*$('#menuBar').find('.state').append(`<p class="item">${state}</p>`);*/
         if (state == '운영중지') {
             chart.data.colors({
                 orders: d3.rgb('#ff33cb')
             })
         } else {
             chart.data.colors({
                 orders: d3.rgb('#FF7F00')
             })
         }
         chart.load({
             columns: [['orders', orders]],
             unload: ['data1']
         });
         $('#menuBar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
         setTimeout(function () {
             infowindow.close();
         }, 3000);
     });
 }
 let jsonDataFood;
 let ordes = null;
 $(document).ready(function () {
     $.getJSON("./data.json", function (data) {
         jsonDataFood = data['data']
         for (var item of jsonDataFood) {
             naArray.push(item['address'].split(' ')[0]);
             theArray.push(item['theme'].split(' ')[0]);
             array_add(item);
             var ord = item['orders'];
             if (ord == null) {
                 puOrder = "";
             } else {
                 order = ord.split(' ');
                 orders = order[1]
                 puOrder = orders.replace("콜", "")
             }
             order_array.push(puOrder);
         }
         $.each(naArray, function (i, j) {
             if ($.inArray(j, uniqueName) === -1) uniqueName.push(j);
         })
         $.each(theArray, function (i, j) {
             if ($.inArray(j, uniqueTheme) === -1) uniqueTheme.push(j);
         })
         for (var item of uniqueName) {
             $('#select').append(`<option value="${item}">${item}</option>`)
         }
         for (var item of uniqueTheme) {
             $('#select2').append(`<option value="${item}">${item}</option>`)
         }
         for (var j in lat_array) {
             var latlng = new google.maps.LatLng(parseFloat(lat_array[j]), parseFloat(lon_array[j]));
             let title = name_array[j];
             let open = open_array[j];
             let state = state_array[j];
             let orders = order_array[j];
             addMarker(latlng, title, open, state, orders);
         }
     });
     let jsonData;
     let draw;
     $.getJSON('./koreaJson.json', function (data) {
         jsonData = data['features'];
         for (var i in jsonData) {
             let item = jsonData[i]['properties']['name'];
             $('#select1').append(`<option value="${item}">${item}</option>`);
         }
     });
     /*setTimeout(function () {
         let drawArray = new Array();
         for (var item of jsonData) {
             let concet=item['properties']['name'];
             if (concet== "양산시") {
                 var draItem = item['geometry']['coordinates'][0];
                 for (var itmes of draItem) {
                     drawArray.push({
                         lat: parseFloat(itmes[0]),
                         lon: parseFloat(itmes[1])
                     })
                 }
                 break;
             }
         }
         console.log(drawArray);
         map.data.add({
             geometry: new google.maps.Data.Polygon([drawArray])
         });
         map.data.setStyle({
             fillColor: 'gray',
             strokeWeight: 1
         });
     }, 5000)*/

     /*$('#select').change(function () {
         deleteMarkers();
         var sele = $(this).val();
         for (let item of jsonData) {
             if (item['name'].indexOf(sele) != -1) {
                 addPoint(item);
             } else if (sele == "") {
                 addPoint(item);
             }
         }
     })*/
     $('#select2').change(function () {
         deleteMarkers();
         var sele = $(this).val();
         for (let item of jsonDataFood) {
             /*console.log(`${sele}:${item['theme']}`);
             console.log()*/
             if (sele.trim() == item['theme'].trim()) {
                 addPoint(item);
             } else if (sele == "") {
                 addPoint(item);
             }
         }
     })
     $('#delete').click(function () {
         deleteMarkers();
     });
 })
