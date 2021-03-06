`DFS`, `BFS`에 대해 알기 위해서는 먼저 `그래프`라는 `자료구조`에 대해 알아야 한다.

## Graph (그래프)
그래프의 가장 기본적인 정의는 `정점(vertex)`과 `간선(edge)`의 집합이다. <br />
`간선`은 두 정점을 이어주는 역할을 하며, 자기자신을 이을 수도 있고, 간선에 방향이 있기도 하고 없기도 하며, <br />
가중치가 있기도 하고 없기도 하는 등 아주 다양한 형태의 그래프가 있다. <br />

<img src="./image/graph 1.png" width="500">

가장 간단한 형태의 그래프이다. <br />

정점의 집합을 보통 대문자 V로 표현한다. 여기서는 V = {1, 2, 3, 4, 5, 6}이다. <br />
간선의 집합을 보통 대문자 E로 표현한다. 간선은 양 끝점의 정점 쌍으로 표현한다. <br />
여기서는 E = {(1, 2), (1, 5), (2, 3), (2, 5), (3, 4), (4, 5), (4, 6)}이다. <br />

V와 E는 집합이므로 그 크기 또한 집합에 절댓값 기호를 씌워서 표현할 수 있다. <br />
여기서는 |V| = 6, |E| = 7 이다. <br />

또한 각 정점마다 차수(degree)가 존재하는데 이는 그 정점과 이어진 간선의 개수를 말한다. <br />
1번 정점의 차수는 2, 5번 정점의 차수는 3... 이런 식이다. <br />

정점은 노드(node)라고도 흔히들 부른다. <br />
그래프의 종류는 간선의 형태에 따라서 이분할 수 있으며 그 형태도 다양하다. <br />

<img src="./image/graph 2.png" width="500">

가장 먼저, `무방향 그래프(undirected graph)`와 `방향 그래프(directed graph)`로 나눌 수 있다. <br />
전자는 간선의 방향이 없는 것을 의미하며 후자는 간선의 방향이 있는 것을 의미한다. <br />
간선의 방향이 없다는 것은 어느 방향으로든 이동할 수 있다는 것이고, 방향이 있다는 것은 화살표 방향으로만 이동할 수 있다는 의미를 강하게 가진다. <br />

위의 경우가 무방향 그래프이며, 여기서는 A, B, C, D, E 정점이 모두 이어져 있고 무방향 그래프이므로 어느 정점에서든 다른 어떤 정점으로도 이동 가능하지만, <br />
아래의 경우는 방향 그래프이므로 3번 정점에서 9번 정점으로는 갈 수 있지만 11번 정점에서 7번 정점으로는 갈 수 없다. <br />

무방향 그래프를 예로 들어, `인접한다(adjacent)`는 표현이 있는데 <br />
이는 정점 A에서 간선 하나를 거쳐서 정점 B로 이동할 수 있을 때 A와 B가 인접하다는 뜻이다. 두 정점이 간선으로 이어져 있을 때를 이야기한다. <br />
방향 그래프에서도 이런 표현이 가능하기는 하다. <br />
다만 무방향 그래프에서는 A, B가 인접하면 B, A 또한 인접했지만 방향 그래프에서는 한쪽으로만 성립할 수가 있다. <br />

방향 그래프에서도 물론 양방향을 가지는 간선이 존재할 수 있는데 이때는 그 간선을 양쪽 방향으로 나누어서 2개의 간선으로 표현한다. <br />
방향 그래프는 차수를 양분할 수 있는데 `indegree`는 들어오는 간선의 수, `outdegree`는 나가는 간선의 수이다. <br />
또한 방향 그래프에서 많이 사용되는 개념 중 `싸이클(cycle)`이라는 것이 있는데, 간선을 따라가다 보니 시작한 정점으로 돌아오는 경로를 말한다. <br />
위 그림에서는 없지만, 1->2->3->1 같은 식으로 시작점인 1번 정점으로 돌아올 수 있는 경로가 있을 때가 있는데 그게 싸이클이다. <br />

<img src="./image/graph 3.png" width="500">

`가중치 그래프(weighted graph)`는 간선들에 가중치가 있다. <br />

