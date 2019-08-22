import React from 'react';

export default({remoteView,selfView}) => {
    <div className="TwoVideoChat">
        <div className="container w-100">
            <div className="row">
                <div className="col">
                    <video className="w-100" id="selfView" src={selfView}>Your Video</video>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <video className="" id="remoteView" src={remoteView}>Other Person Video</video>
                </div>
            </div>
        </div>
    </div>
}
export default TwoVideoChat;