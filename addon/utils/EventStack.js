export default class ErrorStack {
  constructor(maxSize) {
    if (isNaN(maxSize)) {
      maxSize = 10;
    }
    this.maxSize = maxSize;
    this.container = [];
  }

  get array() {
    return this.container.reverse()
  }

  isEmpty() {
    return this.container.length === 0;
  }

  isFull() {
    return this.container.length >= this.maxSize;
  }

  push(element) {
    if (this.isFull()) {
      this.container.shift()
    }
    this.container.push(element)
  }

  pop() {
    if (this.isEmpty()) {
      return
    }
    this.container.pop()
  }

  clear() {
    this.container = [];
  }
}
