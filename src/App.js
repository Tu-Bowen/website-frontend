import './App.css';
import Home from './pages/home';
import List from './pages/list';
import Detail from './pages/detailed';
import Bugknow from './pages/bugKnow';
import Book from './pages/book';
import 'antd/dist/antd.css'
import 'markdown-navbar/dist/navbar.css';
import 'highlight.js/styles/monokai-sublime.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home" component={Home} />
          <Route exact path="/list" component={List} />
          <Route exact path="/detailed" component={Detail} />
          <Route exact path="/bugknow" component={Bugknow} />
          <Route exact path="/book" component={Book} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
