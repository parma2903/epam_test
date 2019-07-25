'use strict';

var days = [
  {
    date: new Date,
    temperature: {
      night: 16,
      day: 26,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    date: 1559505600000,
    temperature: {
      night: 19,
      day: 29,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: true,
  },
  {
    date: 1559592000000,
    temperature: {
      night: 12,
      day: 21,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: false,
  },
  {
    date: 1559592000000,
    temperature: {
      night: 12,
      day: 21,
    },
    cloudiness: 'Небольшой дождь',
    snow: false,
    rain: false,
  },
  {
    date: 1559419200000,
    temperature: {
      night: 16,
      day: 26,
    },
    cloudiness: 'Пасмурно с прояснениями',
    snow: false,
    rain: false,
  },
  {
    date: 1559505600000,
    temperature: {
      night: 19,
      day: 29,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: true,
  },
  {
    date: 1559592000000,
    temperature: {
      night: 12,
      day: 21,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    date: 1559592000000,
    temperature: {
      night: 12,
      day: 21,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
];

var template = document.querySelector('#forecast__template').content.querySelector('.forecast__day');
var daysListElement = document.querySelector('.forecast__days');
var daysQuantity = 2;
var fragment = document.createDocumentFragment();
var obj_hours = document.getElementById("wb_data");
var name_month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря");
var day = new Array("Воскресенье", "Понедельник", "Вторник",
  "Среда", "Четверг", "Пятница", "Суббота");

wr_hours();
window.onload = renderDays(days);

function wr_hours() {
  var time = new Date;
  var time_date = time.getDate();
  console.log(time_date);
  var time_wr = ((time_date < 10) ? '0' : '') + time_date;
  var time_wr = time_wr + " " + name_month[time.getMonth()] + " " + time.getFullYear() + " г." + " " + "(" + day[time.getDay()] + ")";
  obj_hours.innerHTML = time_wr;
}

function createSRC(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].cloudiness === 'Облачно') {
      array[i].src = 'img/' + 'cloud' + '.svg'
      
    } else if (array[i].cloudiness === 'Ясно') {
      array[i].src = 'img/' + 'sun' + '.svg'
      
    } else if (array[i].cloudiness === 'Дождь') {
      array[i].src = 'img/' + 'rain' + '.svg'
      
    } else if (array[i].cloudiness === 'Пасмурно с прояснениями') {
      array[i].src = 'img/' + 'sun_and_cloud' + '.svg';

    } else if (array[i].cloudiness === 'Небольшой дождь') {
      array[i].src = 'img/' + 'sun_and_rain' + '.svg';
    }
  }
  return array;
}

function renderDay(newDay) {
  var dayElement = template.cloneNode(true);

  dayElement.querySelector('.forecast__name').textContent = (new Date(newDay.date)).getDate() + ' ' + name_month[new Date(newDay.date).getMonth()];
  dayElement.querySelector('.forecast__date').textContent = day[new Date(newDay.date).getDay()];
  dayElement.querySelector('.forecast__temperature--day').textContent = 'Днём ' + newDay.temperature.day;
  dayElement.querySelector('.forecast__temperature--night').textContent = 'Ночью '+ newDay.temperature.night;
  dayElement.querySelector('.forecast__condition').textContent = newDay.cloudiness;
  dayElement.querySelector('.forecast__img').setAttribute('src', newDay.src);

  return dayElement;
};

function renderDays(days) {
  days = createSRC(days);
  for (var i = 0; i < days.length; i++) {
    fragment.appendChild(renderDay(days[i]));    
  }
  daysListElement.appendChild(fragment);
}
