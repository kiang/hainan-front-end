const results = document.getElementById('results');
const btn = document.querySelector('button');
btn.addEventListener('click', addMarker);
const MARKER_PATH = 'http://maps.gstatic.com/mapfiles/markers2/marker';
let map;
let infoWindow;

let data = [
    { "cityname": "臺南市", "sealinename": "黃金海岸", "coordinates": [120.17607431485473, 22.930725534782255], "activity": "黃金海岸淨灘", "date": "2018/03/01" },
    { "cityname": "嘉義縣", "sealinename": "東石橋畔出海口", "coordinates": [120.17892956729158, 23.4647674172182], "activity": "東石橋畔出海口淨灘", "date": "2018/03/02" },
    { "cityname": "臺東縣", "sealinename": "豐里二號橋", "coordinates": [121.11947051560296, 22.71528595926939], "activity": "豐里二號橋淨灘", "date": "2018/03/03" },
    { "cityname": "花蓮縣", "sealinename": "奇萊鼻至東防波", "coordinates": [121.64331533550265, 24.00214009118872], "activity": "奇萊鼻至東防波淨灘", "date": "2018/03/04" },
    { "cityname": "新北市", "sealinename": "龍洞地質公園停車場至龍安廟前海岸", "coordinates": [121.91657066345216, 25.11731056144692], "activity": "龍洞地質公園淨灘", "date": "2018/03/05" }
];

let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //zoom 屬性指定地圖的縮放層級。 縮放：0 是最低的縮放
        zoom: 7,
        //center 屬性會告知 API 要在哪裡放置地圖中心
        center: { lat: 23.5, lng: 121 },
        fullscreenControl: false,
        streetViewControl:false,
    });

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });
    //增加標簽
    // var marker = new google.maps.Marker({
    // 	position: { lat: 23.5, lng: 121 },
    // 	map: map,
    // 	title: 'Taiwan!'
    // });

    //將marker 加上事件
    // marker.addListener('click', function () {
    // 	map.setZoom(12);
    // 	map.setCenter(marker.getPosition());
    // });
};

function addMarker() {
    map.setZoom(7);
    map.setCenter({ lat: 23.5, lng: 121 });
    clearResults();
    clearMarkers();
    for (var i = 0; i < data.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        // Use marker animation to drop the icons incrementally on the map.
        let coord = data[i].coordinates;
        console.log(coord)
        let lat = coord[1];
        let lng = coord[0];

        markers[i] = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            animation: google.maps.Animation.DROP,
            // label: markerLetter,
            icon: markerIcon,
            activity: data[i].activity,
            cityname: data[i].cityname,
            sealinename: data[i].sealinename,
            date: data[i].date
        });
        // If the user clicks a hotel marker, show the details of that hotel
        // in an info window.
        //markers[i].placeResult = results[i];

        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 300);
        addResult(data[i], i);
    }


}

function dropMarker(i) {
    return function () {
        markers[i].setMap(map);
    };
};

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}
function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}
function addResult(result, i) {
    // var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';

    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    tr.onclick = function () {
        google.maps.event.trigger(markers[i], 'click');
    };

    var iconTd = document.createElement('td');
    var nameTd = document.createElement('td');
    var icon = document.createElement('img');
    icon.src = markerIcon;
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    iconTd.appendChild(icon);
    nameTd.innerHTML = `${result.date}-${result.activity}`;
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
};

function showInfoWindow() {
    var marker = this;
    map.setZoom(12);
    map.setCenter(marker.getPosition());
    //開啟infoWindow
    infoWindow.open(map, marker);
    document.getElementById('activity').innerHTML = `${marker.activity}`;
    document.getElementById('iw-beach').textContent = marker.sealinename;
    document.getElementById('iw-city').textContent = marker.cityname;
    document.getElementById('iw-date').textContent = marker.date;
    document.getElementById('iw-location').textContent = 'location';
    document.getElementById('iw-host').textContent = '歐巴馬';
    document.getElementById('iw-phone').textContent = '09xxxxxxxx';
};

