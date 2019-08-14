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
        this.state = {
            text='',
            username='',
            chats=[],
            menu :[1, 5]
        };

        // this.state ={
        //     menu :[1, 5],
        //     usersOn:{},
        //     id:{},
        //     users: [],
        //     sessionDesc:{},
        //     currentCaller:{},
        //     room:{},
        //     caller:{},
        //     localUserMedia:{},
        //     pusher = new Pusher("078e55748f7f3fd3184a",{
        //         cluster: "us2",
        //         encrypted: true,
        //         authEndpoint: "push/auth"
        //     }),
        //     channel: pusher.subscribe("****WHAT WILL GO HERE****")
        // }

        // this.state.channel.bind("pusher:subscription_succeeded", members=>{this.subSucceeded(members);});
        // this.state.channel.bind("pusher:member_added", members=>{this.memberAdd(members);});
        // this.state.channel.bind("pusher:member_removed", members=>{this.memberRemove(members);});
    }

    componentDidMount(){
        //NEED TO CHECK IF PROFESSOR
        //IF NOT CREATE RANDOM ID FOR USER
        this.setState({ username: min + Math.random() * (max-min) });
        const pusher = new Pusher('078e55748f7f3fd3184a',{
                    cluster: 'us2',
                    encrypted: true});
        //NEED TO ACCESS CHAT ID
        const channel = pusher.subscribe("CHAT ID HERE");
        channel.bind('message', data =>{
            this.setState({chats: [...this.state.chats,data], test=''})
        });
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e){
        if(e.keyCode === 13){
            const payload = {
                username: this.state.username,
                message:this.state.text
            };
            //SEND MESSAGE
            axios.post("LINK HERE/message",payload);
        }
        else{
            this.setState({text: e.target.value});
        }
    }

    // subSucceeded(members){
    //     //alert backend
    //         //MAYBE
    //     //update usersOn
    //     var userCount = this.state.usersOn;
    //     this.setState({usersOn:userCount+1});
    //     //get user id
    //     this.setState({id:this.state.channel.members.me.id});
    //     //add user to room
    //     var usersTemp = [];
    //     members.each(member=>{
    //         if(member.id != this.state.id){
    //             usersTemp.concat(member.id)
    //         }
    //     })
    //     usersTemp.concat(this.state.id);

    //     this.setState({usersOn: usersTemp});
    //     //alert chat hat this user has entered the room
    // }

    // memberAdd(member){
    //     //send message in chat
    //     //add them to users
    //     this.setState({usersOn:this.state.users.concat(member.id)});
        
    // }

    // memberRemove(member){
    //     //send message in chat
    //     //remove them from users
    //     var usersTemp = this.state.users;
    //     usersTemp.splice(usersTemp.indexOf(member.id),1);
    //     this.setState({usersOn:usersTemp});
    //     if(usersTemp == this.state.id){
    //         endCall();
    //     }
    // }

    // getCam() {
    //     //Get local audio/video feed and show it in selfview video element
    //     return navigator.mediaDevices.getUserMedia({
    //       video: true,
    //       audio: true
    //     });
    // }
  
    // GetRTCIceCandidate() {
    //     window.RTCIceCandidate =
    //       window.RTCIceCandidate ||
    //       window.webkitRTCIceCandidate ||
    //       window.mozRTCIceCandidate ||
    //       window.msRTCIceCandidate;
  
    //     return window.RTCIceCandidate;
    // }
  
    // GetRTCPeerConnection() {
    //     window.RTCPeerConnection =
    //       window.RTCPeerConnection ||
    //       window.webkitRTCPeerConnection ||
    //       window.mozRTCPeerConnection ||
    //       window.msRTCPeerConnection;
    //     return window.RTCPeerConnection;
    // }
  
    // GetRTCSessionDescription() {
    //     window.RTCSessionDescription =
    //       window.RTCSessionDescription ||
    //       window.webkitRTCSessionDescription ||
    //       window.mozRTCSessionDescription ||
    //       window.msRTCSessionDescription;
    //     return window.RTCSessionDescription;
    // }
  

    // state = {
    //     menu :[1, 5]
    // }

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
                                        <TwoVideoChat/>
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