이는 `비용(weight)`일 수도 있고, 두 정점 사이의 `거리(distance)`를 의미하기도 하며, 때로는 한번에 이동 가능한 최대 양인 `대역폭(bandwitch)`을 의미하기도 한다. <br />

방향성을 가지면서 가중치 그래프일 수도 있다. <br />

<img src="./image/graph 4.png" width="500">

`멀티그래프(multigraph)`는 똑같은 정점 쌍 (A, B) 사이에 간선이 여러 개일 수 있다. <br />
중복되는 간선들이 빨간색으로 표시되어 있다. <br />

정점의 입장에서 반대쪽 정점이 같은 간선이 여러 개일 수 있다는 소리이고, 이 때문에 자기 자신으로 돌아오는 (A, A) 같은 간선도 존재하며 이는 파란색으로 표시되어 있다. <br />

이제 그래프의 개념을 알았으니 그래프 순회를 해보자. <br />

그래프의 모든 정점을 한 번씩만 방문해보는 것이다. <br />

`DFS`의 경우는 `깊이우선탐색` 이라는 이름에 걸맞게 한 우물만 깊게 파다가 막히면 그제서야 돌아가서 다른 우물을 파는 성향이 있고, 이는 정반대 성질을 갖는 `BFS(넓이우선탐색)`를 같이 배우면 더 확연하게 차이점이 드러난다. <br />

<br />
<br />

---

## DFS (Depth-First Search : 깊이우선탐색)

<img src="./image/DFS 1.png" width="500">

DFS는 이런 방식으로 이루어진다. 먼저 정점 하나를 선택한다. <br />
그리고 그 정점의 아직 방문하지 않은 인접한 정점 중 하나를 선택해 방문한다. <br />
여기서 중요한 점은 한 우물만 파야 하기 때문에, A가 인접한 B를 방문하면 그 다음번에는 A에 인접한 다른 정점들보다 B에 인접한 정점들이 우선적으로 방문된다. <br />
사실 이게 말로 하자니까 정말 어려운데 그림으로 알아보자. <br />
일단 시작은 0번 정점에서 할 것이고, 인접한 정점이 여러 개면 그 중 번호가 제일 작은 것부터 방문할 것이다. <br />

<span style="color: red;">빨간색</span>이 지금 막 방문한 노드이고 <span style="color: green;">녹색</span>은 이전에 방문한 노드, <span style="color: blue;">파란색</span>은 아직 방문하지 않은 노드이다. <br />

<img src="./image/DFS 2.png" width="500">

일단 맨 처음 방문한 0번 노드의 인접한 노드는 1, 2번이다. <br />
이 중에서 더 작은 번호의 1번 노드를 방문했다. <br />
이제 우리는 그 다음에 2번 노드를 방문하는 것이 아니라, 여기서 주체가 바뀌어 1번 노드의 인접한 정점인 0, 3, 5번 노드 중 하나를 방문할 것이다. <br />
그런데 0번은 이미 방문했으니까 3, 5번 중 하나를 다음에 방문하는 것이다. <br />

<img src="./image/DFS 3.png" width="500">

더 작은 번호의 3번을 방문했다. 다음에는 선택지가 하나밖에 없다. 4번 노드. <br />

<img src="./image/DFS 4.png" width="500">

역시 5번 노드 하나밖에는 선택지가 없다. <br />

<img src="./image/DFS 5.png" width="500">

<strong>여기서 중요하다.</strong> 5번 노드에서 더 이상 방문할 인접한 노드가 없다. 다 이미 방문했기 때문. <br />

이때는 5번에서 추가로 다른 노드를 방문하지 않고, 자기를 불렀던 4번 노드로 돌아가서 4번 노드의 인접한 노드들 중 아직 방문하지 않은 정점을 찾아 방문해야 한다. <br />
4번에서도 그게 없다면, 4번을 불렀던 3번으로 돌아가고... 이런 식. <br />
여기서는 일단 줄줄이 돌아가서 0번 노드까지 돌아가게 된다. 앞으로 더 자세히 살펴보자. <br />

<img src="./image/DFS 6.png" width="500">

