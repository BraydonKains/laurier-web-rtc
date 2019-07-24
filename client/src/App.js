import React from 'react';
import './App.css';
import TwoPersonChatStation from './Components/TwoPersonChatStation';
import { BrowserRouter as Router, Route} from "react-router-dom";
import RegisterForm from './Components/RegisterForm';
import Login from './Components/Login'
import About from './Components/About';
import HomePage from './Components/HomePage';

function showHomePage() {
  return <HomePage />;
}

function showRegister() {
  return <RegisterForm />;
}

function showLogin() {
  return <Login />;
}

function showAbout() {
  return <About />;
}

function showChat() {
  return <TwoPersonChatStation />;
}


class App extends React.Component{

  render() {
      return (
        <Router>
            <div className='background'>
              <h1 className='jumbotron pageName mt-0 mb-4'>Laurier Web-RTC</h1>
              <Route path="/home" component={showHomePage} />
              <Route path="/signup" component={showRegister} />
              <Route exact path="/" component={showLogin} />
              <Route path="/twopersonchat" component={showChat} />
              <Route path="/about" component={showAbout} />  
            </div> 
        </Router>
      );

  }
  
}

export default App;
