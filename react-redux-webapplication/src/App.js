import './App.css';
import Article from './components/Article';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Header ></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

export default App;
