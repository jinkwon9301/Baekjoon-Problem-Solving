const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const paper = input.slice(1).map(v => v.split(''));
const paper2 = input.slice(1).map(v => v.split(''));

const sol = (N, paper, paper2) => {
  const answer = [];
  let count = 0;
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const checkRange = (y, x) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
  };

  const DFS = (y, x, color, paper) => {
    if (checkRange(y, x) && paper[y][x] === color) {
      paper[y][x] = 0;
      for (let i = 0; i < 4; i++) {
        DFS(y + dy[i], x + dx[i], color, paper);
      }
    }
  };

  const countDivide = (paper, N) => {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (!!paper[y][x]) {
          DFS(y, x, paper[y][x], paper);
          count++;
        }
      }
    }
  };

  // 정상인의 경우
  countDivide(paper, N);
  answer.push(count);
  count = 0;

  // 적록색약의 경우
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (paper2[y][x] === `G`) paper2[y][x] = `R`;
    }
  }
  countDivide(paper2, N);

  answer.push(count);
  return answer.join(' ');
};

console.log(sol(N, paper, paper2));