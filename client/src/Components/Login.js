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
            <div> 
                <NavBar menu={this.state.menu} />
                <div className='px-3 pt-0'>
                    <div className="centerwhite container">
                        <div className="login row col-8 mb-3">
                            Username: <input className="col-12"></input>
                        </div>
                        <div className="login row mb-3 col-8">
                            Password: <input className="col-12"></input>
                        </div>
                        <Link className="login row mb-3 col-2" to="/home">
                            <button className="btn">Log In</button>
                        </Link>
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