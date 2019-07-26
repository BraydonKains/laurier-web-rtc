import React from 'react';
class TwoVideoChat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        constraints: { audio: false, video: { width: 300, height: 300 } }
        };
    }

    componentDidMount(){
        const constraints = this.state.constraints;

        navigator.mediaDevices.getUserMedia(this.state.constraints).then((stream) => {
            const video = document.getElementById("userVideo");
            const vendorURL = window.URL || window.webkitURL;
            if ("srcObject" in video) {
                video.srcObject = stream;
              } else {
                video.src = window.URL.createObjectURL(stream);
              }
            video.play();
        }).catch((error) => {
            console.log(error);
        })

    }
    render(){
        return(
            <div className="TwoVideoChat">
                <div className="container w-100">
                    <div className="row">
                        <div className="col">
                            <video className="" id="userVideo">Your Video</video>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <video className="" id="chatVideo">Other Person Video</video>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TwoVideoChat;