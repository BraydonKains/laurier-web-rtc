import React from 'react';
class TwoVideoChat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            remoteSrc:{},
            selfSrc:{},
            usersOnline:{},
            id:{},
            users:[],
            room:{},
            caller:{},
            localUserMedia:{},
        };
    }

    componentDidMount(){
        var pusher = new Pusher("078e55748f7f3fd3184a", {
            cluster: "us2",
            encrypted: true,
            authEndpoint: "pusher/auth"});
        const channel = pusher.subscribe("presence-videocall");
        
        channel.bind("pusher:subscription_succeed",members=>{
            this.setState({usersOnline:members.count,id:channel.members.id});
            members.each(member=>{
                if(member.id != channel.members.me.id)
                    this.setState({users:this.state.users.concat(member.id)});
            });
            //if professor
                //have their video show in self view

        });
        channel.bind("pusher:member_added",member => {
            this.setState({users:this.state.users.concat(member.id)});
            //if professor
                //have their video show in self view
        });
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
            //if professor left
                //close chat
        });
        this.GetRTCPeerConnection();
        this.GetRTCSessionDescription();
        this.GetRTCIceCandidate();

        var caller = new window.RTCPeerConnection();
        alert(channel.subscribed);
        

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
                const video = document.getElementById("remoteView");
                const vendorURL = window.URL || window.webkitURL;
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream);
                }
            }
        }
        

        var getCam = function(){
            return navigator.mediaDevices.getUserMedia({
                video:true,
                audio:false
            });
        };

        // getCam().then((stream) => {
        //     const video = document.getElementById("selfView");
        //     const vendorURL = window.URL || window.webkitURL;
        //     if ("srcObject" in video) {
        //     video.srcObject = stream;
        //     } else {
        //     video.src = window.URL.createObjectURL(stream);
        //     }
        //     video.play();
        // }).catch((error) => {
        //     console.log(error);
        // })

        //should only be used if student
        var callUser = function(user){
            getCam.then(stream => {
                const video = document.getElementById("selfView");
                const vendorURL = window.URL || window.webkitURL;
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream);
                }
                video.play();
                // this.toggleEndCallButton();
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
            })
            .catch(error => {
                console.log("ERROR: ",error);
            });
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

    // endCall() {
    //     this.setState({room : undefined});
    //     this.state.caller.close();
    //     for (let track of this.state.localUserMedia.getTracks()) {
    //       track.stop();
    //     }

    //     //-------------------------------------------------------------------------------------CHANGE THIS PORTION(LEAVE CHAT)
    //     prepareCaller();
    //     toggleEndCallButton();
    //   }  

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

    // componentDidMount(){
    //     const constraints = this.state.constraints;

    //     navigator.mediaDevices.getUserMedia(this.state.constraints).then((stream) => {
    //         const video = document.getElementById("userVideo");
    //         const vendorURL = window.URL || window.webkitURL;
    //         if ("srcObject" in video) {
    //             video.srcObject = stream;
    //           } else {
    //             video.src = window.URL.createObjectURL(stream);
    //           }
    //         video.play();
    //     }).catch((error) => {
    //         console.log(error);
    //     })

    // }
    render(){
        return(
            <div className="TwoVideoChat">
                <div className="container w-100">
                    <div className="row">
                        <div className="col">
                            <video className="w-100" id="selfView">Your Video</video>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <video className="" id="remoteView">Other Person Video</video>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TwoVideoChat;