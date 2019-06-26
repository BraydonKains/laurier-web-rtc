import React from 'react';
class TwoVideoChat extends React.Component{
    render(){
        return(
            <div className="TwoVideoChat">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <video className="w-100">Your Video</video>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <video className="w-100">Other Person Video</video>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TwoVideoChat;