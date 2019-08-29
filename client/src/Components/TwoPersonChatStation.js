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
            pusher: new Pusher('ba473cb312963eb9be6a', {
	    cluster: 'us2',
	    forceTLS: true,
	    authEndpoint: "pusher/auth"
            }),
            channel:{},
            usersOnline:{},
            id:this.props.location.state.user_id!=undefined ? this.props.location.state.user_id:0,
            caller:{},
            sessionDesc:{},
            remoteSrc:{},
            selfSrc:{},
            localUserMedia:{},
            room:this.props.match.params.id,

            showPopup:true,

            text: '',
            username: '',
            chats: [],

            nickname:{},
            inputPassword:{},
            menu: [1, 5]

        }

        this.GetRTCIceCandidate = this.GetRTCIceCandidate.bind(this);
        this.GetRTCPeerConnection = this.GetRTCPeerConnection.bind(this);
        this.GetRTCSessionDescription = this.GetRTCSessionDescription.bind(this);
        this.prepareCaller = this.prepareCaller.bind(this);
        this.getCam = this.getCam.bind(this);
	this.turnOnCamera = this.turnOnCamera(this);
        this.callUser = this.callUser.bind(this);
        this.endCall = this.endCall.bind(this);
        this.onIceCandidate = this.onIceCandidate.bind(this);

        // this.turnOnCamera = this.turnOnCamera.bind(this);

        this.handleTextChange = this.handleTextChange.bind(this);
