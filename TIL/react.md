# 컴포넌트

- **반드시 대문자로 시작해야한다**

---

# props

- 컴포넌트의 속성

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

---

# event

## 기본 동작 방지

```
<a href="/" onClick={function(event){
  event.preventDefault() // 기본 동작 방지
}}>{props.title}</a>
```

## 이벤트 사용

- 함수 정의, 호출

```
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault(); // 기본동작 방지
>            props.onChangeMode(); // 함수 호출
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => { // 함수 정의
          alert("Header");
        }}
      />
      <Nav topics={topics} />
      <Article title="Welcome" body="Hello, WEB" />
      <Article title="Hi" body="Hello, React" />
    </div>
  );
}

export default App;
```

- target = 이벤트를 유발시킨 태그

---

# state

- prop : 컴포넌트를 사용하는 **외부자**를 위한 데이터
- state : 컴포넌트를 만드는 **내부자**를 위한 데이터
  - 컴포넌트 안에서 바꿀 수 있음 !!

### useState

- 배열을 리턴함
- useState의 인자는 그 state의 초깃값
- 0번째 인덱스 값으로 읽음
- state를 바꿀 때는 1번째 인덱스의 값, 함수로 바꿈

```
  const [mode, setMode] = useState('WELCOME');
```

---

# update

- read + create
