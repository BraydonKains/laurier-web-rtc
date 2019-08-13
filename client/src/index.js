import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

var pusher = new Pusher("XXX-API-KEY", {
    cluster: "XXX-API-CLUSTER",
    encrypted: true,
    authEndpoint: "pusher/auth"
  });

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
  function prepareCaller() {
    //Initializing a peer connection
    caller = new window.RTCPeerConnection();
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
  }