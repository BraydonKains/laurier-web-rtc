import React from 'react';

import axios from 'axios';
import Pusher from 'pusher-js';

import TextMessageChat from './TextMessageChat';
import TwoVideoChat from './TwoVideoChat';
import ButtonPanel from './ButtonPanel';
import NavBar from './NavBar';



export default({name,password,passOnChange,nameOnChange,closePopup}) => {
  
  return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>Login</h1>
          Nickname:<input type="text" onChange={nameOnChange.bind(this)} value={name}/>
          Chat Password: <input type="text" onChange={passOnChange.bind(this)} value={password}/>
        <button onClick={closePopup}>Done</button>
        </div>
      </div>
  );
}

// export default UserLogin;