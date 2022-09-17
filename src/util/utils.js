export function getDateString(date) {
    let date_string = new Date(date)
    date_string = date_string.getFullYear() + '' + (date_string.getMonth() + 1)
    return date_string
}