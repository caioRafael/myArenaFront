export default function convetHourInDate(hour: string, baseDate?: Date): Date {
  const [newHour, minute] = hour.split(':')
  const date = baseDate || new Date()
  date.setHours(parseInt(newHour, 10))
  date.setMinutes(parseInt(minute, 10))

  return date
}