어쨌든 0번 노드의 인접한 정점 중 아직 방문하지 않은 나머지 정점, 2번 정점을 방문한다. <br />

<img src="./image/DFS 7.png" width="500">

2번 정점은 마찬가지로 6번 정점을! 부른다. <br />

<img src="./image/DFS 8.png" width="500">

6번 정점은 7번 정점을 이어서 방문시킨다. <br />
여기서, 또 7번 노드에서 더 이상 방문할 곳이 없다. <br />
이제 6번 노드로 돌아가서, 6번 노드의 인접한 다른 정점인 8번을 방문하는 것이다. <br />

<img src="./image/DFS 9.png" width="500">

8번 정점을 방문하고 나면 아무리 돌아가도 더 이상 남은 방문할 정점이 없다. <br />
이러면 탐색이 종료된 것이고, <br />
시작점인 0번 노드와 직/간접적으로 연결되어 있는 모든 노드를 탐색한 것이다. <br />

여기서 눈여겨봐야 할 점은, <br />
만약 어떤 정점에서 더 방문할 노드가 없다면 자신을 불렀던 정점으로 돌아간다. <br />
이걸 어떻게 구현할까? <br />

이건 바로, <br />
방문하는 순서대로 정점을 `스택`에 쌓고, 방문이 끝나면 `스택`에서 `pop`하는 형태로 구현이 가능하다! <br />
그리고 `재귀 함수` 또한 스택 메모리 공간에 쌓아올려지는 구조를 띄므로, <br />
재귀 함수를 사용하여도 이것을 구현할 수 있다. <br />

<br />
<br />

#### ❓그럼 절대 안 이어져 있는 정점은 DFS로 방문할 수 없을까?
정답부터 말하자면, 맞다. <br />

그래프 용어 중 또 하나, `연결 요소(component)`라는 게 있으며 `컴포넌트`라고 읽는다. <br />
컴포넌트 하나 안에 속한 정점은 서로 모두 이어져 있으며, 다른 컴포넌트끼리는 이어져 있지 않다. <br />
또한 컴포넌트는 항상 최대의 크기여야 한다. <br />

<img src="./image/DFS 10.png" width="500">

그냥 그림을 보면 바로 와 닿을 것. 같은 색의 정점들끼리 하나의 `컴포넌트`를 이룬다. <br />
`연결 그래프 (connected graph)`는 그래프의 컴포넌트가 단 하나인 경우이다. <br />
즉 모든 정점들이 연결되어 있는 경우를 말한다.. <br />

DFS를 한 번 하면 다 끝나더라도 시작점이 속한 컴포넌트의 정점들만 다 방문하고, 나머지는 절대 방문하지 못한다. <br />
따라서 모든 정점을 방문하려면 각 컴포넌트에 속한 정점들 중 하나씩은 방문 시도를 해 줘야 하고, <br />
이를 구현하는 가장 쉬운 방법은 반복문을 돌면서 방문하지 않은 정점을 볼 때마다 DFS를 시작해 주는 것이다. <br />
또한, <strong style="color: red;">이때 방문을 시도하는 횟수가 컴포넌트의 개수가 된다.</strong> <br />

<br />
<br />

자, 그럼 한 가지 중요한 사실을 살펴보자. `DFS의 시간복잡도`는? <br />

정답부터 말하자면 `O(V+E)`이다. 편의상 절댓값 기호는 생략했다. 정점과 간선의 개수 합이다. <br />
이는 한 번 방문한 정점은 다시 방문하지 않으며, <br />
한 정점에서 다음으로 방문할 노드들을 순회하는 횟수가 그 정점의 차수와 같기 때문. <br />
앞쪽 부분이 `O(V)`, 뒤쪽 부분이 `O(E)`를 형성하게 된다. 합쳐서 `O(V+E)`. <br />
만약 `인접 리스트`가 없고 `인접행렬`만 있다면(i행 j열이 1이면 정점 i, j가 연결되어 있단 뜻)? <br />
다음에 방문할 정점을 찾을 때 모든 정점을 순회하며 둘이 이어져 있는지를 체크해야 하므로 `O(V^2)`이다. <br />
경우에 따라 압도적인 시간 차이가 난다. <br />

