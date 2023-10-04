export const decimalToDegree = (number: number) => {
    return `${number.toFixed(2)}°C`
}

export const decimalToWatt = (number: number) => {
    return `${number.toFixed(2)} W`
}

export const dateToHour = (date: Date) => {

    return `${date.getUTCHours()}:${date.getUTCMinutes()}`
}
