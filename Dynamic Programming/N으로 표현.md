# N으로 표현

## 아이디어
감도 안잡혀서 블로그 풀이를 봤다.

`dp`는 `memoization`을 사용하는 것이고, N의 숫자를 몇번 사용해서 연산한 결과값들을 set으로 넣도록 설계했다.
```js
if (N === number) {
  return 1;
}

const dp = [];
dp[1] = new Set([N]);

for (let i = 2; i <= 8; i++) {
  dp[i] = getCalculationResults();
  if (dp[i].has(number)) { // 현재 number값을 구했는지 체크 set을 통해 중복값을 제거 하면서 값 체크도 O(1)로 처리 할 수 있다.
    return i;
  }
}

return -1;
```

블로그에 나와 있는 `getCalculationResults` 함수를 만드는 핵심 아이디어는 아래와 같다.
`dp[2]`의 결과는 N의 숫자를 2번 사용할 결과 `set`이다.
`dp[1]` 과 `dp[1]`의 사칙연산 결과 `+, -, *, /` 를 넣어주면 됨.

```js
const dp[2] = new Set();

for (const number1 of dp[1].values()) {
  for (const number2 of dp[1].values()) {
    dp[2].add(number1 + number2);
    dp[2].add(number1 * number2);
    dp[2].add(number1 - number2);
    dp[2].add(number1 / number2);
  }
}
```

이렇게 `dp[2]`를 만들 수 있다.

```js
const dp[3] = new Set();

for (const number1 of dp[1].values()) {
  for (const number2 of dp[2].values()) {
    dp[3].add(number1 + number2);
    dp[3].add(number1 * number2);
    dp[3].add(number1 - number2);
    dp[3].add(number1 / number2);
  }
}

for (const number1 of dp[2].values()) {
  for (const number2 of dp[1].values()) {
    dp[3].add(number1 + number2);
    dp[3].add(number1 * number2);
    dp[3].add(number1 - number2);
    dp[3].add(number1 / number2);
  }
}
```

`dp[3]`는 위와같이 구할 수 있는데..
사칙연산의 앞뒤 순서가 바뀌면 연산 값이 달라질 수 있기 때문에 (`-, /`의 경우에)
`dp[1]` `⚙︎ (사칙연산)` `dp[2]`
`dp[2]` `⚙︎ (사칙연산)` `dp[1]` 2가지 경우 모두 구해준다.

이런 아이디어를 바탕으로 `dp[8]`까지 구해보면 다음과 같다.

```js
dp[1] = [N]
dp[2] = dp[1] ⚙︎ dp[1]
dp[3] = dp[1] ⚙︎ dp[2], dp[2] ⚙︎ dp[1]
dp[4] = dp[1] ⚙︎ dp[3], dp[2] ⚙︎ dp[2], dp[3] ⚙︎ dp[1]
dp[5] = dp[1] ⚙︎ dp[4], dp[2] ⚙︎ dp[3], dp[3] ⚙︎ dp[2], dp[4] ⚙︎ dp[1]
dp[6] = dp[1] ⚙︎ dp[5], dp[2] ⚙︎ dp[4], dp[3] ⚙︎ dp[3], dp[4] ⚙︎ dp[2], dp[5] ⚙︎ do[1]
dp[7] = dp[1] ⚙︎ dp[6], dp[2] ⚙︎ dp[5], dp[3] ⚙︎ dp[4], dp[4] ⚙︎ dp[3], dp[5] ⚙︎ do[2], dp[6] ⚙︎ do[1]
dp[8] = dp[1] ⚙︎ dp[7], dp[2] ⚙︎ dp[6], dp[3] ⚙︎ dp[5], dp[4] ⚙︎ dp[5], dp[5] ⚙︎ do[3], dp[6] ⚙︎ do[2], dp[7] ⚙︎ do[1]
```

여기서 잊어선 안될 부분은 N의 숫자의 반복인 부분인데,
`dp[2]`에는 NN, `dp[3]`에는 NNN, `dp[4]`에는 NNNN과 같이 반복되는 수가 들어가줘야 한다.
코드로 다음과 같은 표현할 수 있고

```js
const nthRepeatNumber = Number(String(N).repeat(nth));
dp[nth].add(nthRepeatNumber);
```

이 nthRepeatNumber수를 dp[nth] set에 추가시켜 주면 됨.
풀이하신 분은 4칙 연산에 대해 하나하나 코드로 표현하기 싫어서 다음과 같이 함수배열을 만들었다.

```js
const calculateFuncs = [(a, b) => a + b, (a, b) => a * b, (a, b) => a - b, (a, b) => a / b];
```

결과를 하나로 표현하면 다음과 같이 `getCalculationResults`가 완성된다...

```js
dp[nth] = new Set();
dp[nth].add(Number(String(N).repeat(nth)));

for (let i = 1; i < nth; i++) {
  for (const calculateFunc of calculateFuncs) {
    for (const item1 of dp[i].values()) {
      for (const item2 of dp[nth - i].values()) {
        const result = calculateFunc(item1, item2);
        dp[nth].add(result);
      }
    }
  }
}
```
아이디어는 비슷하게 떠오르는데 항상 코드로 짜려고 하면 도대체 어디서 어떻게 시작해야 할지 너무 막막할 뿐이다. 그냥 꾸준히 하나씩 풀어보자.

> [[Javascript] 프로그래머스 - N으로 표현 Lv3 (DP) | HaYoung's Log](https://ha-young.github.io/2021/algorithm_javascript/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-N%EC%9C%BC%EB%A1%9C%ED%91%9C%ED%98%84_lv3_dp/)


## 코드

```js
const calculateFuncs = [(a, b) => a + b, (a, b) => a * b, (a, b) => a - b, (a, b) => Math.floor(a / b)];

function getCalculationResults(nth, dp, N) {
  let nthResults = new Set();
  nthResults.add(Number(String(N).repeat(nth)));

  for (let i = 1; i < nth; i++) {
    for (const calculateFunc of calculateFuncs) {
      for (const item1 of dp[i].values()) {
        for (const item2 of dp[nth - i].values()) {
          const result = calculateFunc(item1, item2);
          nthResults.add(result);
        }
      }
    }
  }

  return nthResults;
}

function solution(N, number) {
  if (N === number) {
    return 1;
  }

  const dp = [];
  dp[1] = new Set([N]);

  for (let i = 2; i <= 8; i++) {
    dp[i] = getCalculationResults(i, dp, N);

    if (dp[i].has(number)) {
      return i;
    }
  }

  return -1;
}

```
