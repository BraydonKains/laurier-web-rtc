import { start } from "repl";

//uses the structure and techniques used in this repository https://github.com/shanet/WebRTC-Example/blob/master/client/webrtc.js?fbclid=IwAR25tK63n5N60GXawQJjIJI1idxf_xfj1l2Wy5hiO8BLCDI_yBPb2PMLOIg

//connection to local video display
var userVideo;
//connection to remote video display
var chatVideo;
//stream from local video
var userStream;
//rtc peerconnection for local stream
var peerConn;
//connection to server
var serverConn;

//number that uniquly identifies user in server
var uuid;

//this may need to be changed
var peerConnConfig = {
    'iceServers': [
        {'urls': 'stun:stun.stunprotocol.org:3478'},
        {'urls': 'stun.stun.l.google.com:19302'},
    ]
};

/*

*/
function setUp(){
    //create uuid for user
    // MAY NOT NEED ^
    uuid = makeUUID();

    //find the chatter's(local) video and chatee's(remote) video
    userVideo = document.getElementById("userVideo");
    chatVideo = document.getElementById("chatVideo");

    //connect to server with websockets in serverConn
    serverConn = new WebSocket("wss://" +window.location.hostname+" :8080");
    //set up onmessage function to serverConn
    serverConn.onmessage = messageFromServer;

    //set up constarints for chat (both video and audio will be enabled)
    var constraints = {
        video:true,
        audio:true,
    }

    //prompt user for access to video camera
    //if accepted, complete video connection. Set up userMediaSucess for .then and errorHandler for .catch
    if(navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia(constraints).then(getUserMediaSucess).catch(errorHandler);
    }
    //else alert user that browser not support getUserMedia API
    else{
        alert("getUserMedia API not supported in your browser");
    }
}

//connects local stream to user's video
function getUserMediaSuccess(stream){
    userStream = stream;
    userVideo.srcObject = stream;
}

//set up RTC peer connection
function startCall(isCaller){
    //set up RTCPeerConnection in peerConn
    peerConn = new RTCPeerConnection(peerConnConfig);
    //connect peerConn onicecandidate event with the function gotIceCand
    peerConn.onicecandidate = gotIceCand;
    //connect peerConn ontrack event with the function gotRemoteStream
    peerConn.ontrack = gotRemoteStream;

    //OBSOLETE
    //add local stream to peerConn
    peerConn.addStream(userStream);
    //POTENTIAL FIX
    //add local stream to peerConn
    peerConn.addTrack(userStream);

    //if there is a connection or caller create an offer to peerConn with createDescrip for .then and errorHandler for .catch
    if(isCaller){
        peerConn.createOffer().then(createdDescrip).catch(errorHandler);
    }
}

//does actions when messages is received from server
function messageFromServer(message){
    //if there is not a peer connection set up start a call to server ???
    if(!peerConn){
        start(false);
    }

    //parse JSON data from message
    var sig = JSON.parse(message.data);

    //if the message if from yourself ignore it
    if(sig.uuid == uuid){
        return;
    }

    //if the session description is set
    if(sig.sdp){
        //set remote description
        peerConn.setRemoteDescription( new RTCSessionDescription(signal.sdp)).then(function(){
            //then function
            //if the session decription protcol(sdp) is an offer
            if(sig.sdp.type == 'offer'){
                //create an Answer through peero connection with createdDescrip for .then and .cath with errorHandler
                peerConn.createAnswer().then(createdDescrip).catch(errorHandler);
            }
        }).catch(errorHandler);
    }
    //else if ice is set
    else if(signal.ice){
        //add new ice candidate
        peerConn.addIceCandidate(new RTCIceCandidate(sig.ice)).catch(errorHandler);
    }                
}

//sends message to server allerting of new candidate
function gotIceCand(event){
    //if there is a candidiate
    if(event.candidate != null){
        //send message to serve with candidate and uuid
        serverConn.send(JSON.stringify({'ice':event.candidate, 'uuid': uuid}));
    }
}

//sets local description of peer connection
function createdDescrip(descrip){
    peerConn.setLocalDescription(descrip).then(function(){
        serverConn.send(JSON.stringify({'sdp': peerConn.localDescription, 'uuid':uuid}));
    }).catch(errorHandler);
}

//if remote stream is avaliable connect to appropriate video on screen
function gotRemoteStream(event){
    chatVideo.srcObject = event.streams[0];
}

//prints errors in console
function errorHandler(error){
    console.log(error);
}

//creates a random uuid to identify users in server
function makeUUID(){

}