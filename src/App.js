import './App.css';
import Interspot from './Interspot'
import {BrowserRouter as Router, Route, Switch, HashRouter} from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Interspot />
          </Route>
          <Route exact path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
