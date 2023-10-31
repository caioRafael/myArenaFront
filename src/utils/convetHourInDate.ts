export default function convetHourInDate(hour: string): Date {
  const [newHour, minute] = hour.split(':')
  const date = new Date()
  date.setHours(parseInt(newHour, 10))
  date.setMinutes(parseInt(minute, 10))

  return date
}
