import React, { useState, Fragment } from 'react';
import axios from 'axios';
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
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  //get Users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`);

    setRepos(res.data);
    setLoading(false);
  }

  //get single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`);

    setUser(res.data);
    setLoading(false);
  }

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
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user} repos={repos} loading={loading} />
              )} />
            </Switch>

          </div>

        </div>
      </Router>
    </GithubState>
  );


}

export default App;
