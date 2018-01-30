let reportBase;
const reportSubmit = document.querySelector('.reportSubmit');
reportSubmit.addEventListener('click', submitReport);

let testReport = {
    "targetID": 3,
    "description": "黃金海岸需要淨灘",
    "imageURL": "https://i.imgur.com/FZIV7sy.jpg",
    "isOpen": "1"
}


// $.ajax({
//     url:'https://172.105.219.35:3000/api/beach/notification',
//     type:'GET',
//     // dataType:'json',
//     success: function (response) {
//         console.log(response);
//         reportBase = response.result;
//         console.log(reportBase)
//     },
//     error: function (jqXHR, status, errorThrown) {
//         console.log(jqXHR);
//     }
// })

function submitReport (event) {
    // reportBase.push(testReport);
    console.log(testReport)
    $.ajax({
        //settings
        url:'http://172.105.219.35:3000/api/beach/notification',
        type:'POST',
        data:testReport,
        // dataType:'json',
        //handles response
        success(response){
            console.log(response);
        },
        error(jqXHR, status, errorThrown) {
            console.log(jqXHR);
        }
    });
}

