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
     var latlng = new google.maps.LatLng(parseFloat(item['lati']), parseFloat(item['longi']));
     let title = item['name'];
     let open = item['opening'];
     let state = item['state'];
     addMarker(latlng, title, open, state);
 }


 function reset() { //배열 리셋
     lat_array = new Array();
     lon_array = new Array();
     name_array = new Array();
     open_array = new Array();
     state_array = new Array();
 }
 reset();

 function array_add(res) { //배열에 값넣기
     lat_array.push(res['lati']);
     lon_array.push(res['longi']);
     name_array.push(res['name']);
     open_array.push(res['opening']);
     state_array.push(res['state']);
 }

 function addMarker(location, title, open, state) {
     switch (state) {
         case "운영중지":
             iconSet = "not.png";
         case "폐점":
             iconSet = "not.png";
             break;
         case "운영중":
             iconSet = {
                 path: google.maps.SymbolPath.CIRCLE,
                 scale: 8.5,
                 fillColor: "#f00",
                 fillOpacity: 0.4,
                 strokeWeight: 0.4
             }
             break;
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
         $('#menuBar>.open').find('p').remove();
         $('#menuBar>.state').find('p').remove();
         $('#menuBar>.link').find('a').remove();
         $('#img').find('img').remove();
         $('#menuBar').find('.name').append(`<p class="item">${title}</p>`);
         $('#menuBar').find('.open').append(`<p class="item">${open}</p>`);
         $('#menuBar').find('.state').append(`<p class="item">${state}</p>`);
         $('#menuBar').find('.link').append(`<a href="#" class="item">연락하기</a>`);
         $('#menuBar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
         setTimeout(function () {
             infowindow.close();
         }, 3000);
     });
 }
 let jsonDataFood;
 $(document).ready(function () {
     $.getJSON("./test2.json", function (data) {
         jsonDataFood = data[2].data;
         for (var item of jsonDataFood) {
             naArray.push(item['name'].split(' ')[0]);
             theArray.push(item['theme'].split(' ')[0]);
             array_add(item);
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
             addMarker(latlng, title, open, state);
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
             if (item['theme'].indexOf(sele) != -1) {
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
