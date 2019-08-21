import React from 'react';

import axios from 'axios';
import Pusher from 'pusher-js';

import TextMessageChat from './TextMessageChat';
import TwoVideoChat from './TwoVideoChat';
import ButtonPanel from './ButtonPanel';
import NavBar from './NavBar';

class TwoPersonChatStation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text='',
            username='',
            chats=[],

            menu =[1, 5]
        }
    }

    render(){



        return(
            <div class="background">
                <NavBar menu={this.state.menu} />
                <div className='centerwhite px-3 pt-0 container'>
                    <div className="TwoPersonChatStation">
                        <div className="contentBack mx-auto mb-4 p-2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-4">
                                        <TwoVideoChat remoteView={this.state.remoteSrc} selfView={this.state.selfSrc}/>
                                        <ButtonPanel/>
                                    </div>
                                    <div className="col-8">
                                        <TextMessageChat chats={this.state.chats} text={this.state.text} username={this.state.username} handleTextChange={this.state.handleTextChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
            
        );
    }
}
export default TwoPersonChatStation;