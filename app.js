const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);

// 노드간의 연결여부를 표현하는 그래프를 만든다.
let graph = [];
for (let i = 0; i < n; i++) {
  graph[i] = [];
}
// 노드의 방문여부 배열을 만든다.
let visited = new Array(n).fill(false);

// 그래프를 완성한다.
input.slice(1).forEach((v, i) => {
  const [from, to] = v.split(' ').map(Number);
  graph[from - 1].push(to);
  graph[to - 1].push(from);
});

function DFS(start) {
  visited[start] = true;
  for (let i = 0; i < graph[start].length; i++) {
    let next = graph[start][i] - 1;
    if (!visited[next]) DFS(next);
  }
}

let count = 0;
for (let i = 0; i < n; i++) {
  if (!visited[i]) {
    DFS(i);
    count++;
  }
}
console.log(count);
