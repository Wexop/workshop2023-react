export const decimalToDegree = (number: number) => {
    return `${number.toFixed(2)}°C`
}

export const dateToHour = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes()}`
}
