export function convertHourInNumber(hour: string): number | null {
  const [hours, minutes] = hour.split(':').map(Number)

  if (
    !isNaN(hours) &&
    !isNaN(minutes) &&
    hours >= 0 &&
    hours < 24 &&
    minutes >= 0 &&
    minutes < 60
  ) {
    return hours + minutes / 60
  }
  return null
}

export function convertNumberInHour(number: number | null): string {
  if (number !== null && number >= 0 && number <= 24) {
    const hours = Math.floor(number)
    const minutes = Math.round((number - hours) * 60)
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`
    return formattedTime
  }
  return ''
}
