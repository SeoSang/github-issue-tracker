import type { IssueInfo } from '../type'
import { MAX_RECENT_ISSUES_COUNT } from '../type/constant'

export class IssueStack {
  private _arr: IssueInfo[] = []
  private max: number = MAX_RECENT_ISSUES_COUNT

  constructor(arr: IssueInfo[], maxCount: number) {
    this._arr = arr || []
    this.max = maxCount
  }

  push(item: IssueInfo) {
    let targetIndex = -1
    const prevArr = this._arr
    prevArr.forEach((issueInfo, index) => {
      if (issueInfo.id === item.id) {
        targetIndex = index
      }
    })
    if (targetIndex !== -1) {
      item.historyType = this._arr[targetIndex].historyType
      this._arr = [...prevArr.slice(0, targetIndex), ...prevArr.slice(targetIndex + 1)]
      this._arr.push(item)
      return
    }
    this._arr.push(item)
    if (this._arr.length >= this.max) {
      this._arr = this._arr.slice(this._arr.length - this.max, this._arr.length)
    }
  }

  pop() {
    return this._arr.pop()
  }

  peek() {
    return this._arr[this._arr.length - 1]
  }

  toArray() {
    return this._arr
  }
}
