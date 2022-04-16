
class MyStack {
  constructor() {
    this.values = [];
    this.minValues = [];
    this.minValue = null;
  }

  _maybeSaveMin(value) {
    if (!this.minValue) {
      this.minValue = value;
    } else if (value < this.minValue) {
      this.minValues.push(this.minValue);
      this.minValue = value;
    }
  }

  push(value) {
    this.values.push(value);
    this._maybeSaveMin(value);
  }

  _maybeResetMin(value) {
    if (this.minValue === value) {
      if (this.minValues.length < 1) {
        this.minValue = null;
      } else {
        this.minValue = this.minValues.pop();
      }
    }
  }

  pop() {
    const lastValue = this.values.pop();
    this._maybeResetMin(lastValue);
    return lastValue;
  }

  peek() {
    if (!this.values.length) {
      return null;
    }
    return this.values[this.values.length - 1];
  }

  min() {
    return this.minValue;
  }
}

const mStack = new MyStack();
mStack.push(5);
mStack.push(3);
mStack.push(6);
mStack.push(1);
mStack.push(2);

console.error('values', mStack.minValues);

console.log('peek:', mStack.peek());
console.log('min:', mStack.min());
console.log('pop:', mStack.pop());
console.error('values', mStack.minValues);
console.log('min:', mStack.min());

console.log('peek:', mStack.peek());
console.log('pop:', mStack.pop());
console.error('values', mStack.minValues);
console.log('min:', mStack.min());

console.log('peek:', mStack.peek());
console.log('pop:', mStack.pop());
console.error('values', mStack.minValues);
console.log('min:', mStack.min());

console.log('peek:', mStack.peek());
console.log('pop:', mStack.pop());
console.error('values', mStack.minValues);
console.log('min:', mStack.min());


console.log('peek:', mStack.peek());
console.log('pop:', mStack.pop());
console.error('values', mStack.minValues);
console.log('min:', mStack.min());

console.log('peek:', mStack.peek());
console.log('pop:', mStack.pop());
console.error('values', mStack.minValues);
console.log('min:', mStack.min());

console.log('peek:', mStack.peek());
mStack.push(2);
console.log('min:', mStack.min());

console.log('peek:', mStack.peek());
mStack.push(4);
console.log('min:', mStack.min());

console.log('peek:', mStack.peek());
mStack.push(-3);
console.log('min:', mStack.min());

console.log('peek:', mStack.peek());
mStack.push(2);
console.log('min:', mStack.min());

console.log('pop:', mStack.pop());
console.error('values', mStack.minValues);
console.log('min:', mStack.min());
