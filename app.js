const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = input[0];
const town = input.slice(1).map(v => v.split('').map(v => +v));

function solution(N, town) {
  let home = 0;
  let count = [];
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (town[y][x] === 1) { // 만약 방문하지 않았다면
        DFS(y,x);
        count.push(home);
        home = 0;
      }
    }
  }

  function DFS(y, x) {
    if (checkRange(y, x) && town[y][x] === 1) { // 범위를 만족하고 방문하지 않았다면
      town[y][x] = 0; // 방문한 것으로 하고
      home += 1;
      for (let i = 0; i < 4; i++) {
        DFS(y + dy[i], x + dx[i]);
      }
    }
  }

  function checkRange(y, x) {
    if (x >= 0 && x < N && y >= 0 && y < N) return true;
    else return false;
  }
  count.sort((a, b) => a - b);
  count.unshift(count.length);
  count = count.join('\n');
  return count;
}

console.log(solution(N, town));