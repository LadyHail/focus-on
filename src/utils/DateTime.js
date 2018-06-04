export function getDate () {
    return new Date().toISOString().substring(0, 10);
}