const makeDoubleDigitString = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`
}

export const toDateSummaryString = (date: Date) => {
  return (
    makeDoubleDigitString(date.getMonth() + 1) +
    '.' +
    makeDoubleDigitString(date.getDate()) +
    ' ' +
    makeDoubleDigitString(date.getHours()) +
    ':' +
    makeDoubleDigitString(date.getMinutes()) +
    ':' +
    makeDoubleDigitString(date.getSeconds())
  )
}
