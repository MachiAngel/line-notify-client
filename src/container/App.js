import React, { Component } from 'react';
import Logo from '../component/logo//logo'
import LoginPage from './login//LoginPage'
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="">
        <Logo/>
        <LoginPage/>
      </div>
    );
  }
}

export default App;
