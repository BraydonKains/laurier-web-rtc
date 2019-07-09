import React from 'react';
import './App.css';
import TwoPersonChatStation from './Components/TwoPersonChatStation';
import RegisterForm from './Components/RegisterForm';
import Login from './Components/Login'
import NavBar from './Components/NavBar';
import About from './Components/About';
import HomePage from './Components/HomePage';



class App extends React.Component{

  state = {

    current : 3,
    page : [
      {
        id : 1,
        title : "Home",
        menu : [4, 5]
      },
      {
        id : 2,
        title : "Sign Up",
        menu : [3,6]
      },
      {
        id : 3,
        title : "Login",
        menu : [3, 2, 6]
      },
      {
        id : 4,
        title : "Two Person Chat",
        menu :[1, 5]
      },
      {
        id : 5,
        title : "Sign out",
        menu : [3, 2, 6]
      },
      {
        id : 6,
        title : "About",
        menu : [3]
      }

    ]
  }

  changePage = (id) => {

    this.setState({
      current : id
    });
    console.log(this.state.current);
  };

  getPage() {
    if (this.state.current === 3) {
      return (
        <Login changePage={this.changePage}/>
      );
    }
    else if (this.state.current === 1){
      return (
        <HomePage changePage={this.changePage}/>
      );
    }
    else if (this.state.current === 2){
      return (
        <RegisterForm changePage={this.changePage}/>
      );
    }
    else if (this.state.current === 4){
      return (
        <TwoPersonChatStation changePage={this.changePage}/>
      );
    }
    else if (this.state.current === 6){
      return (
        <About changePage={this.changePage}/>
      );
    }
    else {
      return (
        <Login changePage={this.changePage}/>
      );
    }
  }

  render() {
      return (
        <div>
          <div className='background'> 
            <h1 className='jumbotron pageName mt-0 mb-4'>Laurier Web-RTC</h1>
            <NavBar page={this.state.page} changePage={this.changePage} current={this.state.current} />
            {this.getPage()}
          </div>
        </div>
      );

  }
  
}

export default App;
