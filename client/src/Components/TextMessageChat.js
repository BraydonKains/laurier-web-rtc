import React from 'react';

export default({chats,text,username,handleChange,handleSend}) =>{
    return(
    <div className="TextMessageChat w-100 h-100 container">
        <div className="row h-90">
            <div className="col">
            <div className="messageDisplay mb-2">
                <ul>
                    {chats.map(chat => {
                        return <li>{chat}</li>;
                    })}
                </ul>
            </div>
            </div>
        </div>
        <div className="row h-10">
            <div className="col">
                <div className="d-inline">
                    <textarea id="userMessage" className="messageInput w-90 float-left" onChange={handleChange} onKeyDown={handleChange}>

                    </textarea>
                    <button className="sendButton" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    
    
    
    </div>);
}

//export default TextMessageChat;
