import './App.css';
import Interspot from './Interspot'
import Welcome from './Welcome';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/create">
            <Interspot />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
