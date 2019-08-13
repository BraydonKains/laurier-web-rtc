import React from 'react';
import '../style.css';
import NavBar from './NavBar';
import { Link } from "react-router-dom";



class Login extends React.Component {
constructor(props) {
	super(props);

	this.state = {
	    username: '',
	    password: '',
      menu : [3, 2, 6]
	};

	this.handleUsernameChange = this.handleUsernameChange.bind(this);
	this.handlePasswordChange = this.handlePasswordChange.bind(this);
	this.loginSubmit = this.loginSubmit.bind(this);
}

handleUsernameChange(event) {
	this.setState({username: event.target.value});
}
handlePasswordChange(event) {
	this.setState({password: event.target.value});
}
loginSubmit(event) {
	event.preventDefault();
	fetch(process.env.REACT_APP_API_URI + "users/login", {
	    method: "POST",
	    mode: "cors",
	    cache: "no-cache",
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(this.state)
	})
	.then(res => res)
	.then(res => {
	    this.props.changePage(4);
	})
	.catch(err => {
	    console.log(err);
	});
}
render() {
      return (
		  <div>
        <NavBar menu={this.state.menu} />
        <div className='centerwhite px-3 pt-0 container'>
            <div className="centerwhite">
                <div className="login mb-3">
                    Username: <input value={this.state.username} onChange={this.handleUsernameChange}></input>
                </div>
                <div className="login mb-3">
                    Password: <input value={this.state.password} onChange={this.handlePasswordChange} className="ml-5"></input>
                </div>
                <div className="login mb-3">
                    <button className="btn" onClick={this.loginSubmit}>Log In</button>
                </div>
                <div className="login row mb-3 col-3">Not a member yet? Sign up 
                    <Link to="/signup">
                        <a href='#'>&nbsp; here</a>
                    </Link>
                </div>
            </div>
		</div>
		</div>
        );
}
}

export default Login;
