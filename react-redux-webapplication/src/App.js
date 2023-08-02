import './App.css';
import Article from './components/Article';
import Header from './components/Header';
import NavContainer from './containers/Nav';

function App() {
  return (
    <div className="App">
      <Header ></Header>
      <NavContainer></NavContainer>
      <Article></Article>
    </div>
  );
}

export default App;
