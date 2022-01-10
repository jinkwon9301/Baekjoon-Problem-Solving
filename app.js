// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
// let input = fs.readFileSync(filePath).toString().trim().split('\n');
// const comNum = +input[0];
// const linkNum = +input[1];
// const links = input.slice(2).map(v => v.split(' ').map(v => +v));

// const sol = (comNum, linkNum, links) => {
//   links.map(link => link.sort((a, b) => a - b));
//   const linked1 = [];
//   const dfs = (num) => {
//     for (let i = 0; i < links.length; i++) {
//       if (links[i][0] === num) {
//         const link = links[i][1];
//         if (linked1.includes(link)) continue;
//         linked1.push(link);
//         dfs(link);
//       }
//     }
//   };

//   dfs(1);
//   console.log(linked1);
//   return linked1.length;
// };

// console.log(sol(comNum, linkNum, links));

