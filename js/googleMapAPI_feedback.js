
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

                // createReportInfoWindow = new google.maps.InfoWindow({ map: reportMap });

                // createReportInfoWindow.setPosition(reportCurrentPosition);
                // createReportInfoWindow.setContent('目前回報地點！');
                reportMap.setCenter(reportCurrentPosition);
                reportMap.setZoom(15);
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