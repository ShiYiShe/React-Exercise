// To do:
// 1. 解决useState异步问题，无法实时检测数据变化

import { useState, useRef, createContext, useContext, useEffect } from 'react';

const list = [
  {id: 1, name: 'Yi'},
  {id: 2, name: 'Yii'},
  {id: 3, name: 'Yiii'}
]

const isLogin = false; // true false

const type = 1; // 1 2 3

// 复杂条件渲染 定义函数
function getType() {
  if (type === 1) {
    return <p>Type 1</p>;
  } else if (type === 2) {
    return <p>Type 2</p>;
  } else {
    return <p>Type 3</p>;
  }
}

// 定义组件
function Article() {
  return (
    <article>
      <p>人之初，性本善</p>
      <p>性相近，习相远</p>
    </article>
  );
}

// 组件通讯
// 父传子
function Son1(props) {
  return <div>This is son1. {props.name} {props.children}</div>
}

// 子传父
function Son2({ onGetMsg }) {
  const msg = 'This is Son2 message.';
  return (
    <div>
      This is son2.
      <button onClick={() => onGetMsg(msg)}>Send msg to App</button>
    </div>
  )
}

// 兄弟组件通讯
function A({ onGetAName }) {
  const aName = 'This is A.';
  return (
    <div>
      This is A.
      <button onClick={() => onGetAName(aName)}>Send A name</button>
    </div>
  )
}

function B({ aName }) {
  return (
    <div>
      This is B. {aName}
    </div>
  )
}

// 跨级组件通讯
function A1() {
  return <B1 />
}

function B1() {
  const appMsg = useContext(contextMsg);
  return <div>This is B1. {appMsg}</div>
}

const contextMsg = createContext();

// useEffect获取数据并渲染
const URL = 'http://geek.itheima.net/v1_0/channels';

function App() {
  // 事件绑定 回调函数
  const handleClick = (name) => {
    console.log('The button is clicked by ' + name + '!');
  }

  // useState
  const [count, setCount] = useState(0);

  const handleCountClick = () => {
    setCount(count + 1);
  }

  // 复杂useState
  // const [form, setForm] = useState({
  //   name: 'Yi'
  // });

  // const handleFormClick = () => {
  //   setForm({
  //     ...form,
  //     name: 'Yii'
  //   });
  // }

  // Can't reflect changes the fist time click the button because useState is
  // asynchronous in React. (useEffect)
  const [form2, setForm2] = useState({
    name: "Yii"
  });

  const handleForm2Click = () => {
    setForm2({
      ...form2,
      age: 22
    });
    console.log(form2);
  }

  // 受控表单绑定
  // Same issue with handleForm2Click.
  const [value, setValue] = useState('');

  // useRef获取DOM
  // useRef isn't an asynchronous hook.
  const inputRef = useRef(null);

  const handleUseRef = () => {
    console.log(inputRef.current.value);
  }

  // 组件通讯
  // 父传子
  const name = 'This is App.';

  // 子传父
  const [msg, setMsg] = useState('');
  const getMsg = (msg) => {
    setMsg(msg);
  }

  // 兄弟组件通讯
  const [aName, setAName] = useState('');
  const getAName = (name) => {
    setAName(name);
  }

  // 跨级组件通讯
  const appMsg = 'This is App.';


  // useEffect获取数据并渲染
  const [urlList, setUrlList] = useState([]);
  useEffect(() => {
    async function getList() {
      const response = await fetch(URL);
      const result = await response.json();
      setUrlList(result.data.channels);
    }
    getList();
  }, []);

  return (
    <div className="App">
      {<h1>This is a React exercise.</h1>}

      {/* List渲染 */}
      <ul>
        {list.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
      </ul>

      {/* 条件渲染 */}
      {isLogin && <span>Logged in.</span>}
      {isLogin ? <span>Logged in.</span> : <span>Not logged in.</span>}

      {/* 复杂条件渲染 */}
      {getType()}

      {/* 基础事件绑定 */}
      <button onClick={() => handleClick('Yi')}>Click Me</button>

      {/* 组件: 1. 自闭和， 2. 成对标签 */}
      <Article />
      <Article></Article>

      {/* useState */}
      <button onClick={handleCountClick}>{count}</button>

      {/* 复杂useState */}
      <button onClick={handleForm2Click}>Click Me</button>

      {/* 受控表单绑定 */}
      <input type='text' value={value} onChange={(e) => {setValue(e.target.value); console.log(value)}}></input>

      {/* useRef获取DOM */}
      <input type='text' ref={inputRef} onChange={handleUseRef}></input>

      {/* 父传子 */}
      <Son1 name={name} />
      <Son1 name={name}>
        <span>这是一段在Son1成对标签中的文字。</span>
      </Son1>

      {/* 子传父 */}
      <div>
        <Son2 onGetMsg={getMsg} />
        {msg}
      </div>

      {/* 兄弟组件通讯 */}
      <div>
        <A onGetAName={getAName}/>
        <B aName={aName} />
      </div>

      {/* 跨级组件通讯 */}
      <contextMsg.Provider value={appMsg}>
        <A1 />
      </contextMsg.Provider>

      {/* useEffect获取数据并渲染 */}
      <div>
        This is list from URL.
        <ul>
          {urlList.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
