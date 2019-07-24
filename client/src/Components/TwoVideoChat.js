import React from 'react';
class TwoVideoChat extends React.Component{
    render(){
        return(
            <div className="TwoVideoChat">
                <div className="container w-100">
                    <div className="row">
                        <div className="col">
                            <video className="">Your Video</video>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <video className="">Other Person Video</video>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TwoVideoChat;