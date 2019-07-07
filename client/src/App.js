import React from 'react';
import logo from './logo.svg';
import './App.css';
import TwoPersonChatStation from './Components/TwoPersonChatStation';
import RegisterForm from './Components/RegisterForm';


function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <div className="App">
      <div className="headerTop">
          <h1 id="titleText">NAME HERE</h1>
          <button className="btn text-white float-right signOutLink">Sign Out</button>
      </div>
      <div className="headerMiddle">

      </div>
      <div className="headerBottom">
          <div className="w-75 mx-auto">
          <button href="#" className="btn float-right directoryOption text-dark">Home</button>
          </div>
      </div>
      <div className="contentBack mx-auto mb-3">
          <RegisterForm/>

      </div>
    </div>
  );
}

export default App;
