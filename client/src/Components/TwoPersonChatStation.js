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
	    text: '',
            username: '',
            chats: [],

            remoteSrc:{},
            selfSrc:{},
            usersOnline:{},
            id:{},
            users:[],
            room:{},
            caller:{},
            localUserMedia:{},

            menu: [1, 5]
        };
    }

    //when the component is built set up requirments to make video chat and messaging work
    componentDidMount(){

        this.handleTextChange = this.handleTextChange.bind(this);
        this.endChatProf = this.endChatProf.bind(this);
        this.endChatStudent = this.endChatStudent.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.GetRTCIceCandidate = this.RTCIceCandidate.bind(this);
        this.GetRTCPeerConnection = this.RTCPeerConnection.bind(this);
        this.GetRTCSessionDescription = this.GetRTCSessionDescription.bind(this);

        //get connection to Pusher set up
        var pusher = new Pusher('ba473cb312963eb9be6a', {
            cluster: 'us2',
            forceTLS: true
          });
      
        //____________________________________________________________NEED CHAT ID HERE
        const channel = pusher.subscribe("presence-videocall");


        channel.bind('message', data => {
          this.setState({ chats: [...this.state.chats, data], test: '' });
        });
        

        //if prof
          //usernamer is their name or user id
        //if student
          //username is randomly generated
        
        channel.bind("pusher:subscription_succeed",members=>{
            this.setState({usersOnline:members.count,id:channel.members.id});

            //Can use later on to display who is in chat
            members.each(member=>{
                if(member.id != channel.members.me.id)
                    this.setState({users:this.state.users.concat(member.id)});
            });
            //if prof
                //have their video show in self view
                // getCam().then((stream) => {
                //     const video = document.getElementById("selfView");
                //     const vendorURL = window.URL || window.webkitURL;
                //     if ("srcObject" in video) {
                //     video.srcObject = stream;
                //     } else {
                //     video.src = window.URL.createObjectURL(stream);
                //     }
                //     video.play();
                //     caller.addStream(stream);
                //     this.setState({localUserMedia:stream});
                // })
                // .catch((error) => {
                //     console.log(error);
                // })

        });
        //if a member is added to the chat
        channel.bind("pusher:member_added",member => {
            this.setState({users:this.state.users.concat(member.id)});
            //if prof
                //have their video show in self view
        });
        //if a member is removed from chat
        channel.bind("pusher:member_removed",member=>{
            var list = this.state.users;
            var index = list.indexOf(member.id);
            list.splice(index,1);
            this.setState({users:list});
            if(list.length == 1 && list[0] == member.id){
                //__________________________________________________________________________END CALL
                // this.endCall();
                console.log("END CALL");
            }
            //if prof left
                //close chat
        });
        this.GetRTCPeerConnection();
        this.GetRTCSessionDescription();
        this.GetRTCIceCandidate();

        //set up caller rtc connection
        var caller = new window.RTCPeerConnection();
        

        //Send the ICE Candidate to the remote peer
        //may only need for students
        var oniceCandidate = function(evt){
            if (evt.candidate) {
                channel.trigger("client-candidate", {
                    "candidate": evt.candidate,
                    "room": this.state. room
                });
            }
        }

        var prepareCaller = function(){
            caller.oniceCandidate = function(evt){
                if(!evt.candidate)return;
                console.log("onicecandidate called");
                oniceCandidate(this.state.caller,evt);
            }
            caller.onaddstream = function(evt){
                console.log("onaddstream called");
                //if one view dont add new stream
                    
                //if two view add new stream to remoteview
                    // const video = document.getElementById("remoteView");
                    // const vendorURL = window.URL || window.webkitURL;
                    // if ("srcObject" in video) {
                    //     video.srcObject = stream;
                    // } else {
                    //     video.src = window.URL.createObjectURL(stream);
                    // }
            }
        }
        
        //prompts user for permission to use camera
        var getCam = function(){
            return navigator.mediaDevices.getUserMedia({
                video:true,
                audio:false
            });
        };

        //Create and send offer to remote peer on button click
        //should only be used if student
        var callUser = function(user){
            getCam().then((stream) => {
                const video = document.getElementById("selfView");
                const vendorURL = window.URL || window.webkitURL;
                if ("srcObject" in video) {
                video.srcObject = stream;
                } else {
                video.src = window.URL.createObjectURL(stream);
                }
                video.play();
                caller.addStream(stream);
                this.setState({localUserMedia:stream});
                caller.createOffer().then(function(desc){
                    caller.setLocalDescription(new RTCSessionDescription(desc));
                    channel.trigger("client-sdp",{
                        sdp:desc,
                        room:user,
                        from: this.state.id
                    });
                    this.setState({room:user})
                });
            }).catch((error) => {
                console.log(error);
            })
        }

        var endCall = function(){
            this.setState({room:{}});
            caller.close();
            for(let track of this.state.localUserMedia.getTracks()){
                track.stop();
            }
            prepareCaller();

            //redirect to chatroom page 
            //this.toggleEndCallButton();
        }

        var endCurrentCall= function(){
            channel.trigger("client-endcall",{
                room: this.state.room
            });
            endCall();
        }

        channel.bind("client-candidate", function(msg){
            if(msg.room == this.state.room){
                console.log("candidate received");
                caller.addIceCandidate(new RTCIceCandidate(msg.candidate));
            }
        });

        channel.bind("client-sdp",function(msg){
            if(msg.room == this.state.id){
                console.log("sdp received");
                //forces a join
                this.setState({room:msg.room});
                getCam().then(stream => {
                    this.setState({localUserMedia:stream});
                    //this.toggleEndCallButton();
                    const video = document.getElementById("selfView");
                    const vendorURL = window.URL || window.webkitURL;
                    if ("srcObject" in video) {
                        video.srcObject = stream;
                    } else {
                        video.src = window.URL.createObjectURL(stream);
                    }
                    video.play();
                    caller.addStream(stream);
                    var sessionDesc = new RTCSessionDescription(msg.sdp);
                    caller.setRemoteDescription(sessionDesc);
                    caller.createAnswer().then(function(sdp){
                        caller.setLocalDescription(new RTCSessionDescription(sdp));
                        channel.trigger("client-answer",{
                            sdp:sdp,
                            room: this.state.room
                        });
                    });
                })
                .catch(error => {
                    console.log("ERROR: ",error);
                })
            }
        });

        channel.bind("client-endcall",function(answer){
            if(answer.room == this.state.room){
                console.log("Call Ended");
                endCall();
            }
        })
    
    
    }

    handleTextChange(e){
        if(e.keyCode === 13){
            const payload = {
                username: this.state.username,
                message:this.state.text
            };
            //SEND MESSAGE
            //_______________________________________________________________________________________LINK HERE was http://localhost:5000
            axios.post(process.env.REACT_APP_API_URI + "message",payload);
        }
        else{
            this.setState({text: e.target.value});
        }
    }

    handleSend(){
        //_______________________________________________________________________________________LINK HERE was http://localhost:5000
//        axios.post("LINK HERE/message",payload);
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

    endChatProf(){
        //if professor
            //end entire chat
        //if student
            

    }
    endChatStudent(){
        //just leave chat
            //alert users student left with message
            // const payload = {
            //     username: this.state.username,
            //     message:"left chat"
            // };
            // //SEND MESSAGE
            // //_______________________________________________________________________________________LINK HERE was http://localhost:5000
            // axios.post("LINK HERE/message",payload);
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
                                        <ButtonPanel endChatFunc={this.endChat}/>
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
