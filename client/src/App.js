import React from 'react';
import logo from './logo.svg';
import './App.css';
import TwoPersonChatStation from './Components/TwoPersonChatStation';
import RegisterForm from './Components/RegisterForm';
import HomePage from './Components/HomePage'



class App extends React.Component{

  state = {

    current : 1,
    page : [
      {
        id : 1,
        title : "Home"
      },
      {
        id : 2,
        title : "Sign Up"
      },
      {
        id : 3,
        title : "Login"
      },
      {
        id : 4,
        title : "Two Person Chat"
      }
    ]
  }

  changePage = (id) => {
    this.setState({
      current : id
    });
    console.log(this.state.current);
  };

  homepagehtml() {
    return (
      <div>
        <HomePage page={this.state.page} changePage={this.changePage}/>
      </div>
    );
  }

  chat() {
    return (
      <div>
        <TwoPersonChatStation page={this.state.page} changePage={this.changePage}/>
      </div>
    );
  }

  registrationpagehtml() {
    return (
        <div>
          <RegisterForm page={this.state.page} changePage={this.changePage}/>
      </div>
    );
  }

  render() {
      if ((this.state.current == 1) || (this.state.current == 3)) {
        return this.homepagehtml();
      }
      else if (this.state.current == 2){
        return this.registrationpagehtml();
      }
      else {
        return this.chat();
      }
  }
  
}

export default App;
