import React from 'react';
import '../style.css';

class Login extends React.Component {


  render() {
      return (
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
                <div className="text">Not a member yet? Sign up <a href='#' onClick={()=> this.props.changePage(2)}>here</a></div>
            </div>
        </div>
      );
  }
}

export default Login;