const data = [{
  id: 1,
  name: "category1",
  parent_id: null
}, {
  id: 2,
  name: "category2",
  parent_id: null
}, {
  id: 3,
  name: "category3",
  parent_id: null
}, {
  id: 4,
  name: "category1_1",
  parent_id: 1
}, {
  id: 5,
  name: "category1_2",
  parent_id: 1
}, {
  id: 6,
  name: "category3_1",
  parent_id: 3
}, {
  id: 7,
  name: "category1_2_1",
  parent_id: 5
}];

class MyGrahp {
  constructor() {
    this.nodes = 0;
    this.adjacentList = {};
  }

  /**
   * Add node
   */
  addVertex(node) {
    this.adjacentList[node] = [];
    this.nodes += 1;
  }

  addEdge(node1, node2) {
    this.adjacentList[node1].push(node2);
    this.adjacentList[node2].push(node1);
  }

  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    let currentVertex;

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjacentList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  dfsIterative(start) {
    const result = [];
    const stack = [start];
    const visited = {};

    visited[start] = true;

    while (stack.length) {
      const currentVertex = stack.pop();
      result.push(currentVertex);

      this.adjacentList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  dfsRecursive(start, result = [], visited = {}) {
    if (!start) {
      return null;
    }

    visited[start] = true;
    result.push(start);

    this.adjacentList[start].forEach(neighbor => {
      if (!visited[neighbor]) {
        return this.dfsRecursive(neighbor, result, visited);
      }
    });

    return result;
  }
}

// ****  Run ***
const grahp = new MyGrahp();

// fill graph with data
data.forEach((d) => {
  grahp.addVertex(d.id);
});
data.forEach((d) => {
  if (d.parent_id) {
    grahp.addEdge(d.parent_id, d.id);
  }
});

// Print Breadth First Search
console.log('bfs:', grahp.bfs(data[0].id));

// Print Depth First Search
console.log('dfsRecursive:', grahp.dfsRecursive(data[0].id));
console.log('dfsIterative:', grahp.dfsIterative(data[0].id));

