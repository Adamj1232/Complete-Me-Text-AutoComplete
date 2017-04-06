export default class Node {
  constructor (data = null) {
    this.data = data
    this.children = {}
    this.isWord = 0
    this.wordSelectCount = 0
  }
}
