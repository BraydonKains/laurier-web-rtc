import React from 'react';

import axios from 'axios';
import Pusher from 'pusher-js';

import TextMessageChat from './TextMessageChat';
import TwoVideoChat from './TwoVideoChat';
import ButtonPanel from './ButtonPanel';
import NavBar from './NavBar';
import UserLoginPrompt from './UserLoginPrompt';

class TwoPersonChatStation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
	        text: '',
            username: '',
            chats: [],

            nickname:{},
            inputPassword:{},

            pusher:{},
            channel:{},
            caller:{},

            remoteSrc:{},
            selfSrc:{},
            usersOnline:{},
            id:{},
            users:[],
            room:{},
            caller:{},
            localUserMedia:{},

            showPopup: true,

            menu: [1, 5]
        };
        let push = new Pusher('ba473cb312963eb9be6a', {
            cluster: 'us2',
            forceTLS: true
        });
        
        this.setState({pusher: push});

        this.turnOnCamera = this.turnOnCamera.bind(this);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.endChatProf = this.endChatProf.bind(this);
        this.endChatStudent = this.endChatStudent.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.GetRTCIceCandidate = this.GetRTCIceCandidate.bind(this);
        this.GetRTCPeerConnection = this.GetRTCPeerConnection.bind(this);
        this.GetRTCSessionDescription = this.GetRTCSessionDescription.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.oniceCandidate = this.oniceCandidate.bind(this);
        this.getCam = this.getCam.bind(this);
        this.prepareCaller =this.prepareCaller.bind(this);
        // this.callUser = this.callUser.bind(this);
        this.endCall = this.endCall.bind(this);
        this.endCurrentCall = this.endCurrentCall.bind(this);

    }
    oniceCandidate(evt){
        if (evt.candidate) {
            this.state.channel.trigger("client-candidate", {
                "candidate": evt.candidate,
                "room": this.state.room
            });
        }
    }

    //prompts user for permission to use camera
    getCam(){
        return navigator.mediaDevices.getUserMedia({
            video:true,
            audio:false
        });
    };

    prepareCaller(){
        this.state.caller.oniceCandidate = function(evt){
            if(!evt.candidate)return;
            console.log("onicecandidate called");
            this.oniceCandidate(this.state.caller,evt);
        }
        this.state.caller.onaddstream = function(evt){
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

    //Create and send offer to remote peer on button click
    //should only be used if student
    // callUser(user){
    //     this.getCam().then((stream) => {
    //         const video = document.getElementById("selfView");
    //         const vendorURL = window.URL || window.webkitURL;
    //         if ("srcObject" in video) {
    //         video.srcObject = stream;
    //         } else {
    //         video.src = window.URL.createObjectURL(stream);
    //         }
    //         video.play();
    //         this.state.caller.addStream(stream);
    //         this.setState({localUserMedia:stream});
    //         this.state.caller.createOffer().then(function(desc){
    //             this.state.caller.setLocalDescription(new RTCSessionDescription(desc));
    //             this.channel.trigger("client-sdp",{
    //                 sdp:desc,
    //                 room:user,
    //                 from: this.state.id
    //             });
    //             this.setState({room:user})
    //         });
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }

    endCall(){
        this.setState({room:{}});
        this.state.caller.close();
        for(let track of this.state.localUserMedia.getTracks()){
            track.stop();
        }
        this.prepareCaller();

        //redirect to chatroom page 
        //this.toggleEndCallButton();
    }

    endCurrentCall(){
        this.state.channel.trigger("client-endcall",{
            room: this.state.room
        });
        this.endCall();
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
        //CHECK LOGIN INFO AND REQUEST
        var PASSWORD_CORRECT = true;
        if(PASSWORD_CORRECT){
            //set up Pusher info
            let chan = this.state.pusher.subscribe(this.props.chatId);
 
            chan.bind('message', data => {
                this.setState({ chats: [...this.state.chats, data], test: '' });
              });
            
            chan.bind("pusher:subscription_succeed",members=>{
                this.setState({usersOnline:members.count,id:this.state.channel.members.id});
    
                //Can use later on to display who is in chat
                members.each(member=>{
                    if(member.id != this.state.channel.members.me.id)
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
            
            chan.bind("pusher:member_added",member => {
                this.setState({users:this.state.users.concat(member.id)});
                //if prof
                    //have their video show in self view
            });
            //if a member is removed from chat
            chan.bind("pusher:member_removed",member=>{
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
            chan.bind("client-candidate", function(msg){
                if(msg.room == this.state.room){
                    console.log("candidate received");
                    this.state.caller.addIceCandidate(new RTCIceCandidate(msg.candidate));
                }
            });
            chan.bind("client-sdp",function(msg){
                if(msg.room == this.state.id){
                    console.log("sdp received");
                    //forces a join
                    this.setState({room:msg.room});
                    this.getCam().then(stream => {
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
                        this.caller.addStream(stream);
                        var sessionDesc = new RTCSessionDescription(msg.sdp);
                        this.caller.setRemoteDescription(sessionDesc);
                        this.caller.createAnswer().then(function(sdp){
                            this.caller.setLocalDescription(new RTCSessionDescription(sdp));
                            this.channel.trigger("client-answer",{
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
            chan.bind("client-endcall",function(answer){
                if(answer.room == this.state.room){
                    console.log("Call Ended");
                    this.endCall();
                }
            });

            //set up caller rtc connection
            let call = new window.RTCPeerConnection();

            this.setState({channel:chan,caller:call});
        }
      }

    //when the component is built set up requirments to make video chat and messaging work
    componentDidMount(){

        
    
    }

    handleTextChange(e){
        if(e.keyCode === 13){
            const payload = {
                username: this.state.username,
                message:this.state.text
            };
            //SEND MESSAGE
            //_______________________________________________________________________________________LINK HERE was http://localhost:5000
            axios.post(process.env.REACT_APP_API_URI + "pusher/message",payload);
        }
        else{
            this.setState({text: e.target.value});
        }
    }

    handleSend(){
        //_______________________________________________________________________________________LINK HERE was http://localhost:5000
//        axios.post("LINK HERE/message",payload);
    }

    turnOnCamera(){
        this.getCam().then((stream) => {
            const video = document.getElementById("selfView");
            const vendorURL = window.URL || window.webkitURL;
            if ("srcObject" in video) {
            video.srcObject = stream;
            } else {
            video.src = window.URL.createObjectURL(stream);
            }
            video.play();
            this.state.caller.addStream(stream);
            this.setState({localUserMedia:stream});
            this.state.caller.createOffer().then(function(desc){
                this.state.caller.setLocalDescription(new RTCSessionDescription(desc));
                this.channel.trigger("client-sdp",{
                    sdp:desc,
                    room:this.props.location.state.user_id,
                    from: this.state.id
                });
                this.setState({room:this.props.location.state.user_id})
            });
        }).catch((error) => {
            console.log(error);
        })
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

    handleChangeName(e){
        this.setState({nickname:e.target.value});
    }

    handleChangePass(e){
        this.setState({inputPassword:e.target.value});
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
                                        <ButtonPanel startCam={this.turnOnCamera} stopCam={this.endCall}/>
                                    </div>
                                    <div className="col-8">
                                        <TextMessageChat chats={this.state.chats} text={this.state.text} username={this.state.username} handleChange={this.handleTextChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showPopup ? 
                    <UserLoginPrompt
                        name={this.state.nickname}
                        password={this.state.inputPassword}
                        passOnChange={this.handleChangePass}
                        nameOnChange={this.handleChangeName}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
            
            
        );
    }
}
export default TwoPersonChatStation;
