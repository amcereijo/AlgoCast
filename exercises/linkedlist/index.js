// --- Directions
// Implement classes Node and Linked Lists
// See 'directions' document

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

function makeIterator(listObject) {
  return function () {
    return {
      value: null,

      next: function() {
        if(!this.value) {
          this.value = listObject.head;
        } else {
          this.value = this.value.next;
        }

        if(!this.value) {
          return {done: true};
        }
        return {value: this.value, done: false};
      }
    };
  };
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;

    this[Symbol.iterator] = makeIterator(this);
  }

  insertFirst(el) {
    this.head = new Node(el, this.head);
    this.length++;
  }

  size() {
    return this.length;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    let current = this.head;
    while(current && current.next) {
      current = current.next;
    }
    return current;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  removeFirst() {
    this.head = this.head.next;
    this.length = (this.length - 1) || 0;
  }

  removeLast(){
    if(this.length === 1) {
      this.head = null;
      this.length = (this.length - 1) || 0;
    } else if(this.length > 1) {
      let current = this.head;
      let before;
      while(current && current.next) {
        before = current;
        current = current.next;
      }
      before.next = null;
      this.length = (this.length - 1) || 0;
    }
  }

  insertLast(el) {
    if(this.head) {
      let current = this.head;
      while(current && current.next) {
        current = current.next;
      }
      current.next = new Node(el);
    } else {
      this.head = new Node(el);
    }

    this.length++;
  }

  getAt(position) {
    if(position < 0 || position >= this.length) {
      return null;
    }

    let current = this.head;
    let cont = 0;
    while(cont < position) {
      current = current.next;
      cont++;
    }
    return current;
  }

  removeAt(position) {
    if(position === 0 && this.head) {
      this.head = this.head.next;
    } else {
      let previous = this.getAt(position-1);

      if(previous && previous.next) {
        let next = previous.next.next;
        previous.next = next;
        this.length = (this.length - 1) || 0;
      }
    }
  }

  insertAt(el, position) {
    if(position === 0) {
      this.insertFirst(el);
    } else if(position > this.length) {
      this.insertLast(el);
    }else {
      let previous = this.getAt(position-1);
      previous.next = new Node(el, previous.next);
      this.length++;
    }
  }

  forEach(func) {
    let current = this.head;
    while(current) {
      func(current);
      current = current.next;
    }
  }

}

// --------------
class NodeSolution {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedListSolution {
  constructor() {
    this.head = null;
  }

  insertFirst(data) {
    this.head = new NodeSolution(data, this.head);
  }

  size() {
    let counter = 0;
    let node = this.head;

    while (node) {
      counter++;
      node = node.next;
    }

    return counter;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) {
      return null;
    }

    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
  }

  clear() {
    this.head = null;
  }

  removeFirst() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
  }

  removeLast() {
    if (!this.head) {
      return;
    }

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let previous = this.head;
    let node = this.head.next;
    while (node.next) {
      previous = node;
      node = node.next;
    }
    previous.next = null;
  }

  insertLast(data) {
    const last = this.getLast();

    if (last) {
      // There are some existing nodes in our chain
      last.next = new NodeSolution(data);
    } else {
      // The chain is empty!
      this.head = new NodeSolution(data);
    }
  }

  getAt(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }

      counter++;
      node = node.next;
    }
    return null;
  }

  removeAt(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    const previous = this.getAt(index - 1);
    if (!previous || !previous.next) {
      return;
    }
    previous.next = previous.next.next;
  }

  insertAt(data, index) {
    if (!this.head) {
      this.head = new NodeSolution(data);
      return;
    }

    if (index === 0) {
      this.head = new NodeSolution(data, this.head);
      return;
    }

    const previous = this.getAt(index - 1) || this.getLast();
    const node = new NodeSolution(data, previous.next);
    previous.next = node;
  }

  forEach(fn) {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }
}

module.exports = { Node, LinkedList };
// module.exports = { Node: NodeSolution, LinkedList: LinkedListSolution };