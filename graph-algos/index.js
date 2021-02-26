const container = document.querySelector(".container");

const ROWS = 18;
const COLUMNS = 23;

class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) return "underflow";
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length == 0;
  }

  size() {
    return this.items.length;
  }
}

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLUMNS; j++) {
    let squareEl = document.createElement("div");
    squareEl.classList.add(`square`);
    squareEl.classList.add(`i${i}`);
    squareEl.classList.add(`j${j}`);
    container.appendChild(squareEl);
  }
}

let vis = Array(ROWS)
  .fill()
  .map(() => Array(COLUMNS).fill(false));

async function bfs() {
  let source = [12, 9];
  vis[12][9] = true;
  var queue = new Queue();
  queue.enqueue(source);

  while (!queue.isEmpty()) {
    let s = queue.size();
    while (s--) {
      let top = queue.dequeue();
      [i, j] = [top[0], top[1]];
      let element = document.querySelector(`.square.i${top[0]}.j${top[1]}`);
      element.classList.add("animate-square");
      //   setTimeout(() => element.classList.remove("animate-square"), 10000);
      if (legal(i - 1, j)) {
        queue.enqueue([i - 1, j]);
        vis[i - 1][j] = true;
      }
      if (legal(i + 1, j)) {
        queue.enqueue([i + 1, j]);
        vis[i + 1][j] = true;
      }
      if (legal(i, j + 1)) {
        queue.enqueue([i, j + 1]);
        vis[i][j + 1] = true;
      }
      if (legal(i, j - 1)) {
        queue.enqueue([i, j - 1]);
        vis[i][j - 1] = true;
      }
    }
    await timer(500);
  }
}

function legal(x, y) {
  if (x < 0 || x >= ROWS || y < 0 || y >= COLUMNS || vis[x][y]) return false;
  return true;
}

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
bfs();
