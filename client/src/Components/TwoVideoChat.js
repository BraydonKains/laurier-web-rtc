import React from 'react';

export default({remoteView,selfView}) =>{
    return(
    <div className="TwoVideoChat">
        <div className="container w-100">
            <div className="row">
                <div className="col">
                    <video className="w-100" id="selfView" src={selfView}>Your Video</video>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <video className="w-100" id="remoteView" src={remoteView}>Other Person Video</video>
                </div>
            </div>
        </div>
    </div>)
}
//export default TwoVideoChat;
