let timeClock = document.querySelector('.time-clock');
let timeDate = document.querySelector('.date-day');
let nowDay = document.querySelector('.date-dayname');


// часы дата
function clock(){
    let monthes = ['Янв', 'Февр', 'Март', 'Апр', 'Майя', 'Июня', 'Июля', 'Авг', 'Сент', 'Окт', 'Ноябр', 'Дек'];
    let day = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let time = new Date();
    let nowMonth = '';
    function checkMonth(arr, a1){
        arr.forEach((item, index)=> {
                if(time.getMonth() == index){
                    a1 = item
                }
            })
            return a1;
        }
    function checkDay(arr, day){
        arr.forEach((item, index)=> {
            if(time.getDay() == index){
                day = item;
            }
        })
        return day;
    }
    function checkHours(){
        if(time.getHours() < 10) {
            return 0;
        } 
        if(time.getHours() >= 10) {
            return '';
        } 
    }    
    function checkMinutes(){
        if(time.getMinutes() < 10) {
            return 0;
        } 
        if(time.getMinutes() >= 10) {
            return '';
        } 
    }

    timeClock.textContent = `${checkHours()}${time.getHours()}:${checkMinutes()}${time.getMinutes()}`;
    timeDate.textContent = `${time.getDate()} ${checkMonth(monthes, nowMonth)}`;
    nowDay.textContent = `${checkDay(day)}`
}
clock()
setInterval(clock, 1000*60)
// часы дата END



let url22 = 'https://api.openweathermap.org/data/2.5/onecall?lat=50.0&lon=36.25&lang=ru&appid=7501295286a1dda1338ea7f343999a0c'
fetch(url22)
.then((response)=> {
    // console.dir(response)
    return response.json();
    
}
).then((data)=> {
    console.log(data)
})