//        this.endChatProf = this.endChatProf.bind(this);
//        this.endChatStudent = this.endChatStudent.bind(this);
        this.handleSend = this.handleSend.bind(this);
        // this.GetRTCIceCandidate = this.GetRTCIceCandidate.bind(this);
        // this.GetRTCPeerConnection = this.GetRTCPeerConnection.bind(this);
        // this.GetRTCSessionDescription = this.GetRTCSessionDescription.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        // this.oniceCandidate = this.oniceCandidate.bind(this);
        // this.getCam = this.getCam.bind(this);
        // this.prepareCaller =this.prepareCaller.bind(this);
      
        // this.callUser = this.callUser.bind(this);
        // this.endCall = this.endCall.bind(this);
        // this.endCurrentCall = this.endCurrentCall.bind(this);
    }
    

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
        //CHECK LOGIN INFO AND REQUEST
        alert("TOGGLE DONE");
        var PASSWORD_CORRECT = true;
        if(PASSWORD_CORRECT){
            alert("INPUT RIGHT");
            let chan = this.state.pusher.subscribe('presence-videocall');
        
        chan.bind('pusher:subscription_suceeded',(members)=>{
            this.setState({usersOnline: members.count,id:this.state.chanel.members.me.id});
        });
        chan.bind('pusher:member_added',(member) => {
            //stuff
        });
        chan.bind('pusher:member_removed', (member) => {
            //stuff
        });

        chan.bind('client-candidate', function(msg){
            if(msg.room == this.state.room){
                console.log("candidate received");
                this.state.caller.addIceCandidate(new RTCIceCandidate(msg.candidate));
            }
        })
        chan.bind("client-sdp", function(msg){
            if(msg.room == this.state.id){
                console.log("sdp received");
                // var ans = confirm("You have a call from: "+msg.from+" Would you like to answer?");
                var ans = true;
                if(!ans){
                    return this.state.channel.trigger("client-reject",{"room":msg.room,"reject":this.state.id})
                }
                this.setState({room:msg.room});
                this.getCam().then(stream => {
                    this.setState({localUserMedia:stream});
                    const video = document.getElementById("selfView");
                    const vendorURL = window.URL || window.webkitURL;
                    if ("srcObject" in video) {
                        video.srcObject = stream;
                    } else {
                        video.src = window.URL.createObjectURL(stream);
                    }
                    video.play();
                    this.state.caller.addStream(stream);
                    var sessDesc = new RTCSessionDescription(msg.sdp);
                    this.setState({sessionDesc:sessDesc});
                    this.state.caller.setRemoteDescription(sessDesc);
                    this.state.caller.createAnswer().then(function(sdp){
                        this.state.caller.setLocalDescription(new RTCSessionDescription(sdp));
                        this.state.channel.trigger("client-answer",{
                            "sdp":sdp,
                            "room":this.state.room
                        });
                    });

                })
                .catch(error =>{
                    console.log("an error occured", error);
                })
            }
        });
        chan.bind("client-answer",function(answer){
            if(answer.room == this.state.room){
                console.log("answer received");
                this.state.caller.setRemoteDescription(new RTCSessionDescription(answer.sdp));
            }
        });
        chan.bind("client-reject",function(ans){
            if(ans.room == this.state.room){
                console.log("Call declined");
                alert("Call to "+ans.rejected+" was politely declined");
                this.endCall();
            }
        });
        chan.bind("client-endcall",function(ans){
            if(ans.room = this.state.room){
                console.log("Call ended");
                this.endCall();
            }
        })

        this.setState({channel:chan});

        this.setState({caller:new window.RTCPeerConnection()});

        this.GetRTCPeerConnection();
        this.GetRTCSessionDescription();
        this.GetRTCIceCandidate();
        this.prepareCaller();
        //     
      }
    }

    //when the component is built set up requirments to make video chat and messaging work
    // componentDidMount(){

    
    // }

    handleTextChange(e){
        // if(e.keyCode === 13){
        //     const payload = {
        //         username: this.state.username,
        //         message:this.state.text
        //     };
        //     //SEND MESSAGE
        //     //_______________________________________________________________________________________LINK HERE was http://localhost:5000
        //     axios.post(process.env.REACT_APP_API_URI + "pusher/message",payload);
        // }
        // else{
            this.setState({text: e.target.value});
        // }
    }

    handleSend(){
        //_______________________________________________________________________________________LINK HERE was http://localhost:5000
//        axios.post("LINK HERE/message",payload);

        // const payload = {
        //     username: this.state.nickname,
        //     message:this.state.text
        // };
        // axios.post(process.env.REACT_APP_API_URI + "pusher/message",payload);

    }

    

    GetRTCIceCandidate() {
        window.RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate ||
            window.mozRTCIceCandidate || window.msRTCIceCandidate;
        return window.RTCIceCandidate;
    }
    GetRTCPeerConnection() {
        window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection ||
            window.mozRTCPeerConnection || window.msRTCPeerConnection;
        return window.RTCPeerConnection;
    }
    GetRTCSessionDescription() {
        window.RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription ||
            window.mozRTCSessionDescription || window.msRTCSessionDescription;
        return window.RTCSessionDescription;
    }
    prepareCaller(){
        // this.setState({caller:new window.RTCPeerConnection()});
        this.state.caller.onicecandidate = function(evt){
            if(!evt.candidate) return;
            console.log("onicecandidate called");
            this.onIceCandidate(this.state.caller,evt);
        };
        this.state.caller.onaddstream = function(evt){
            console.log("onaddstream called");
            const video = document.getElementById("remoteView");
            const vendorURL = window.URL || window.webkitURL;
            if ("srcObject" in video) {
                video.srcObject = evt.stream;
            } else {
                video.src = window.URL.createObjectURL(evt.stream);
            }
            video.play();
        }
    }
    getCam(){
        return navigator.mediaDevices.getUserMedia({
            video:true,
            audio:false
        });
    }
    callUser(user){
        this.getCam().then(stream => {
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
                this.state.channel.trigger("client-sdp",{
                    "sdp": desc,
                    "room":user,
                    "from":this.state.id
                });
                this.setState({room:user});
            })
        })
        .catch(error => {
            console.log('an error occured',error);
        })
    }

    endCall(){
        this.setState({room:undefined});
        this.state.caller.close();
        for(let t of this.state.localUserMedia.getTracks()){t.stop();}
        this.prepareCaller();
    }

    onIceCandidate(peer,evt){
        if(evt.candidate){
            this.state.channel.trigger("client-candidate",{
                "candidate":evt.candidate,
                "room":this.state.room
            });
        }
    }
    
    handleChangeName(e){
        this.setState({nickname:e.target.value});
    }

    handleChangePass(e){
        this.setState({inputPassword:e.target.value});
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
            // this.state.caller.addStream(stream);
            // this.setState({localUserMedia:stream});
            // this.state.caller.createOffer().then(function(desc){
            //     this.state.caller.setLocalDescription(new RTCSessionDescription(desc));
            //     this.channel.trigger("client-sdp",{
            //         sdp:desc,
            //         room:this.props.chatId.match.params.id,
            //         from: this.state.id
            //     });
            //     this.setState({room:this.props.chatId.match.params.id})
            // });
        }).catch((error) => {
            console.log(error);
        })
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
                                        <TextMessageChat chats={this.state.chats} text={this.state.text} username={this.state.username} handleChange={this.handleTextChange} handleSend={this.handleSend}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showPopup ? 
                    <UserLoginPrompt
                        // name={this.state.nickname}
                        // password={this.state.inputPassword}
                        passOnChange={this.handleChangePass.bind(this)}
                        nameOnChange={this.handleChangeName.bind(this)}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
            
            
        );
    }
}
export default TwoPersonChatStation;
