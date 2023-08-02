import './App.css';
import ArticleContainer from './containers/Article';
import Header from './components/Header';
import NavContainer from './containers/Nav';

function App() {
  return (
    <div className="App">
      <Header ></Header>
      <NavContainer></NavContainer>
      <ArticleContainer></ArticleContainer>
    </div>
  );
}

export default App;
