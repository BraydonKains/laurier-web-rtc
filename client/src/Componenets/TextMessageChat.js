import React from 'react';
class TextMessageChat extends React.Component{
    render(){
        return(
            <div className="TextMessageChat w-100 h-100">
                
                <div className="messageDisplay mb-2">

                </div>
                <div className="d-inline">
                    <textarea className="messageInput w-90 float-left">

                    </textarea>
                    <button className="sendButton">Send</button>
                </div>
                
            </div>
        );
    }
}
export default TextMessageChat;