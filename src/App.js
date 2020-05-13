import React, { Component } from 'react';
import axios from 'axios';


import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    searchedUsers: false,
    alert: null
  }



  //get users from API
  searchUsers = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`);

    this.setState({
      users: res.data.items,
      loading: false,
      searchedUsers: true
    })
  }

  //clear users from state
  clearInput = () => {
    this.setState({ users: [], loading: false, searchedUsers: false })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  }
  render() {
    return (
      <div className='app'>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} clearInput={this.clearInput}
            searchedUsers={this.state.searchedUsers} setAlert={this.setAlert} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>

      </div>
    );
  }

}

export default App;
