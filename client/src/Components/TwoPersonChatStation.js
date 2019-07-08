import React from 'react';
import TextMessageChat from './TextMessageChat';
import TwoVideoChat from './TwoVideoChat';
import ButtonPanel from './ButtonPanel';
import NavBar from './NavBar';

class TwoPersonChatStation extends React.Component{
    render(){
        return(
            <div className="TwoPersonChatStation">
                <h1 className='jumbotron pageName mt-0 mb-4'>Laurier Web-RTC</h1>
                <NavBar page={this.props.page} changePage={this.props.changePage} />
                <div className="contentBack mx-auto mb-4 p-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <TwoVideoChat/>
                                <ButtonPanel/>
                            </div>
                            <div className="col-8">
                                <TextMessageChat/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
/*
<div className="container m-0 p-0 w-100">
                        <div className="row">
                            <div className="col">
                                <TwoVideoChat />
                                <ButtonPanel />
                            </div>
                            <div className="col">
                                <TextMessageChat />
                            </div>
                        </div>
                    </div>
*/
export default TwoPersonChatStation;