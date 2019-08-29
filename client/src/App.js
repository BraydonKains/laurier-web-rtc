import React from 'react';
import './App.css';
import TwoPersonChatStation from './Components/TwoPersonChatStation';
import { BrowserRouter as Router, Route} from "react-router-dom";
import RegisterForm from './Components/RegisterForm';
import Login from './Components/Login'
import About from './Components/About';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import UserLoginPrompt from './Components/UserLoginPrompt';

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

function showChat(id,user) {
  //_____________________________________NEED CHAT ID AND USER ID
  return <TwoPersonChatStation chatId={id} userId={user}/>;
}

class App extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state = { showPopup: true };
  //   }
  
    
  render() {
      return (
        <Router>
          
            <div className='background'>
              <h1 className='jumbotron pageName mt-0 mb-4'>Laurier Web-RTC</h1>
              <Route path="/home" component={HomePage} />
              <Route path="/signup" component={showRegister} />
              <Route exact path="/" component={showLogin} />
              <Route path="/room/:id" component={TwoPersonChatStation} />
              <Route path="/about" component={showAbout} />  
              {/* <button onClick={this.togglePopup.bind(this)}>show popup</button> */}
            
              <Footer />

            </div> 
        </Router>
      );

  }
  
}

export default App;
