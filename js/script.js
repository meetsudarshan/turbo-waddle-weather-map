var searchBtn = document.getElementById('searchbtn');
var priorsearchval = document.getElementById('search-history');
var fiveDayval = document.getElementById('Forecastday');
var uv2 = document.getElementById('UVval');
var forecastval;
var uvval = document.getElementById('UV');
var todaydata;
var cityName;
var cityval = document.getElementById('city');
var tempval = document.getElementById('temp');
var humidityval = document.getElementById('humidity');
var windval = document.getElementById('wind');



function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    cityName = document.querySelector('#searchinput').value;
    if(priorsearchArr.indexOf(cityName) === -1){
        priorsearchArr.push(cityName);
        localStorage.setItem('history', JSON.stringify(priorsearchArr));
        priorSearch(cityName);
    }
    if (!cityName) {
      console.error('You need a search input value!');
      return;
    }
   
    getApi(cityName);
}


function getApi(city) {
    
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";
    var currentApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";

    cityval.innerHTML = "";
    fiveDayval.innerHTML = "";
    tempval.innerHTML = "";
    humidityval.innerHTML = "";
    windval.innerHTML = "";
    uvval.innerHTML = "";
    uv2.innerHTML = "";

    fetch(weatherApi)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })

        .then(function(data) {
            forecastval= data;

            for (i = 4; i < forecastval.list.length; i+=8) {
                var card = document.createElement("div");
                card.classList.add("col", "five")

                var date = document.createElement("h2")
                var futuredate = data.list[i].dt_txt;
                date.textContent = new Date(futuredate).toLocaleDateString();
                
                var temp = document.createElement("p")
                var futuretemp = data.list[i].main.temp;
                temp.textContent = "Temp: " + futuretemp + " ℉";

                var humid = document.createElement("p")
                var futurehumidity = data.list[i].main.humidity;
                humid.textContent = "Humidity: " + futurehumidity + "%";

                var image= document.createElement("img");
                image.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                
                card.append(date, image, temp, humid)
                fiveDayval.appendChild(card);

            }
        })

    fetch(currentApi)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log("Current data")
            todaydata= data;
            displayCurrent(todaydata);
            console.log("todaydata");
        })
}



function displayCurrent(todaydata){


    var Lat = todaydata.coord.lat;
    var Lon = todaydata.coord.lon;
    getUV(Lat, Lon);

    var displayCity = document.createElement('h2');
    cityval.append(displayCity);

    var currentImage = document.createElement("img");
    currentImage.setAttribute("src", "http://openweathermap.org/img/w/" + todaydata.weather[0].icon + ".png")

    var currDate = new Date(moment().format()).toLocaleDateString();

    displayCity.append(document.createTextNode(todaydata.name + "   "));
    displayCity.append(document.createTextNode(" (" + currDate + ") "));
    displayCity.append(currentImage);

    tempval.append(document.createTextNode("Temperature: " + todaydata.main.temp + " ℉"));

    humidityval.append(document.createTextNode("Humidity: " + todaydata.main.humidity + " %"));

    windval.append(document.createTextNode("Wind Speed: " + todaydata.wind.speed + " MPH"));

    uvval.append(document.createTextNode("UV Index:  "));

}


function getUV(latitude, longitude) {
    var ultraVioletAPI = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5";

    fetch(ultraVioletAPI)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            ultravioletdata = data.value;
            ultravioletray(ultravioletdata);
            
        })
}


function ultravioletray(ultravioletdata){
    uv2.append(document.createTextNode(ultravioletdata));

    if (ultravioletdata >= 2 && ultravioletdata < 5){
        uv2.style.backgroundColor = "pink";
    }
    else if (ultravioletdata >= 5 && ultravioletdata < 10){
        uv2.style.backgroundColor = "red";
    }
    else if(ultravioletdata >= 10 && ultravioletdata < 20){
        uv2.style.backgroundColor = "green";
    }
    else {
        uv2.style.backgroundColor = "yellow";
    }
}


function priorSearch(city){

    var cityName = document.createElement('li');
    cityName.textContent = city;

    cityName.onclick = function (){
        getApi(this.textContent)
    }
    
    priorsearchval.appendChild(cityName);

}


searchBtn.addEventListener('click', handleSearchFormSubmit);


var priorsearchArr = JSON.parse(localStorage.getItem('history')) || [];

