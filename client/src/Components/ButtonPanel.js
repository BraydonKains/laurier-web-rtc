import React from 'react';
export default({endChatFunc})=>{
    return(
        <div className="ButtonPanel">
            <div className="container w-100">
                <div className="row">
                    <div className="col pl-2">
                        {/* <button className="addButton rounded">+</button> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col p-2 d-inline">
                        <button className="startButton rounded">Start</button>
                        <button className="float-right stopButton rounded" onClick={endChatFunc}>Exit Chat</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
//export default ButtonPanel;
