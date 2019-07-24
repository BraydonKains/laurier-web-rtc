import React from 'react';
import '../style.css';
import NavBar from './NavBar';
import { Link } from "react-router-dom";



class Login extends React.Component {

    state = {
        menu : [3, 2, 6]
    }

    render() {
        return (
            <div className='background'> 
                <NavBar menu={this.state.menu} />
                <div className='centerwhite px-3 pt-0 container'>
                    <div className="centerwhite">
                        <div className="login mb-3">
                            Username: <input></input>
                        </div>
                        <div className="login mb-3">
                            Password: <input className="ml-5"></input>
                        </div>
                        <Link className="login mb-3" to="/home">
                            <button className="btn">Log In</button>
                        </Link>
                        <div className="text">Not a member yet? Sign up 
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