DFS는 이 정도로 끝이 아니다. 앞으로 다양한 테크닉의 기본 도구로 사용되며, 사실 정말 어려운 기술이다. <br />

<br />
<br />

---
## BFS (Breadth-First Search : 넓이우선탐색)

BFS는 너비 우선 탐색(breadth-first search)의 약자고, <br />
역시 컴포넌트의 모든 정점을 한 번씩 순회하는 용도이다. <br />
DFS와 대립되는 성질을 갖고 있으며, 사용되는 곳도 매우 다르다. <br />
그러나 DFS와 겹치는 용도가 있는데, <br />
BFS 역시 컴포넌트의 개수를 세거나 각 컴포넌트의 크기를 구하는 데는 사용 가능하다. <br />

DFS가 깊이를 중시했던 것에 반해 BFS는 넓이를 중시한다. <br />
DFS는 한 우물만 계속 파다가 끝을 보고 나서야 다른 곳으로 옮기는 데 반해, <br />
BFS는 모든 곳을 똑같이 조금씩 조금씩 판다. <br />

<img src="./image/BFS 1.png" width="500">

DFS 때와 같은 예제 그래프를 보자. <br />
맨 처음에 0번 정점부터 방문을 시작했을 때, 그 다음 단계에는 <br />

<img src="./image/BFS 2.png" width="500">

DFS에서와는 다르게, <strong>0번 정점과 인접한 정점들부터 무조건 먼저 다 방문된다.</strong> <br />

<img src="./image/BFS 3.png" width="500">

그 다음은 바로 전 단계에서 방문한 1, 2번 정점들로부터 인접한 3, 5, 6, 8번 정점들이 반드시 먼저 방문된다. <br />

<img src="./image/BFS 4.png" width="500">

마지막으로 4, 7번 정점이 방문된다. <br />
각 단계의 정점들은 그 안에서 방문 순서가 바뀔 수는 있지만, 다른 단계와는 방문 순서가 절대 뒤섞이지 않는다. <br />
여기서 0번 노드, 즉 시작점을 방문한 것을 0단계라 하고 그 다음부터 1, 2, 3단계라고 부를 때, <br />
k단계에 방문하는 정점들은 시작점으로부터 최단거리가 k이다. <br />

최단거리라 함은, <br />
여기서는 가중치도 없으니까 A와 B의 최단거리는 A에서 B로 이동하는 데 필요한 최소 개수의 간선이라고 보면 되겠다. <br />

<img src="./image/BFS 5.png" width="500">

가운데부터 BFS를 시작했다고 할 때, 색이 얕아지는 쪽으로 퍼져가면서 탐색을 하는 모양새가 되겠다. <br />
이게 마치 물방울이 물 표면에 튀겼을 때 파장이 이는 모양과 유사하다. <br />

<br />
<br />

