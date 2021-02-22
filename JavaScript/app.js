window.onload = function () {
    if (localStorage.getItem('active')) {
        let icon = document.createElement('i');
        icon.setAttribute('class', 'far fa-clock');
        icon.setAttribute('id', 'clock');
        icon.innerText = ' Alarm is set';
        icon.style.color = 'white';
        document.getElementById('sess').insertAdjacentElement("beforeend", icon);
    }
    setInterval(displayTime, 1000);
};

const setBtn = document.getElementById('set');
const restBtn = document.getElementById('rest-btn');

generateOption(12, 'hours-select');
generateOption(59, 'minutes-select');
generateOption(59, 'seconds-select');

// eventListener for the btns
restBtn.addEventListener('click', deleteAlarm);
setBtn.addEventListener('click', setAlarm);

// fn to delete alarm
function deleteAlarm() {
    localStorage.clear();
    document.getElementById('clock') ? document.getElementById('clock').remove() : '';
}
// fn to set alarm
function setAlarm() {

    let alarmMin = document.getElementById('minutes-select').value;
    let alarmHour = document.getElementById('hours-select').value;
    let alarmSec = document.getElementById('seconds-select').value;

    localStorage.setItem('hour', alarmHour);
    localStorage.setItem('min', alarmMin);
    localStorage.setItem('sec', alarmSec);
    localStorage.setItem('active', true);

    let icon = document.createElement('i');
if(document.getElementById('clock') == null){

    icon.setAttribute('class', 'far fa-clock');
    icon.setAttribute('id', 'clock');
    icon.innerText = ' Alarm is set';
    icon.style.color = 'white';
    
}
    

    document.getElementById('sess').insertAdjacentElement("beforeend", icon);
}

// ***************** generate option elements ********************
function generateOption(num, element_id) {
    const select = document.getElementById(element_id);
    for (x = 0; x <= num; x++) {
        let option = document.createElement('option');
        if (x > 9) {
            option.innerText = x;
            option.value = x
        } else {
            option.innerText = '0' + x;
            option.value = '0' + x;
        }
        select.append(option);
    }
}
// ****************** display alarm ******************
function displayTime() {
    let date = new Date();

    let day = date.getDay();
    let hour = date.getHours();
    let currentDay;
    let min = date.getMinutes();
    let sec = date.getSeconds();

    let session = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12
    hour = hour ? hour : 12;
    currentDay = formatDay(day);

    document.getElementsByClassName('hours')[0].innerText = hour;
    document.getElementsByClassName('minutes')[0].innerText = min;
    document.getElementsByClassName('seconds')[0].innerText = sec;
    document.getElementById('day').innerText = currentDay;
    document.getElementById('session-box').innerText = session;
    min = min < 10 ? "0" + min : min;
    document.getElementsByClassName('minutes')[0].innerText = min;
    hour = hour < 10 ? "0" + hour : hour;
    document.getElementsByClassName('hours')[0].innerText = hour;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementsByClassName('seconds')[0].innerText = sec;
    checkAlarm(date);
}

function checkAlarm(date) {

    console.log('cheking Alarm');
    let min = date.getMinutes();
    let hour = date.getHours();
    hour = hour % 12
    hour = hour ? hour : 12;
    hour = hour < 10 ? "0" + hour : hour;
    let sec = date.getSeconds();
    let times = {
        ...localStorage
    };

    if (times['min'] == min && times['hour'] == hour && times['sec'] == sec) {
        alert('wake up');
        localStorage.clear();
        document.getElementById('clock') ? document.getElementById('clock').remove() : '';
    }
}


// get the days to correct formant
function formatDay(day) {
    switch (day) {
        case 0:
            return currentDay = 'Sun';
            break;
        case 1:
            return currentDay = 'Mon';
            break;
        case 2:
            return currentDay = 'Tue';
            break;
        case 3:
            return currentDay = 'Wed';
            break;
        case 4:
            return currentDay = 'Thu';
            break;
        case 5:
            return currentDay = 'Fri';
            break;
        case 6:
            return currentDay = 'Sat';
            break;
    }
}