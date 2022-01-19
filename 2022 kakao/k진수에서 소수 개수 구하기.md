# k진수에서 소수 개수 구하기

## 아이디어
level 2 문제 : 소수를 구하면 된다.

## 코드

```js
function solution(n, k) {
  const num = n.toString(k);
  let arr = num.split('0').map(v => +v);
  arr = arr.filter(v => !!v);
  arr = arr.filter(v => checkPrime(v));
  return arr.length;
}

function checkPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (!(n % i)) return false;
  }
  return true;
}

```
