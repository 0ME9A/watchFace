var sec = document.getElementById("nib_03");
var min = document.getElementById("nib_01");
var hour = document.getElementById("nib_02");
var _username = document.getElementById("username");
var _day = document.getElementById("day");
var _date = document.getElementById("date");
var _location = document.getElementById("address");
var _temp = document.getElementById("temperature");
var _icon = document.getElementById("weather-container_icon");
var _deg_icon = document.getElementById("deg_icon");
var _c_f = document.getElementById("c_f");


function get_time(element, time_fun, deg) {
    return element.style.transform = "rotate(" + time_fun * deg + "deg)";
}


const month_name = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nuv", "dec"]
const week_name = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
var month = new Date().getMonth();
var week = new Date().getDay();
var months = month_name[month];
var weeks = week_name[week]


function date() {
    var date = new Date().getDate();
    if (date.toString().length == 1) {
        return "0" + date;
    }
    else {
        return date;
    }
}


setInterval(() => {
    get_time(sec, new Date().getSeconds(), 6);
    get_time(min, new Date().getMinutes(), 6);
    get_time(hour, new Date().getHours(), 30);
    _day.innerHTML = weeks;
    _date.innerHTML = date() + "/" + months + "/" + new Date().getFullYear();
}, 1000);


var api;
var city;
var units = "metric";
var weather_function = function weather(city, api, units = "metric") {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=";
    fetch(url + city + "&appid=" + api + "&units=" + units).then((response) => response.json()).then((data) => display_weather(data, data.cod));

    function display_weather(data) {
        const { name } = data;
        const { icon, discription } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        const { cod } = data;

        console.log(cod)
        if(name){
            console.log("yes")
            _location.innerHTML = name+", "+country;
            _temp.innerHTML = temp;
            if (units == "metric") {
                _c_f.innerHTML = "C";
            }
            else{
                _c_f.innerHTML = "F";
            }
            _icon.src = "icon/weather/"+icon+".png";
        }
        else{
            console.log("something went wrong");
        }
        console.log(name, icon, temp, humidity, speed, country);
    }
}


var call_function;


function livelyPropertyListener(name, val) {
    switch (name) {
        case "name":
            if (val == "") {
                _username.innerHTML = " ";
            } else {
                _username.innerHTML = val;
            }
            break;
        case "appid":
            api = val;
            call_function='';
            call_function=weather_function;
            call_function(city, api);
            break;
        case "address":
            city = val;
            call_function='';
            call_function=weather_function;
            call_function(city, api);
            break;
        case "unit":
            if (val == 0) {
                units = "metric";
                _c_f.innerHTML = "C";
                call_function='';
                call_function=weather_function;
                call_function(city, api, units);
            } else {
                units = "Imperial";
                _c_f.innerHTML = "F";
                call_function='';
                call_function=weather_function;
                call_function(city, api, units);
            }
            break;
        case "username":
            _username.style.fontSize = val + "px";
            break;
        case "day":
            _day.style.fontSize = val + "px";
            break;
        case "date":
            _date.style.fontSize = val + "px";
            break;
        case "location":
            _location.style.fontSize = val + "px";
            break;
        case "temp":
            _temp.style.fontSize = val + "px";
            _deg_icon.style.fontSize = val + "px";
            _c_f.style.fontSize = val + "px";
            break;
        case "icon":
            _icon.style.height = val + "px";
            break;
        case "usernameColor":
            _username.style.color = val;
            break;
        case "dayColor":
            _day.style.color = val;
            break;
        case "dateColor":
            _date.style.color = val;
            break;
        case "locationColor":
            _location.style.color = val;
            break;
        case "tempColor":
            _temp.style.color = val;
            _deg_icon.style.color = val;
            _c_f.style.color = val;
            break;
        case "dateShadowColor":
            _date.style.textShadow = "0 10px 10px " + val;
            break;
        case "weather":
            if (val) {
                document.querySelector(".weather-container").style.display = "flex";
            } else {
                document.querySelector(".weather-container").style.display = "none";
            }
            break;
        case "second":
            if (val) {
                sec.style.display = "block";
            } else {
                sec.style.display = "none";
            }
            break;
        case "btnRefresh":
            call_function='';
            call_function=weather_function;
            call_function(city, api, units);
        default:
            break;
    }
}
















// let input_data = fetch("LivelyProperties.json").then(response => response.json());

// setInterval(() => {
//     input_data.then(data => {
//         document.getElementById("username").innerHTML = data.userFontSize.value;
//     });
// }, 1000);

