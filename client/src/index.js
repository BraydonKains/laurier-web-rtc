import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Pusher from 'pusher-js';
import ReactDom from 'react-dom';
import Popup from 'react-popup';




ReactDom.render(
  <Popup />,
  document.getElementById('root')
);


Popup.alert('I am alert, nice to meet you');
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


/*
var pusher = new Pusher('ba473cb312963eb9be6a', {
    cluster: 'us2',// process.env.REACT_APP_PUSHER_CLUSTER,
    forceTLS: true,
    authEndpoint: "pusher/auth"
  });
console.log(pusher);

const a = pusher.subscribe("presence-videocall");
const channel = pusher.subscribe("presence-videocall");

function GetRTCIceCandidate() {
    window.RTCIceCandidate =
      window.RTCIceCandidate ||
      window.webkitRTCIceCandidate ||
      window.mozRTCIceCandidate ||
      window.msRTCIceCandidate;

    return window.RTCIceCandidate;
  }

  function GetRTCPeerConnection() {
    window.RTCPeerConnection =
      window.RTCPeerConnection ||
      window.webkitRTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.msRTCPeerConnection;
    return window.RTCPeerConnection;
  }

  function GetRTCSessionDescription() {
    window.RTCSessionDescription =
      window.RTCSessionDescription ||
      window.webkitRTCSessionDescription ||
      window.mozRTCSessionDescription ||
      window.msRTCSessionDescription;
    return window.RTCSessionDescription;
  }

  function onIceCandidate(evt){
    if (evt.candidate) {
        channel.trigger("client-candidate", {
            "candidate": evt.candidate,
            "room": this.state. room
        });
    }
  }

  function prepareCaller() {
    //Initializing a peer connection
    var caller = new window.RTCPeerConnection();
    //Listen for ICE Candidates and send them to remote peers
    caller.onicecandidate = function(evt) {
      if (!evt.candidate) return;
      console.log("onicecandidate called");
      onIceCandidate(caller, evt);
    };
    //onaddstream handler to receive remote feed and show in remoteview video element
    caller.onaddstream = function(evt) {
      console.log("onaddstream called");
      if (window.URL) {
        document.getElementById("remoteview").src = window.URL.createObjectURL(
          evt.stream
        );
      } else {
        document.getElementById("remoteview").src = evt.stream;
      }
    };
  }*/
