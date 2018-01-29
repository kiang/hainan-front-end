var router = new Router();
router.add('index', () => gotoIndex())
router.add('active', () => active.checked = true)
router.add('feedback', () => gotoFeedback() )


function gotoIndex() {
    index.checked = true;
    initGmaps();
}

function gotoFeedback () {
    feedback.checked = true;
    initFeedbacktMap();
}


const listing = document.querySelector('#listing');
listing.addEventListener('click', () => {
    mapsList.checked = false;

    //之後接到 API 成功時，在非同步時做這件事。現在先假裝有在跑。
    showIndexMapsDetail ({
        beach: "某個海灘",
        city: "城市",
        date: "活動日期",
        location: "集合地點",
        host: "聯絡人",
        phone: "聯絡電話"
    });

    showIndexMapsDetail ({
        beach: "某個海灘",
        city: "城市",
        host: "聯絡人",
        phone: "聯絡電話"
    });

})


function showIndexMapsDetail (data) {
    const activeDetail = document.querySelector('#activeDetail');

    //tr list to table
    const table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-striped');
    for (key in data) {
        const keyCell = document.createElement('td');
        const valueCell = document.createElement('td');
        keyCell.textContent = key;
        valueCell.textContent = data[key];

        const tr = document.createElement('tr');
        tr.appendChild(keyCell);
        tr.appendChild(valueCell);
        table.appendChild(tr);
    }
    activeDetail.innerHTML = table.outerHTML;
}

const markersFilter = document.querySelector('#displayFilter');
markersFilter.addEventListener('change', inserMarkerToMaps);

var indexMaps;
var indexMarkers;


function GMarkers (activityData, iconImage) {
    this.markers = activityData.map((item, index) => {
        // console.log(activityData);
        let markerLetter = String.fromCharCode('A'.charCodeAt(0) + (index % 26));
        let markerIcon = iconImage + markerLetter + '.png';
        addResult(item, index, iconImage);

        return new google.maps.Marker({
            position: {
                lat: item.coordinates[1],
                lng: item.coordinates[0]
            },
            animation: google.maps.Animation.DROP,
            icon: markerIcon,
            activity: item.activity,
            cityname: item.cityname,
            sealinename: item.sealinename,
            date: item.date
        });
    });

    this.clearAll = function () {
        this.markers.forEach((item) => {
            if (item) {
                item.setMap(null);
            }
        })
    };

    function dropMarker(item, index, map) {
        return function () {
            item.setMap(map);
        };
    };

    this.setMap = function (map) {
        this.markers.forEach((item, index) => {
            google.maps.event.addListener(item, 'click', showActivityWindow);
            setTimeout(dropMarker(item, index, map), index * 500);
        })
    }
}

clearAllMarks (markers, )

let markers = []
//
// function clearMarkers() {
//     for (var i = 0; i < markers.length; i++) {
//         if (markers[i]) {
//             markers[i].setMap(null);
//         }
//     }
//     markers = [];
// }

function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}


function Gmaps (opations) {
    this.map = new google.maps.Map(document.getElementById('map'), opations);
    this.activityBubble = new google.maps.InfoWindow({
        content: document.getElementById('activity-info-content')
    });
    this.feedbackBubble = new google.maps.InfoWindow({
        content: document.getElementById('report-info-content')
    });

    this.addMarker = function(indexMarkers) {
        indexMarkers.clearAll();
        indexMarkers.setMap(this.map)
    };
}


function inserMarkerToMaps(event) {

    //init Maps
    indexMaps.map.setZoom(7);
    indexMaps.map.setCenter({ lat: 23.5, lng: 121 });
    // console.log(this.value)

    //reset Mark & Results
    // clearResults();

    // marks to mpas
    if (this.value === "activities") {
        // indexMaps.addMarker(indexMarkers);
        indexMaps.addMarker(indexMarkers);
    } else {
        // dropReportMarker(markB)
    }
};



var map;

// let activityData = []

$(document).ready(() => {
    router.reload();
    //send api for marks of maps

    //if success
    // activityData = ;
    indexMarkers = new GMarkers([
        { "cityname": "臺南市", "sealinename": "黃金海岸", "coordinates": [120.17607431485473, 22.930725534782255], "activity": "黃金海岸淨灘", "date": "2018/03/01" },
        { "cityname": "嘉義縣", "sealinename": "東石橋畔出海口", "coordinates": [120.17892956729158, 23.4647674172182], "activity": "東石橋畔出海口淨灘", "date": "2018/03/02" },
        { "cityname": "臺東縣", "sealinename": "豐里二號橋", "coordinates": [121.11947051560296, 22.71528595926939], "activity": "豐里二號橋淨灘", "date": "2018/03/03" },
        { "cityname": "花蓮縣", "sealinename": "奇萊鼻至東防波", "coordinates": [121.64331533550265, 24.00214009118872], "activity": "奇萊鼻至東防波淨灘", "date": "2018/03/04" },
        { "cityname": "新北市", "sealinename": "龍洞地質公園停車場至龍安廟前海岸", "coordinates": [121.91657066345216, 25.11731056144692], "activity": "龍洞地質公園淨灘", "date": "2018/03/05" }
    ], "http://maps.gstatic.com/mapfiles/markers2/marker");

    indexMaps = new Gmaps({
        zoom: 7,
        center: { lat: 23.5, lng: 121 },
        fullscreenControl: false,
        streetViewControl: false,
    });
})

function initGmaps() {
    indexMaps = new Gmaps({
        zoom: 7,
        center: { lat: 23.5, lng: 121 },
        fullscreenControl: false,
        streetViewControl: false,
    });

}

//google maps
const markA = "http://maps.gstatic.com/mapfiles/markers2/marker";
const markB = "https://developers.google.com/maps/documentation/javascript/images/marker_green"

function initFeedbacktMap() {
    if (reportMap === undefined) {
        reportMap = new google.maps.Map(document.getElementById('reportMap'), {
            center: { lat: 24.3, lng: 120.51 },
            zoom: 6,
            center: { lat: 23.5, lng: 121 },
            fullscreenControl: false,
            streetViewControl: false,
        });
    };


    if (reportCurrentPosition === undefined) {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                reportCurrentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                marker = new google.maps.Marker({
                    position: reportCurrentPosition,
                    map: reportMap,
                    draggable: true,
                    // label: "999"
                });

                infoWindow = new google.maps.InfoWindow({
                    content: '<p class = "feebackText">'+'回報位置'+'</p>'
                });

                infoWindow.open(map, marker);
                reportMap.setCenter(reportCurrentPosition);
                reportMap.setZoom(15);

                google.maps.event.addListener(marker, 'drag', showActivityWindow);


            }, function () {
                handleLocationError(true, createReportInfoWindow, reportMap.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, createReportInfoWindow, reportMap.getCenter());
        }
    } else {
        // createReportInfoWindow.open(reportMap);
        console.log(reportMap);
        // reportMarker.setMap(reportMap);
        // createReportInfoWindow.setPosition(reportCurrentPosition);
        // createReportInfoWindow.setContent('目前回報地點！');
        reportMap.setCenter(reportCurrentPosition);
        reportMap.setZoom(15);
    }
}
