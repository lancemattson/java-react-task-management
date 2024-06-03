export function formatDate(date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}