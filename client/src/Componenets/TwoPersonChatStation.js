import React from 'react';
import TextMessageChat from './TextMessageChat';
import TwoVideoChat from './TwoVideoChat';
import ButtonPanel from './ButtonPanel';

class TwoPersonChatStation extends React.Component{
    render(){
        return(
            <div className="headerTop">
                <h1 id="titleText">NAME HERE</h1>
                <p className="text-white float-right signOutLink">Sign Out</p>
            </div>
            <div className="headerMiddle">

            </div>
            <div className="headerBottom">
                <div className="w-75 mx-auto">
                <a href="#" className="float-right directoryOption text-dark">Home</a>
                </div>
            </div>
            <div className="contentBack mx-auto mb-3">
                <div className="TwoPersonChatStation p-3">
                    <div className="container m-0 p-0 w-100">
                        <div className="row">
                            <div className="col-4">
                                <TwoVideoChat />
                                <ButtonPanel />
                            </div>
                            <div className="col">
                                <TextMessageChat />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default TwoPersonChatStation;