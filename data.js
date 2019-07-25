obj_hours = document.getElementById("wb_data");
name_month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря");

day = new Array("(Воскресенье)", "(Понедельник)", "(Вторник)",
    "(Среда)", "(Четверг)", "(Пятница)", "(Суббота)");

function wr_hours() {
    time = new Date;
    time_date = time.getDate();
    time_wr = ((time_date < 10) ? '0' : '') + time_date;
    time_wr = time_wr + " " + name_month[time.getMonth()] + " " + time.getFullYear() + " г." + " " + day[time.getDay()];
    obj_hours.innerHTML = time_wr;
}

wr_hours();
setInterval("wr_hours();", 1000);