if(priorsearchArr.length){
    for (let i = 0; i < priorsearchArr.length; i++) {
       priorSearch(priorsearchArr[i])
        
    }
}








// var button = document.querySelector('.button')
// var food = document.querySelector('.restaurant')
// var inputvalue = document.querySelector('.inputValue')
// // var temp = document.querySelector('.temp');
// // var temp1 = document.querySelector('.temp1');
// // var temp2 = document.querySelector('.temp2');
// // var temp3 = document.querySelector('.temp3');
// // var temp4 = document.querySelector('.temp4');
// // var temp5 = document.querySelector('.temp5');
// // var temp6 = document.querySelector('.temp6');
// // var temp7 = document.querySelector('.temp7');
// // var Food = document.querySelector('.Food');
// // var Food1 = document.querySelector('.Food1');
// // var Food2 = document.querySelector('.Food2');
// // var Food3 = document.querySelector('.Food3');
// // var Food4 = document.querySelector('.Food4');
// // var Food5 = document.querySelector('.Food5');
// // var Food6 = document.querySelector('.Food6');
// // var Food7 = document.querySelector('.Food7');
// // var Food8 = document.querySelector('.Food8');
// var restaurantsData = document.querySelector('.restColumn')
// var inputField = document.querySelector(".inputValue");
// var previousLocation = localStorage.getItem("location");
// var userInput = document.getElementById("userSreach");
// var fetchResButton = document.getElementById("res");
// var restaurantsData = document.getElementById("resData");
// var locCard = document.getElementById("locationCard");
// const modalBg = document.querySelector('.modal-background');
// const modal = document.querySelector('.modal');

// if (previousLocation) {
//   inputField.value = previousLocation;
// }
// var searchButton = document.querySelector(".button");
// searchButton.addEventListener("click", function () {
//   var inputValue = inputField.value
//   localStorage.setItem("location", inputValue);
// });



// function weatherApi() {
//   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputvalue.value},US&units=imperial&appid=108dd9a67c96f23039937fe6f3c91963`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       locCard.textContent = "";

// //       console.log(data);
//       var lati = data.city.coord.lat;
// //       console.log(lati);
//       var long = data.city.coord.lon;
// //       console.log(long);
//       var date = new Date().toLocaleDateString();

// //testing code
//       // temp7.textContent = data.city.name;
//       // temp8.textContent = date;
//       // var weatherIcon =
//       //   temp9.setAttribute('src', "")

//       //main div for location and date
//       var locationDate = document.createElement("div");
//       locationDate.classList.add("column", "is-full");

//       //div for two column in lcoation and date
//       var locationDateDiv = document.createElement("div");
//       locationDateDiv.classList.add("columns");

//       //h2 for location
//       var locationH2 = document.createElement("h2");
//       locationH2.classList.add("column", "is-6", "temp7");
//       locationH2.textContent = data.city.name;

//       //h2 for date
//       var dateH2 = document.createElement("h2")
//       dateH2.classList.add("column", "is-6");
//       dateH2.textContent = date;

//       // append data for location and date
//       locationDateDiv.append(locationH2, dateH2);
//       locationDate.append(locationDateDiv);
//       locCard.append(locationDate);


