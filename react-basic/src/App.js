import { useState } from 'react';
import './App.css';

// 사용자 정의 태그(= 컴포넌트)의 경우, 대문자로 시작
function Header(props) {
  return <header>
    <h1>
      <a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a>
    </h1>
  </header>;
}

function Nav(props) {
  const lis = [];

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(e) => {
        e.preventDefault();
        props.onChangeMode(Number(e.target.id));
      }}>{t.title}</a>
    </li>)
  }

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>;
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>;
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      const title = e.target.title.value; //title의 value 값을 가져올 수 있다.
      const body = e.target.body.value;

      props.onCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title'></input></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create' /></p>
    </form>
  </article>;
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return <article>
    <h2>Update</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      const title = e.target.title.value; //title의 value 값을 가져올 수 있다.
      const body = e.target.body.value;

      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={(e) => {
        console.log(e.target.value);
        setTitle(e.target.value);
      }}></input></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={(e) => {
        setBody(e.target.value);
      }}></textarea></p>
      <p><input type='submit' value='Update' /></p>
    </form>
  </article>;
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null); //초기값 null
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ]);
  let content = null;
  let contextControl = null;

  if (mode === 'WELCOME') {
    content = <Article title="welcome" body="Hello, WEB"></Article>
  }
  else if (mode === 'READ') {
    let title, body = null;
    for (let i=0;i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Article title={title} body={body}></Article>;
    contextControl = <>
      <li><a href={"/update/" + id} onClick={(e) => {
        e.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={() => {
        const newTopics = [];
        for(let i=0; i<topics.length; i++) {
          if (id !== topics[i].id) {
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }}/></li>
    </>;
  }
  else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      // topics 배열에 새로운 원소가 추가되어야 함
      const newTopic = { id: nextId, title: _title, body: _body };
      const newTopocs = [...topics];
      newTopocs.push(newTopic);
      setTopics(newTopocs);
      console.log('newTopocs :', newTopocs);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }} />
  }
  else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i=0;i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      const newTopics = [...topics];
      const updatedTopic = { id: id, title: _title, body: _body };
      
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
    }} />
  }

  return (
    <div className="App">
      <Header title="REACT" onChangeMode={() => {
        // 값을 바꿀때는 setMode를 사용해서 값을 변경
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }} />
      {content}
      <ul>
        <li><a href="/create" onClick={(e) => {
          e.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
