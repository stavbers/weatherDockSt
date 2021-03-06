let timeClock = document.querySelector('.time-clock');
let timeDate = document.querySelector('.date-day');
let nowDay = document.querySelector('.date-dayname');
let day = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let daySm = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

// часы дата
function clock() {
    let monthes = ['Янв', 'Февр', 'Март', 'Апр', 'Майя', 'Июня', 'Июля', 'Авг', 'Сент', 'Окт', 'Ноябр', 'Дек'];

    let time = new Date();
    let nowMonth = '';

    function checkMonth(arr, a1) {
        arr.forEach((item, index) => {
            if (time.getMonth() == index) {
                a1 = item
            }
        })
        return a1;
    }

    function checkDay(arr, day) {
        arr.forEach((item, index) => {
            if (time.getDay() == index) {
                day = item;
            }
        })
        return day;
    }

    function checkHours() {
        if (time.getHours() < 10) {
            return 0;
        }
        if (time.getHours() >= 10) {
            return '';
        }
    }

    function checkMinutes() {
        if (time.getMinutes() < 10) {
            return 0;
        }
        if (time.getMinutes() >= 10) {
            return '';
        }
    }

    timeClock.textContent = `${checkHours()}${time.getHours()}:${checkMinutes()}${time.getMinutes()}`;
    timeDate.textContent = `${time.getDate()} ${checkMonth(monthes, nowMonth)}`;
    nowDay.textContent = `${checkDay(day)}`
}
clock()
setInterval(clock, 1000 * 60)
// часы дата END


let apiKey = '7501295286a1dda1338ea7f343999a0c'

let bigTemp = document.querySelector('.weather-temp');
let bigTempIcon = document.querySelector('.weather-container > span');
let pressure = document.querySelector('.pressure > span');
let humidity = document.querySelector('.humidity > span');
let windSpeed = document.querySelector('.wind-speed > span');
let wind = document.querySelector('.wind > span');
let sunrise = document.querySelector('.sunrise > span');
let sunset = document.querySelector('.sunset > span');
let weekDays = document.querySelectorAll('.week-day');
let indx;
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=50.0&lon=36.25&lang=ru&appid=${apiKey}`
fetch(url)
    .then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        getAllIcons(data);
        getAllDays(data);
        getAllTemp(data)
        currentWeather(data);

    });

function getData(data) {
    let out = '';
    let d = new Date(data * 1e3);
    out = d.getHours() + ' : ' + d.getMinutes();
    return out;
    // console.log(d.getDay() + '/' + d.getHours() + ' ' + d.getMinutes())
}

function getDay(data) {
    let d = new Date(data * 1e3);
    let out = '';
    daySm.forEach((item, index) => {
        if (d.getDay() == index) out = item;
    })
    return out;
}

function getAllIcons(data) {

}

function getAllDays(data) {
    weekDays[0].children[1].innerHTML = getDay(data.current.dt);
    weekDays[1].children[1].innerHTML = getDay(data.daily[1].dt);
    weekDays[2].children[1].innerHTML = getDay(data.daily[2].dt);
    weekDays[3].children[1].innerHTML = getDay(data.daily[3].dt);
}

function getAllTemp(data) {
    weekDays[0].children[2].innerHTML = (data.daily[0].temp.day - 273).toFixed(1) + '&deg;' + 'C';
    weekDays[1].children[2].innerHTML = (data.daily[1].temp.day - 273).toFixed(1) + '&deg;' + 'C';
    weekDays[2].children[2].innerHTML = (data.daily[2].temp.day - 273).toFixed(1) + '&deg;' + 'C';
    weekDays[3].children[2].innerHTML = (data.daily[3].temp.day - 273).toFixed(1) + '&deg;' + 'C';
}


function currentWeather(data) {
    bigTemp.innerHTML = (data.current.temp - 273).toFixed(1) + '&deg;' + 'C';
    humidity.textContent = data.current.humidity + ' %';
    pressure.textContent = (data.current.pressure * 0.75006375541921).toFixed() + ' мм';
    windSpeed.textContent = data.daily[0].wind_speed + ' м/с';
    wind.textContent = data.daily[0].wind_gust + ' м/с';
    sunrise.textContent = getData(data.current.sunrise);
    sunset.textContent = getData(data.current.sunset);
}

function selectWetherDay(event) {
    weekDays.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    weekDays.forEach((item, index) => {
        if (item == this) {
            indx = index;
        }
    });  
    dayWeather();
}

function dayWeather(){
    fetch(url)
    .then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        outDayWeather(data.daily);
    });
}

function outDayWeather(data){
    bigTemp.innerHTML = (data[indx].temp.max - 273).toFixed(1) + '&deg;' + 'C';
    humidity.textContent = data[indx].humidity + ' %';
    pressure.textContent = (data[indx].pressure * 0.75006375541921).toFixed() + ' мм';
    windSpeed.textContent = data[indx].wind_speed + ' м/с';
    wind.textContent = data[indx].wind_gust + ' м/с';
    sunrise.textContent = getData(data[indx].sunrise);
    sunset.textContent = getData(data[indx].sunset);
}

weekDays.forEach((item) => {
    item.addEventListener('click', selectWetherDay)
})


function convertData(data) {
    let t = parseInt(data);
    let days = parseInt(t / 86400);
    t = t - (days * 86400);
    let hours = parseInt(t / 3600);
    t = t - (hours * 3600);
    let minutes = parseInt(t / 60);
    t = t - (minutes * 60);
}