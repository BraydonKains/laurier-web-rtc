import React from 'react';
class ButtonPanel extends React.Component{
    render(){
        return(
            <div className="ButtonPanel">
                <div className="container">
                    <div className="row">
                        <div className="col pl-2">
                            <button className="addButton rounded">+</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col p-2 d-inline">
                            <button className="startButton rounded">Start</button>
                            <button className="float-right stopButton rounded">Stop</button>
                        </div>
                    </div>
                </div>
                
                
            </div>
        );
    }
}
export default ButtonPanel;