//       // temp7.innerText = `${data.city.name}`
//       fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&exclude=minutely,hourly,alerts&units=imperial&appid=108dd9a67c96f23039937fe6f3c91963`)
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (citydata) {
// //           console.log(citydata);
          
//           //main div for current Weather
//           var cWeather = document.createElement("div");
//           cWeather.classList.add("column", "is-full");

//           //columns for current weather

//           var ccWeather = document.createElement("div");
//           ccWeather.classList.add("columns");

//           // clouds or not data
//           var isClouds = document.createElement("h2")
//           isClouds.classList.add("column", "is-4", "temp6");
//           isClouds.textContent = citydata.current.weather[0].description;

//           // wind or not data
//           var isWind = document.createElement("h2")
//           isWind.classList.add("column", "is-4");
//           isWind.textContent = "Wind " + citydata.current.wind_speed + " mph";

//           // rain or not data
//           var isRain = document.createElement("h2")
//           isRain.classList.add("column", "is-4");
//           isRain.textContent = "Humidity: " + citydata.current.humidity + "%";

//           ccWeather.append(isClouds, isWind, isRain);
//           cWeather.append(ccWeather);
//           locCard.append(cWeather)


//           //main div for waeter image and feel like 
//           var ImageWeather = document.createElement("div");
//           ImageWeather.classList.add("column", "is-full");

//           //columns for image weather and feel like

//           var IWeather = document.createElement("div");
//           IWeather.classList.add("columns");


//           var isImageDiv = document.createElement("div")
//           isImageDiv.classList.add("column", "is-6");
        
//           //image tage for weather image
//           var isImage = document.createElement("img");
//           var iconCode = citydata.current.weather[0].icon;
//           isImage.textContent = iconCode;
//           isImage.setAttribute("src", "https://openweathermap.org/img/wn/" + iconCode + "@2x.png")
//           isImage.setAttribute("alt", "weather image");
        
//           // temp card div

//           var isTemp = document.createElement("div");
//           isTemp.classList.add("column", "is-6");

//           var isTempColumn = document.createElement("div");
//           isTempColumn.classList.add("columns", "is-multiline");



//           //h1 for temp
//           var tempH1 = document.createElement("h2");
//           tempH1.classList.add("column", "is-12");
//           tempH1.textContent =  "Current Temp: " + citydata.current.temp + "°F";


//           //h2 for feel like
//           var tempH2 = document.createElement("h2")
//           tempH2.classList.add("column", "is-12");
//           tempH2.textContent = "Feels Like: " + citydata.current.feels_like + "°F";


//           isImageDiv.append(isImage);
//           IWeather.append(isImageDiv);
//           isTempColumn.append(tempH1, tempH2);
//           isTemp.append(isTempColumn);
//           IWeather.append(isTemp)
//           ImageWeather.append(IWeather);
//           locCard.append(ImageWeather);

// //           console.log(citydata.daily);

//           //main div for forecast Weather
//           var fWeather = document.createElement("div");
//           fWeather.classList.add("column", "is-full");
//           fWeather.textContent = "";


//           //days
//           var mainDays = document.createElement("div");
//           mainDays.classList.add("columns");
//           mainDays.textContent = "";


//           var dData = citydata.daily;
        
        
//         // mainDays.append()

//           fWeather.append(mainDays);
//           locCard.append(fWeather);
          
//         for (var x = 0; x < 4; x++) {


//             //day1
//             var firstDay = document.createElement("div");
//             firstDay.classList.add("column", "is-3");


//             //day1 column
//             var firstDaycol = document.createElement("div");
//             firstDaycol.classList.add("columns", "is-multiline");

//             //day1 date
//             var firstDaycolDate = document.createElement("div");
//             firstDaycolDate.classList.add("column", "is-12");
//             var date1 = dData[x].dt;
//             // console.log(date1);
//             var date01 = new Date(date1 * 1000);
// //             console.log(date01);
//             // var date2 = JSON.stringify(date01);
//             var date2 = date01.toLocaleDateString();
// //             console.log(date2)
//             // var date3 = date2.slice(1, 4);
//             // console.log(date3);
//             firstDaycolDate.textContent = date2;

//             //day High
//             var firstDaycolHigH = document.createElement("div");
//             firstDaycolHigH.classList.add("column", "is-12", "temp3");
//             firstDaycolHigH.textContent = "High: " + dData[x].temp.max + "°F";
//             // console.log(firstDaycolHigH);

//             //day low

//             var firstDaycolLow = document.createElement("div");
//             firstDaycolLow.classList.add("column", "is-12", "temp3");
//             firstDaycolLow.textContent = "Low: " + dData[x].temp.min + "°F";
//             //day cloud

//             var firstDaycolCloud = document.createElement("div");
//             firstDaycolCloud.classList.add("column", "is-12");
//             var isFImage = document.createElement("img");
//             var iconFCode = dData[x].weather[0].icon;
//             isFImage.textContent = iconFCode;
//             isFImage.setAttribute("src", "https://openweathermap.org/img/wn/" + iconCode + "@2x.png")
//             isImage.setAttribute("alt", "weather image");
//             // firstDaycolCloud.textContent = dData[x].weather[0].description;
//             firstDaycolCloud.append(isFImage);
//             firstDaycol.append(firstDaycolDate, firstDaycolHigH, firstDaycolLow, firstDaycolCloud);
//             firstDay.append(firstDaycol);
//             mainDays.append(firstDay);
//           }
//         })
// //         .then(function (d) {
// //           console.log(d)
// //           fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue.value}&appid=108dd9a67c96f23039937fe6f3c91963`)
// //             .then(function (response) {
// //               return response.json();
// //             }) 
          
// //             .then(function (dd) {
// //               console.log(dd);
// //             })
            
// //         })
        
//     })
//     .catch(err => modal.classList.add('is-active')); 
    
//   modalBg.addEventListener('click', ()=> {
//       modal.classList.remove('is-active');
//     });
//   }



// function YelpApiCallData(callData) {
//   var resturantCard = document.createElement("div");
//   resturantCard.classList.add("column", "is-one-third")

//   //main resturant card div
//   var cardDiv = document.createElement("div");
//   cardDiv.classList.add("card");


//   //image div
//   var imageDiv = document.createElement("div");
//   imageDiv.classList.add("card-image");

//   var imageFigure = document.createElement("figure");
//   imageFigure.classList.add("image", "is-4by3")


//   var resturantImage = document.createElement("img");
//   // resturantImage.classList.add("card-image", "image", "is-4by3");
//   resturantImage.setAttribute("src", callData.image_url)
//   resturantImage.setAttribute("alt", "resturant image")



//   //ceating card content
//   var cardcontent = document.createElement("div");
//   cardcontent.classList.add("card-content", "media-content");
//   // cardDiv.append(cardcontent);


//   //resturant name in card content
//   var resturantName = document.createElement("p");
//   resturantName.classList.add("title", "nameSize");
//   resturantName.textContent = callData.name;
//   // restaurantsData.append(resturantName);

//   var resturantCategory = document.createElement("p");
//   resturantCategory.classList.add("subtitle", "subHeading");
//   resturantCategory.textContent = callData.categories[0].title;
//   //console.log(resturantCategory);

//   var rating = callData.rating;
//   var reviewCount = callData.review_count;
//   var resturantRating = document.createElement("p");
//   resturantRating.textContent = "Reviews: " + rating + '/5 based on ' + reviewCount + ' reviews';
//   // console.log(resturantRating);

//   var resturantPhone = document.createElement("p");
//   resturantPhone.textContent = callData.phone;


//   var resturantAddress = document.createElement("p");
// resturantAddress.classList.add("addressSize");
//   var address = callData.location.display_address;
//   var address11 = callData.location.display_address[0];
// //   console.log(address11);
//   var address12 = callData.location.display_address[1];
// //   console.log(address12);
//   var address13 = callData.location.display_address[2];
// //   console.log(address13);
// //   console.log(address11 + address12 + address13)
//   if (address.length < 3) {
//     resturantAddress.textContent = address11 + " " + address12;
//   }
//   else {
//     resturantAddress.textContent = address11 + " " + address12 + " " + address13;
//   }


//   var MoreButton = document.createElement("a")
//   MoreButton.classList.add("button");
//   MoreButton.setAttribute("href", callData.url);
//   MoreButton.textContent = "Get More Information on Yelp"

//   imageFigure.append(resturantImage)
//   imageDiv.append(imageFigure);
//   cardcontent.append(resturantName, resturantCategory, resturantRating, resturantPhone, resturantAddress, MoreButton);
//   cardDiv.append(imageDiv, cardcontent);
//   resturantCard.append(cardDiv);
//   restaurantsData.append(resturantCard);
// }

// function yelpApi() {
//   //
//   fetch(` https://infinite-shelf-46659.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${inputvalue.value}&term=restaurants&radius=40000&locale=en_US`, {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer " +
//         "tGG1Ba32NNjhGYEXEXVxvfgmG30PXGm6mX66EvPkai4mV2im9Sxls7XfZeUwfmdG7yBENN4JqPHXWPfplkArxMfpvwi81rqkXUh2PLAKMopcFIUDL6QO-tX1ulwFZHYx",
//       "Access-Control-Allow-Origin": "*",
//     },
//   })
//     .then(function (response) {
//       if (!response.ok) {
//         throw response.json();
//       }

//       return response.json();

//     })
//     .then(function (data) {
// //       console.log(data);
//       var businesses = data.businesses;
//       restaurantsData.textContent = "";
//       for (var j = 0; j < businesses.length; j++) {

//         YelpApiCallData(businesses[j])
//       }

//     })

// }
// fetchResButton.addEventListener("click", weatherApi);
// fetchResButton.addEventListener("click", yelpApi);


// //added function to get enter keypress for user input with click 
// inputField.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     button.click();
//   }
// })
