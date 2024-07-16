# 컴포넌트

- **반드시 대문자로 시작해야한다**

# props

- 컴포넌트의 속성

---

## 배열 넘기기

```
const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 2, title: "js", body: "js is ..." },
  ];
reurn(
    <Nav topics='topics' /> // 그냥 문자열
    <Nav topics={topics} /> // 있는 그대로 가져옴
);
```

---

## 배열의 원소들을 하나씩 꺼내오기

```
function Nav(props) {
  const lis = [
    <li>
      <a href="/read/1">html</a>
    </li>,
    <li>
      <a href="/read/2">css</a>
    </li>,
    <li>
      <a href="/read/3">js</a>
    </li>,
  ];
  return <nav>{lis}</nav>; // {} 이게 중요 !
}
```
