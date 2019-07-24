import React from 'react';
import NavBar from './NavBar';

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {nameVal:"",nameDisplay:"w-75 px-2 mb-2 correctNameEmail",emailVal:"",emailDisplay:"w-75 px-2 mb-2 correctNameEmail",passwordVal:"",paswordVerVal:"",passwordInfoVis:"float-right invisible",lengthClass:"text-success",numPresentClass:"text-success",samePassesClass:"text-success"};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordVerChange = this.handlePasswordVerChange.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
    }
    /*Stores the inputted name value as it is inputted*/
    handleNameChange(event){
        this.setState({nameVal:event.target.value});
    }
    /*Stores the inputted email value as it is inputted*/
    handleEmailChange(event){
        this.setState({emailVal:event.target.value});
    }
    /*Stores the inputted password value as it is inputted*/
    handlePasswordChange(event){
        this.setState({passwordVal:event.target.value});
    }
    /*Stores the inputted rep value as it is inputted*/
    handlePasswordVerChange(event){
        this.setState({passwordVerVal:event.target.value});
    }
    /*Checks input values and creates user if all inputis correct*/
    registerSubmit(event){
        var inputCorrect = true;
        /*Changes name textbox border to red if name textbox is empty, and grey otherwise*/
        if(this.state.nameVal === ""){
            this.setState({nameDisplay:"w-75 px-2 mb-2 incorrectNameEmail"});
            inputCorrect=false;
        }
        else{
            this.setState({nameDisplay:"w-75 px-2 mb-2 correctNameEmail"});
        }
        /*Changes email textbox border to red if name textbox is empty or not email, and grey otherwise*/
        var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.state.emailVal === "" || !emailTest.test(this.state.emailVal)){
            this.setState({emailDisplay:"w-75 px-2 mb-2 incorrectNameEmail"});
            inputCorrect = false;
        }
        else{
            this.setState({emailDisplay:"w-75 px-2 mb-2 correctNameEmail"});
        }
        /*informs user if password is less than 6 or more than 20 characters in length*/
        if(this.state.passwordVal.length < 6 || this.state.passwordVerVal > 20){
            this.setState({lengthClass:"text-danger"});
            inputCorrect = false;
        }
        else{
            this.setState({lengthClass:"text-success"});
        }
        /*informs user if password does not contain a number*/
        if(!/\d/.test(this.state.passwordVal)){
            this.setState({numPresentClass:"text-danger"});
            inputCorrect = false;
        }
        else{
            this.setState({numPresentClass:"text-success"});
        }
        /*informs user if password and password verfied are not the same*/
        if(this.state.passwordVal !== this.state.passwordVerVal){
            this.setState({samePassesClass:"text-danger"});
            inputCorrect = false;
        }
        else{
            this.setState({samePassesClass:"text-success"});
        }
        /*if anything wrong inform user, or input user in DB otherwise*/
        if(inputCorrect){
            this.setState({passwordInfoVis:"float-right invisible"});
            /*
            -try to insert user into DB
            */
        }
        else{
            this.setState({passwordInfoVis:"float-right visible"});
            event.preventDefault();
            
        }
        
    }

    render(){
        return(
            <div className='background'>
                <NavBar menu={[3,6]} />
                <div className="RegisterForm">
                    <div className="contentBack mx-auto mb-4 p-4">
                        <h2>Sign Up</h2>
                        <hr className="bg-dark"></hr>
                        <div className="w-90 mx-auto">
                            <form>
                                <table className="w-50">
                                    <tbody>
                                        <tr>
                                            <td><h6 className="m-0">Name:</h6></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="text" className={this.state.nameDisplay} placeholder="John Doe" onChange={this.handleNameChange}></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="m-0">Email</h6></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="text" className={this.state.emailDisplay} placeholder="johndoe@example.com" onChange={this.handleEmailChange}></input>    
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr></hr>
                                <div>
                                    <div className={this.state.passwordInfoVis}>
                                        <p className="w-25 mb-1">Password must:</p>
                                        <ul>
                                            <li className={this.state.lengthClass}>be 6-20 characters long</li>
                                            <li className={this.state.numPresentClass}>have atleast one number</li>
                                            <li className={this.state.samePassesClass}>Password and repeated password must be the same</li>
                                        </ul>
                                    </div>
                                    <table className="w-50">
                                        <tbody>
                                            <tr>
                                                <td><h6 className="m-0">Password:</h6></td>
                                            </tr>
                                            <tr>
                                                <td><input type="password" className="w-75 px-2 mb-2" onChange={this.handlePasswordChange}></input></td>
                                            </tr>
                                            <tr>
                                                <td><h6 className="m-0">Repeat Password:</h6></td>
                                            </tr>
                                            <tr>
                                                <td><input type="password" className="w-75 px-2 mb-2" onChange={this.handlePasswordVerChange}></input></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr></hr>
                                </div>
                                <div>
                                    <button className="bg-medium-green submitButton rounded float-right" onClick={this.registerSubmit}>Submit</button>
                                    <p className="invisible">Hidden</p>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default RegisterForm;