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