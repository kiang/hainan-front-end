// let reportBase;
// const reportSubmit = document.querySelector('.reportSubmit');
// reportSubmit.addEventListener('click', submitReport);

// let testReport = {
//     "targetID": 3,
//     "description": "黃金海岸需要淨灘",
//     "imageURL": "https://i.imgur.com/FZIV7sy.jpg",
//     "isOpen": "1"
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

// function submitReport(event) {
//     // reportBase.push(testReport);
//     console.log(testReport)
//     $.ajax({
//         //settings
//         url: 'http://172.105.219.35:3000/api/beach/notification',
//         type: 'POST',
//         data: testReport,
//         // dataType:'json',
//         //handles response
//         success(response) {
//             console.log(response);
//         },
//         error(jqXHR, status, errorThrown) {
//             console.log(jqXHR);
//         }
//     });
// }

