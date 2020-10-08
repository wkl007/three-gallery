import moment, { MomentInput, unitOfTime } from 'moment'
import 'moment/locale/zh-cn'
import numeral from 'numeral'

moment.locale('zh-cn')

/**
 * 判断url
 * @param path
 */
export function isUrl (path: string): boolean {
  /* eslint no-useless-escape:0 */
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * 判断外部url
 * @param path
 */
export function isExternalUrl (path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 冒泡排序
 * @param arr
 * @param fn 升序(a, b) => a - b) 降序 (a, b) => b - a)
 */
export function bubbleSort (arr: Array<number>, fn: (a: number, b: number) => number): Array<number> {
  let length: number = arr.length
  while (length--) {
    for (let i = 0; i < length; i++) {
      if (fn(arr[i], arr[i + 1]) > 0) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }
  return arr
}

/**
 * 格式化时间
 * @param date
 * @param format
 */
export function dateFormat (date: MomentInput, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return moment(date).format(format)
}

/**
 * 获取两个时间之差，默认毫秒
 * @param date1
 * @param date2
 * @param unitOfTime
 */
export function dateDiff (date1: MomentInput, date2: MomentInput, unitOfTime: unitOfTime.Diff = 'millisecond'): number {
  return moment(date1).diff(date2, unitOfTime)
}

/**
 * 格式化数字
 * @param number
 * @param format
 */
export function numberFormat (number: number, format = '0,00.00'): string {
  return numeral(number).format(format)
}
