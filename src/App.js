import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

  const setAlertMsg = (msg, type) => {
    setAlert({ msg, type })

    setTimeout(() => setAlert(null), 5000);
  }
  return (
    <GithubState>
      <Router>
        <div className='app'>
          <Navbar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              {/* To render multiple Components we use render prop inside Route */}
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search setAlert={setAlertMsg} />
                  <Users />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => <User {...props} />} />
            </Switch>

          </div>

        </div>
      </Router>
    </GithubState>
  );


}

export default App;
