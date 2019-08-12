import React from 'react';
import TextMessageChat from './TextMessageChat';
import TwoVideoChat from './TwoVideoChat';
import ButtonPanel from './ButtonPanel';
import NavBar from './NavBar';

class TwoPersonChatStation extends React.Component{

    state = {
        menu :[1, 5]
    }

    render(){
        return(
            <div class="background">
                <NavBar menu={this.state.menu} />
                <div className='centerwhite px-3 pt-0 container'>
                    <div className="TwoPersonChatStation">
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
                </div>
                
            </div>
            
            
        );
    }
}
export default TwoPersonChatStation;