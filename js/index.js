var searchId=document.getElementById("search");//input
var findId=document.getElementById("find");//button 

var alldays=[];
var myLoc;

async function temp(){
    var x= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=22c2fd5d18564225ac394708242611&q=07112&days=3`)
    var finalResults=await x.json();
    alldays=finalResults.forecast.forecastday;
    myLoc=finalResults.location
    display();
}


function display(){

    var day1 = alldays[0];
    var day2 = alldays[1];
    var day3 = alldays[2];
    var [year1, month1, dayNumber1] = day1.date.split('-');
    var monthName1 = new Date(`${month1}/1`).toLocaleString('en-US', { month: 'long' });
    var formattedDate1 = `${parseInt(dayNumber1)} ${monthName1}`;
    var cartona=``;
        cartona+=`
                            <div class="col-md-4 ">
                        <div class="card rounded-3 h-100">
                            <div class="px-2 header d-flex justify-content-between align-items-center py-2">
                                <div class="day text-capitalize">
                                ${new Date(day1.date).toLocaleDateString('en-US', { weekday: 'long' })}
                                </div>
                                <div class="date">
                                ${formattedDate1}
                                </div>
                            </div>
                            <div class="card-body" id="current">
                                <div class="location">
                                    ${myLoc.name}
                                </div>
                                <div class="degree text-white">
                                    <div class="num">
                                        ${alldays[0].day.maxtemp_c}<sup>o</sup>c
                                    </div>
                                    <div class="forcast-icon">
                                        <img src="https:${alldays[0].day.condition.icon}" class=" w-25" alt="wither">
                                    </div>
                                </div>
                                <div class="custom pb-4 text-info">
                                    ${alldays[0].day.condition.text}
                                </div>
                                <span>
                                    <img src="./img/icon-umberella@2x.png"  alt="">
                                    20%
                                </span>
                                <span>
                                    <img src="./img/icon-wind@2x.png" alt="">
                                    18Km/h
                                </span>
                                <span>
                                    <img src="./img/icon-compass@2x.png" alt="">
                                    East
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card sec rounded-3 h-100">
                            <div class="px-2 header text-center  py-2">
                                <div class="day text-capitalize">
                                ${new Date(day2.date).toLocaleDateString('en-US', { weekday: 'long' })}
                                </div>
                            </div>
                            <div class="card-body text-center">
                                <div class="degree text-white">
                                    <div class="forcast-icon w-25 m-auto pt-3">
                                        <img src="https:${alldays[1].day.condition.icon}" class=" w-50" alt="wither">
                                    </div>
                                    <div class="num fs-4 fw-medium pt-3">
                                        ${alldays[1].day.maxtemp_c}<sup>o</sup>c
                                    </div>
                                    <small class=" text-white-50">${alldays[1].day.mintemp_c}<sup>o</sup></small>
                                </div>
                                <div class="custom pb-4 text-info mt-3">
                                ${alldays[1].day.condition.text}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card rounded-3 h-100">
                            <div class="px-2 header text-center  py-2">
                                <div class="day text-capitalize">
                                ${new Date(day3.date).toLocaleDateString('en-US', { weekday: 'long' })}
                                </div>
                            </div>
                            <div class="card-body text-center">
                                <div class="degree text-white">
                                    <div class="forcast-icon w-25 m-auto pt-3">
                                        <img src="https:${alldays[2].day.condition.icon}" class=" w-50" alt="wither">
                                    </div>
                                    <div class="num fs-3 fw-medium pt-3">
                                        ${alldays[2].day.maxtemp_c}<sup>o</sup>c
                                    </div>
                                    <small class=" text-white-50">${alldays[2].day.mintemp_c}<sup>o</sup></small>
                                </div>
                                <div class="custom pb-4 text-info mt-3">
                                    ${alldays[2].day.condition.text}
                                </div>
                            </div>
                        </div>
                    </div>
        `
    
    document.querySelector(".row").innerHTML=cartona;
}

async function fetchWeather(location) {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=22c2fd5d18564225ac394708242611&q=${location}&days=3`);
        if (!response.ok) {
            throw new Error("Location not found");
        }
        var finalResults = await response.json();
        alldays = finalResults.forecast.forecastday;
        myLoc = finalResults.location;
        display();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchId.addEventListener("input", function () {
    var userInput = searchId.value.trim();
    if (userInput.length >= 3) {
        fetchWeather(userInput); // Fetch new weather if input has 3 or more characters
    }
});


async function getLocationFromIP() {
    try {
        const ipResponse = await fetch('https://ipinfo.io/json?token=http://ip-api.com/json/24.48.0.1'); // Get location based on IP
        const ipData = await ipResponse.json();
        const location = ipData.city; // Use the city from IP data
        fetchWeather(location); // Fetch weather for that location
    } catch (error) {
        console.error("Error fetching location data:", error);
        fetchWeather("Cairo"); // Default to Cairo if there's an error
    }
}

getLocationFromIP();