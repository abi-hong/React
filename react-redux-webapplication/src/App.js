import './App.css';
import ArticleContainer from './containers/Article';
import Header from './components/Header';
import NavContainer from './containers/Nav';
import ControlContainer from './containers/Control';

function App() {
  return (
    <div className="App">
      <Header ></Header>
      <NavContainer></NavContainer>
      <ControlContainer></ControlContainer>
      <ArticleContainer></ArticleContainer>
    </div>
  );
}

export default App;
