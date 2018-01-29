
let reportMarker;

let reportMap;
let createReportInfoWindow;

const feedbackPage = document.querySelector('.feedbackPage');
feedbackPage.addEventListener('click', loadFeedbackMap);

let reportCurrentPosition;

function loadFeedbackMap() {
    window.addEventListener('hashchange', initReportMap);
}

function initReportMap() {
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

function showActivityWindow() {
    let currentMarker = this;
    let currentPositionText = currentMarker.getPosition().toString();
    // infoWindow.setContent ('<p>Marker Location:' + currentPositionText + '</p>');
    let currentPosition = currentMarker.getPosition().toJSON();
    reportCurrentPosition = currentPosition;
    console.log(currentPosition);
    infoWindow.open(map, marker);
}