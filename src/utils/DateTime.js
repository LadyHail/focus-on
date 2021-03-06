﻿// Returns date now in format YYYY-MM-DD
export function getDate() {
    return new Date().toISOString().substring(0, 10);
}

// Calculate diference between date now and expiring date of object.
// Returns object that contains days, hours, minutes, seconds and non formated difference between dates.
export function timeLeft(expiring) {
    expiring = new Date(expiring);
    if (expiring.toString() !== 'Invalid Date') {
        const now = new Date();
        const difference = expiring - now;
        const oneDay = (1000 * 60 * 60 * 24);
        const days = Math.floor(Math.abs(difference / oneDay));
        const hours = Math.floor(Math.abs((difference % oneDay) / 3600000));
        const minutes = Math.floor(Math.abs(((difference % oneDay) % 3600000) / 60000));
        const seconds = Math.floor(Math.abs((((difference % oneDay) % 3600000) % 60000) / 1000));
        const timeleft = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            time: difference
        };
        return timeleft;
    }
    return {'days': null, 'hours': null, 'minutes': null, 'time': null};
}

// Returns date formated to local date.
export function getLocalDate(date) {
    return new Date(date).toLocaleString();
}

// Format date to YYYY-MM-DD
export function getExpDate(date) {
    date = new Date(date);
    if (date.toString() !== 'Invalid Date') {
        const year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        month = month.length === 1 ? '0' + month : month;
        let day = date.getDate().toString();
        day = day.length === 1 ? '0' + day : day;

        return year + '-' + month + '-' + day;
    }
    return null;
}

// Format time to HH:MM
export function getExpTime(date) {
    date = new Date(date);
    if (date.toString() !== 'Invalid Date') {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        hours = hours.length === 1 ? '0' + hours : hours;
        minutes = minutes.length === 1 ? '0' + minutes : minutes;

        return hours + ':' + minutes;
    }
    return null;
}

// Calculate total time spent to complete the object.
// Returns days, hours, minutes, seconds and non formated difference between dates.
export function spentTime(start, finish) {
    start = new Date(start);
    finish = new Date(finish);
    if (start.toString() !== 'Invalid Date' && finish.toString() !== 'Invalid Date') {
        const difference = finish - start;
        const oneDay = (1000 * 60 * 60 * 24);
        const days = Math.floor(Math.abs(difference / oneDay));
        const hours = Math.floor(Math.abs((difference % oneDay) / 3600000));
        const minutes = Math.floor(Math.abs(((difference % oneDay) % 3600000) / 60000));
        const seconds = Math.floor(Math.abs((((difference % oneDay) % 3600000) % 60000) / 1000));
        const result = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            time: difference
        };
        return result;
    }
    return { 'days': null, 'hours': null, 'minutes': null, 'time': null };
}