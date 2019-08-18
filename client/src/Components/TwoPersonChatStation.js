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

            usersOn={},
            id={},
            users={},
            sessionDesc={},
            currentCaller={},
            room:{},
            caller:{},
            localUserMedia={},
            remoteSrc={},
            selfSrc={},
            caller={},


            menu =[1, 5]
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
        channel.bind("pusher:subscription_succeeded", members=>{this.subSucceeded(members);});
        channel.bind("pusher:member_added", members=>{this.memberAdd(members);});
        channel.bind("pusher:member_removed", members=>{this.memberRemove(members);});

        this.handleTextChange = this.handleTextChange.bind(this);
        GetRTCPeerConnection();
        GetRTCSessionDescription();
        GetRTCIceCandidate();
        prepareCaller();

        //preparecaller
        //Initializing a peer connection
        this.setState({caller: new window.RTCPeerConnection});
        //Listen for ICE Candidates and send them to remote peers
        this.state.caller.onicecandidate = function(evt) {
          if (!evt.candidate) return;
          console.log("onicecandidate called");
        //   onIceCandidate(caller, evt);
            if (evt.candidate) {
                channel.trigger("client-candidate", {
                    "candidate": evt.candidate,
                    "room": room
                });
            }
        };
        //------------------------------------------------------------------------------WONT NEED WITH 1 PERSON VIEW
        //onaddstream handler to receive remote feed and show in remoteview video element
        this.state.caller.onaddstream = function(evt) {
          console.log("onaddstream called");
          //----------------------------------------------------------------------------TAKE OUT THESE FOR 1 PERSON VIEW
          if (window.URL) {
              this.setState({remoteSrc:window.URL.createObjectURL});
            // document.getElementById("remoteview").src = window.URL.createObjectURL(
            //   evt.stream
            // );
          } else {
              this.setState({remoteSrc:evt.stream})
            // document.getElementById("remoteview").src = evt.stream;
          }
        };

        channel.bind("client-candidate", function(msg) {
            if(msg.room==room){
                console.log("candidate received");
                caller.addIceCandidate(new RTCIceCandidate(msg.candidate));
            }
        });

        getCam()
          .then(stream => {
            if (window.URL) {
                this.setState({selfSrc:window.URL.createObjectURL(stream)})
            } else {
                this.setState({selfSrc:stream});
            }
            toggleEndCallButton();
            this.state.caller.addStream(stream);
            this.setState({localUserMedia: stream});
            this.state.caller.createOffer().then(function(desc) {
              this.state.caller.setLocalDescription(new RTCSessionDescription(desc));
              channel.trigger("client-sdp", {
                sdp: desc,
                room: user,
                from: id
              });
              room = user;
            });
          })
          .catch(error => {
            console.log("an error occured", error);
          });

          channel.bind("client-sdp", function(msg) {
            if(msg.room == id){
                var answer = confirm("You have a call from: "+ msg.from + "Would you like to answer?");
                if(!answer){
                    return channel.trigger("client-reject", {"room": msg.room, "rejected":id});
                }
                room = msg.room;
                getCam()
                .then(stream => {
                    this.setState({localUserMedia:stream});
                    toggleEndCallButton();
                    if (window.URL) {
                        document.getElementById("selfview").src = window.URL.createObjectURL(stream);
                    } else {
                        document.getElementById("selfview").src = stream;
                    }
                    this.state.caller.addStream(stream);
                    this.setState({sessionDesc: new RTCSessionDescription(msg.dsp)});
                    this.state.caller.setRemoteDescription(sessionDesc);
                    this.state.caller.createAnswer().then(function(sdp) {
                        this.state.caller.setLocalDescription(new RTCSessionDescription(sdp));
                        channel.trigger("client-answer", {
                            "sdp": sdp,
                            "room": this.state.room
                        });
                    });
    
                })
                .catch(error => {
                    console.log('an error occured', error);
                })
            }
        });
        channel.bind("client-answer", function(answer) {
          if (answer.room == this.state.room) {
            console.log("answer received");
            this.state.caller.setRemoteDescription(new RTCSessionDescription(answer.sdp));
          }
        });
    
        channel.bind("client-reject", function(answer) {
          if (answer.room == this.state.room) {
            console.log("Call declined");
            alert("call to " + answer.rejected + "was politely declined");
            endCall();
          }
        });
    
    
    }

    endCall() {
        this.setState({room : undefined});
        this.state.caller.close();
        for (let track of this.state.localUserMedia.getTracks()) {
          track.stop();
        }

        //-------------------------------------------------------------------------------------CHANGE THIS PORTION(LEAVE CHAT)
        prepareCaller();
        toggleEndCallButton();
      }  

    /*-----------------------------------------------------------------------------------------FIGURE OUT WHAT TO DO WITH THIS*/
    // callUser(user) {
    //     getCam()
    //       .then(stream => {
    //         if (window.URL) {
    //             this.setState({selfSrc:window.URL.createObjectURL(stream)})
    //         //   document.getElementById("selfview").src = window.URL.createObjectURL(
    //         //     stream
    //         //   );
    //         } else {
    //             this.setState({selfSrc:stream});
    //         //   document.getElementById("selfview").src = stream;
    //         }
    //         toggleEndCallButton();
    //         this.state.caller.addStream(stream);
    //         localUserMedia = stream;
    //         this.state.caller.createOffer().then(function(desc) {
    //           this.state.caller.setLocalDescription(new RTCSessionDescription(desc));
    //           channel.trigger("client-sdp", {
    //             sdp: desc,
    //             room: user,
    //             from: id
    //           });
    //           room = user;
    //         });
    //       })
    //       .catch(error => {
    //         console.log("an error occured", error);
    //       });
    //   }

    // prepareCaller() {
    //     //Initializing a peer connection
    //     caller = new window.RTCPeerConnection();
    //     //Listen for ICE Candidates and send them to remote peers
    //     caller.onicecandidate = function(evt) {
    //       if (!evt.candidate) return;
    //       console.log("onicecandidate called");
    //       onIceCandidate(caller, evt);
    //     };
    //     //onaddstream handler to receive remote feed and show in remoteview video element
    //     caller.onaddstream = function(evt) {
    //       console.log("onaddstream called");
    //       if (window.URL) {
    //           this.setState({remoteSrc:window.URL.createObjectURL});
    //         // document.getElementById("remoteview").src = window.URL.createObjectURL(
    //         //   evt.stream
    //         // );
    //       } else {
    //           this.setState({remoteSrc:evt.stream})
    //         // document.getElementById("remoteview").src = evt.stream;
    //       }
    //     };
    //   }

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

    subSucceeded(members){
        //alert backend
            //MAYBE
        //update usersOn
        var userCount = this.state.usersOn;
        this.setState({usersOn:userCount+1});
        //get user id
        this.setState({id:this.state.channel.members.me.id});
        //add user to room
        var usersTemp = [];
        members.each(member=>{
            if(member.id != this.state.id){
                usersTemp.concat(member.id)
            }
        })
        usersTemp.concat(this.state.id);

        this.setState({usersOn: usersTemp});
        //alert chat hat this user has entered the room
    }

    memberAdd(member){
        //send message in chat
        //add them to users
        this.setState({usersOn:this.state.users.concat(member.id)});
        
    }

    memberRemove(member){
        //send message in chat
        //remove them from users
        var usersTemp = this.state.users;
        usersTemp.splice(usersTemp.indexOf(member.id),1);
        this.setState({usersOn:usersTemp});
        if(usersTemp == this.state.id){
            endCall();
        }
    }

    getCam() {
        //Get local audio/video feed and show it in selfview video element
        return navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
    }
  
    GetRTCIceCandidate() {
        window.RTCIceCandidate =
          window.RTCIceCandidate ||
          window.webkitRTCIceCandidate ||
          window.mozRTCIceCandidate ||
          window.msRTCIceCandidate;
  
        return window.RTCIceCandidate;
    }
  
    GetRTCPeerConnection() {
        window.RTCPeerConnection =
          window.RTCPeerConnection ||
          window.webkitRTCPeerConnection ||
          window.mozRTCPeerConnection ||
          window.msRTCPeerConnection;
        return window.RTCPeerConnection;
    }
  
    GetRTCSessionDescription() {
        window.RTCSessionDescription =
          window.RTCSessionDescription ||
          window.webkitRTCSessionDescription ||
          window.mozRTCSessionDescription ||
          window.msRTCSessionDescription;
        return window.RTCSessionDescription;
    }
  

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