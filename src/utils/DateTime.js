export function getDate () {
    return new Date().toISOString().substring(0, 10);
}

export function timeLeft(expiring) {
    const now = new Date();
    const difference = expiring - now;
    const oneDay = (1000 * 60 * 60 * 24);
    const days = Math.floor(difference / oneDay);
    const hours = Math.floor((difference % oneDay) / 3600000);
    const minutes = Math.round(((difference % oneDay) % 3600000) / 60000);
    const timeleft = {
        days: days,
        hours: hours,
        minutes: minutes
    };
    return timeleft;
}

export function getLocalDate(date) {
    return new Date(date).toLocaleString();
}

export function getExpDate(date) {
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    month = month.length === 1 ? '0' + month : month;
    let day = date.getDate().toString();
    day = day.length === 1 ? '0' + day : day;

    return year + '-' + month + '-' + day;
}

export function getExpTime(date) {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    hours = hours.length === 1 ? '0' + hours : hours;
    minutes = minutes.length === 1 ? '0' + minutes : minutes;

    return hours + ':' + minutes;
}