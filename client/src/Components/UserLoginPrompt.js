import React from 'react';

import axios from 'axios';
import Pusher from 'pusher-js';

import TextMessageChat from './TextMessageChat';
import TwoVideoChat from './TwoVideoChat';
import ButtonPanel from './ButtonPanel';
import NavBar from './NavBar';

class UserLogin extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='popup'>
              <div className='popup_inner'>
                <h1>Login</h1>
                Nickname:<input type="text"/>
                Chat Password: <input type="text"/>
              <button onClick={this.props.closePopup}>Done</button>
              </div>
            </div>
          );
    }
}
export default UserLogin;