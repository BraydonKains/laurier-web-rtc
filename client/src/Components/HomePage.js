import React from 'react';
import '../style.css';
import NavBar from './NavBar';

class HomePage extends React.Component {


  render() {
      return (
        <div className='background'>
            <h1 className='jumbotron pageName mt-0 mb-4'>Laurier Web-RTC</h1>
            <NavBar page={this.props.page} changePage={this.props.changePage} />
            <div className='centerwhite px-3 pt-0 container'>
            <div className="centerwhite">
                <div className="login mb-3">
                    Username: <input></input>
                </div>
                <div className="login mb-3">
                    Password: <input className="ml-5"></input>
                </div>
                <div className="login mb-3">
                    <button className="btn" onClick={() => this.props.changePage(4)}>Log In</button>
                </div>
                <div className="text">Not a member yet? Sign up <a href="#">here</a></div>
            </div>
            </div>
        </div>
      );
  }
}

export default HomePage;