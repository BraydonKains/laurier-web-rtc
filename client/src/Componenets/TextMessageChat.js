import React from 'react';
class TextMessageChat extends React.Component{
    constructor(props){
        super(props);
        this.state = {textVal:''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.state.textVal = 
    }
    render(){
        return(
            <div className="TextMessageChat w-100 h-100">
                
                <div className="messageDisplay mb-2">

                </div>
                <div className="d-inline">
                    <textarea className="messageInput w-90 float-left" onChange={this.handleChange}>

                    </textarea>
                    <button className="sendButton">Send</button>
                </div>
                
            </div>
        );
    }
}
export default TextMessageChat;