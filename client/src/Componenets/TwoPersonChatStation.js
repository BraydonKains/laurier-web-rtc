import React from 'react';
import TextMessageChat from './TextMessageChat';
import TwoVideoChat from './TwoVideoChat';
import ButtonPanel from './ButtonPanel';

class TwoPersonChatStation extends React.Component{
    render(){
        return(
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
        );
    }
}
export default TwoPersonChatStation;