> 출처 : <br />
[깊이 우선 탐색(Depth-First Search) (수정 2019-08-18) : 네이버 블로그](https://blog.naver.com/PostView.naver?blogId=kks227&logNo=220785731077&categoryNo=299&parentCategoryNo=0&viewDate=&currentPage=2&postListTopCurrentPage=1&from=postList&userTopListOpen=true&userTopListCount=30&userTopListManageOpen=false&userTopListCurrentPage=2)<br />
[너비 우선 탐색(Breadth-First Search) (수정 2018-11-22) : 네이버 블로그](https://blog.naver.com/PostView.naver?blogId=kks227&logNo=220785747864&categoryNo=299&parentCategoryNo=0&viewDate=&currentPage=2&postListTopCurrentPage=1&from=postList&userTopListOpen=true&userTopListCount=30&userTopListManageOpen=false&userTopListCurrentPage=2)<br />

---
## BFS와 DFS란?
대표적인 `그래프 탐색` 알고리즘

`너비 우선 탐색(Breadth First Search)`: 정점들과 같은 레벨에 있는 노드들(형제 노드들)을 먼저 탐색하는 방식
1. 두 개의 `큐(Queue)`를 사용한다.
2. `root`와 가까운 `node`들부터 찾기 때문에 `최단거리를 탐색`할 때 유용하다.
3. `queue`에 `각 노드의 정보를 기록`해야 하기 때문에 `메모리를 많이 잡아 먹는다`.
4. 찾고자 하는 `target node`가 `root node와 가까이 있다고 예상`될 경우 `BFS`를 사용한다.
5. 지도 어플에서 `특정 위치까지의 최단거리 안내`, 혹은 `소셜미디어에서 친구 추천` 등에 이용된다.

`깊이 우선 탐색(Depth First Search)`: 정점의 자식들을 먼저 탐색하는 방식
1. `한 개의 큐`와 `한 개의 스택`을 사용한다.
2. `BFS`보다 `속도가 느릴 수` 있다.
3. `미로 게임` 등에서 `경로가 존재하는지를 판별`할 때 유용하다.

<img src="./image/DFS, BFS.png" width="500">

- BFS 방식: A - B - C - D - G - H - I - E - F - J
- DFS 방식: A - B - D - E - F - C - G - H - I - J

### 자바스크립트로 그래프 표현하기

```js
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'G', 'H', 'I'],
  D: ['B', 'E', 'F'],
  E: ['D'],
  F: ['D'],
  G: ['C'],
  H: ['C'],
  I: ['C', 'J'],
  J: ['I']
};
```

### BFS 알고리즘 구현
두 개의 큐(Queue)를 활용한다.

```js
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "G", "H", "I"],
  D: ["B", "E", "F"],
  E: ["D"],
  F: ["D"],
  G: ["C"],
  H: ["C"],
  I: ["C", "J"],
  J: ["I"]
};

const bfs = (graph, startNode) => {
  let visited = []; // 탐색을 마친 노드들
  let needVisit = []; // 탐색해야할 노드들

  needVisit.push(startNode); // 노드 탐색 시작

  while (needVisit.length !== 0) { // 탐색해야할 노드가 남아있다면
    const node = needVisit.shift(); // queue이기 때문에 선입선출, shift()를 사용한다.
    if (!visited.includes(node)) { // 해당 노드가 탐색된 적 없다면
      visited.push(node); 
      needVisit = [...needVisit, ...graph[node]];
    }
  }
  return visited;
};

console.log(bfs(graph, "A"));
// ["A", "B", "C", "D", "G", "H", "I", "E", "F", "J"]
```

### DFS 알고리즘 구현
자료구조 스택과 큐를 활용
- needVisit 스택과 visited 큐, 두 개의 자료 구조를 생성한다.
- 큐와 스택 구현은 별도의 라이브러리를 활용할 수도 있지만 간단히 배열을 통해 구현하자.

BFS 구조는 두 개의 큐를 활용하는데, DFS는 한 개의 스택과 한 개의 큐를 사용한다는 차이가 있음
BFS 구조는 이전 노드와 연결된 노드들을 먼저 탐색해야 하기 때문에 queue. DFS는 이전 노드가 아니라 자기 자신과 연결되었던 노드들 먼저 탐색하기 때문에 stack을 사용한다.

```js
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "G", "H", "I"],
  D: ["B", "E", "F"],
  E: ["D"],
  F: ["D"],
  G: ["C"],
  H: ["C"],
  I: ["C", "J"],
  J: ["I"],
};

// (graph, 시작 정점)
const dfs = (graph, startNode) => {
  let needVisitStack = []; // 탐색을 해야 할 노드들
  let visitedQueue = []; // 탐색을 마친 노드들

  needVisitStack.push(startNode);

  // 탐색을 해야 할 노드가 남아 있다면
  while (needVisitStack.length !== 0) {
    const node = needVisitStack.pop();
    if (!visitedQueue.includes(node)) {
      visitedQueue.push(node);
      needVisitStack = [...needVisitStack, ...graph[node]];
    }
  }

  return visitedQueue;
};

console.log(dfs(graph, "A"));

// ["A", "C", "I", "J", "H", "G", "B", "D", "F", "E"]
```

<br />
<br />

> 출처 : <br />
[자바스크립트로 구현하는 너비우선탐색(BFS) 깊이우선탐색(DFS)](https://ryusm.tistory.com/48)<br />


