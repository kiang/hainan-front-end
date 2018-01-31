
let reportMarker;

let reportMap;
let createReportInfoWindow;

const feedbackPage = document.querySelector('.feedbackPage');


let reportCurrentPosition;

feedbackPage.addEventListener('click', loadFeedbackMap);
function loadFeedbackMap() {
    window.addEventListener('hashchange', initReportMap, { once: true });
}

// window.addEventListener('hashchange', initReportMap);

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


    // if (reportCurrentPosition === undefined) {
    //     // Try HTML5 geolocation.
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //             reportCurrentPosition = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude
    //             };

    //             marker = new google.maps.Marker({
    //                 position: reportCurrentPosition,
    //                 map: reportMap,
    //                 draggable: true,
    //                 // label: "999"
    //             });

    //             infoWindow = new google.maps.InfoWindow({
    //                 content: '<p class = "feebackText">'+'回報位置'+'</p>'
    //             });

    //             infoWindow.open(map, marker);
    //             reportMap.setCenter(reportCurrentPosition);
    //             reportMap.setZoom(15);

    //             google.maps.event.addListener(marker, 'drag', showFeedbackWindow);


    //         }, function () {
    //             handleLocationError(true, createReportInfoWindow, reportMap.getCenter());
    //         });
    //     } else {
    //         // Browser doesn't support Geolocation
    //         handleLocationError(false, createReportInfoWindow, reportMap.getCenter());
    //     }
    // } else {
    //     reportMap.setCenter(reportCurrentPosition);
    //     reportMap.setZoom(15);
    // }
}

// function showFeedbackWindow() {
//     let currentMarker = this;
//     let currentPositionText = currentMarker.getPosition().toString();
//     let currentPosition = currentMarker.getPosition().toJSON();
//     reportCurrentPosition = currentPosition;
//     console.log(currentPosition);
//     infoWindow.open(map, marker);
// }

const cityFilter = document.querySelector('#feedbackCity');
cityFilter.addEventListener('change', addBeachOption);

function addBeachOption(event) {
    console.clear();
    clearBeachOption();
    clearLocationOption();
    let currentCity = this.value;
    let beachList = allBeachData.filter(function (beach) {
        return beach.city.includes(currentCity);
    })

    let beachNamesArray = [];
    beachList.forEach(function (beach) {
        if (beachNamesArray.includes(beach.beachName) === false) {
            beachNamesArray.push(beach.beachName);
            createBeachFilterOption(beach.beachName);
        }
    })
};

const beachFilter = document.querySelector('#feedbackBeach');
beachFilter.addEventListener('change', addLocationOption)

function clearBeachOption() {
    while (beachFilter.childNodes[0]) {
        beachFilter.removeChild(beachFilter.childNodes[0]);
    }
    beachFilter.innerHTML = `<option selected disabled hidden>選擇海灘分段</option>`;
}

function createBeachFilterOption(beachName) {
    let newOption = document.createElement('option');
    newOption.setAttribute('value', beachName);
    newOption.textContent = beachName;
    beachFilter.appendChild(newOption);
}

function addLocationOption(event) {
    clearLocationOption()
    let currentBeach = this.value;
    let locationList = allBeachData.filter(function (beach) {
        return beach.beachName.includes(currentBeach);
    })
    // console.table(locationList);
    let locationNamesArray = [];
    locationList.forEach(function (location) {
        if (locationNamesArray.includes(location.title) === false) {
            locationNamesArray.push(location.title);
            createLocationFilterOption(location.title);
        }
    })
}

const locationFilter = document.querySelector('#feedbackLocation');
locationFilter.addEventListener('change', selectLocation);

function createLocationFilterOption(locationName) {
    let newOption = document.createElement('option');
    newOption.setAttribute('value', locationName);
    newOption.textContent = locationName;
    locationFilter.appendChild(newOption);
}

function clearLocationOption() {
    while (locationFilter.childNodes[0]) {
        locationFilter.removeChild(locationFilter.childNodes[0]);
    }
    locationFilter.innerHTML = `<option selected disabled hidden>選擇海灘分段</option>`;
}

function selectLocation(event) {
    console.clear();
    let currentPosition = this.value;
    let currentPositionData = allBeachData.filter(function (position) {
        return position.title.includes(currentPosition);
    })
    console.log(currentPositionData);
    drawSelectPosition(currentPositionData[0]);
}

function drawSelectPosition(dataObj) {
    removeReportSealine();
    if (reportMarker !== undefined){
        reportMarker.setMap(null);
    }
    console.log(dataObj);
    let coord = dataObj.geojson.reduce(function (accumulator, currentValue) {
        // console.log(accumulator, currentValue)
        return [(accumulator[0]) + (currentValue[0]) / dataObj.geojson.length, (accumulator[1]) + (currentValue[1]) / dataObj.geojson.length];
    }, [0, 0]);

    reportMarker = new google.maps.Marker({
        position: { lat: coord[1], lng: coord[0] },
        animation: google.maps.Animation.DROP,
        map: reportMap,
        draggable: true,
        // icon: markerIcon,
        // cityname: beach.cityname,
        // sealinename: beach.sealinename,
        // date: beach.date,
        // clean: beach.clean
    });

    reportMap.setCenter({lat: coord[1], lng: coord[0]});
    reportMap.setZoom(12);

    let googleArray = [];
    dataObj.geojson.forEach(function (coord) {
        let coordObj = { lat: coord[1], lng: coord[0] };
        googleArray.push(coordObj);
    });
    dataFeature = { geometry: new google.maps.Data.MultiLineString([googleArray]) };

    reportMap.data.add(dataFeature);
    reportMap.data.setStyle({
        strokeWeight: 10,
        strokeColor: 'blue',
    });

    // google.maps.event.addListener(markers[index], 'click', showReportWindow);
    // setTimeout(dropMarker(index), index * 300);
    // reportCurrentPosition = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    // };

    // marker = new google.maps.Marker({
    //     position: reportCurrentPosition,
    //     map: reportMap,
    //     draggable: true,
    //     // label: "999"
    // });

    // infoWindow = new google.maps.InfoWindow({
    //     content: '<p class = "feebackText">' + '回報位置' + '</p>'
    // });

    // infoWindow.open(map, marker);
    // reportMap.setCenter(reportCurrentPosition);
    // reportMap.setZoom(15);

    // google.maps.event.addListener(marker, 'drag', showFeedbackWindow);
}

function removeReportSealine() {
    //remove pattern
    reportMap.data.forEach(function (feature) {
        console.log(feature);
        reportMap.data.remove(feature);
    });
}



let allBeachData;

$.ajax({
    url: 'https://hainan-api.oss.tw/api/beach/',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
        allBeachData = response.result;
        console.log(allBeachData)
    },
    error: function (jqXHR, status, errorThrown) {
        console.log(jqXHR);
    }
})

