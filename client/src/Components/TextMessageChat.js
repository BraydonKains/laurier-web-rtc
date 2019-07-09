import React from 'react';
class TextMessageChat extends React.Component{
    constructor(props){
        super(props);
        this.state = {textVal:'',textHistory:[]};

        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
    }
    

    handleChange(event){
        this.setState({textVal:event.target.value});
    }

    handleSend(event){
        this.state.textHistory.push(this.state.textVal);
        this.setState({textVal:''});
    }
    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.handleSend();
            this.setState({textVal:''});
        } 
    }


    render(){
        const displayMessages = this.state.textHistory.map((message) => {
            return (
              <li>
                {message}
              </li>
            );
          });
        return(
            <div className="TextMessageChat w-100 h-100">
                
                <div className="messageDisplay mb-2">
                    <ul>
                        {displayMessages}
                    </ul>
                </div>
                <div className="d-inline">
                    <textarea id="userMessage" className="messageInput w-90 float-left" onChange={this.handleChange} value={this.state.textVal} onKeyPress={this.enterPressed}>

                    </textarea>
                    <button className="sendButton" onClick={this.handleSend}>Send</button>
                </div>
                
            </div>
        );
    }
}
export default TextMessageChat;