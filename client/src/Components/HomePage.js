import React from 'react';
import '../style.css';
import NavBar from './NavBar';
import RoomTable from './RoomTable';
import { Link, Redirect } from "react-router-dom";
import Modal from 'react-modal';

//import * as JQuery from "jquery";

//const $ = JQuery.default;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '55%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class HomePage extends React.Component {

  state = {
    menu : [4,5],
    modalIsOpen: false,

    roomVal:"",
    passwordVal:"",
    typeVal:"0"
  }

  constructor(props) {
    super(props);
    console.log("props");
    console.log(this.props);
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleRoomChange = this.handleRoomChange.bind(this);
      this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

    handleNewRoomNameChange() {

    }

    createRoom() {
	this.closeModal();
    }

  handleRoomChange(event){
    var val = event.target.value;
    this.setState({roomVal:val});
    // console.log(thi);
  }

  handlePasswordChange(event){
    var val = event.target.value;
    this.setState({passwordVal:val});
  }

  handleTypeChange(event){
    var val = event.target.value;
    this.setState({typeVal:val});
  }

  render() {
      return (
        <div> 
            <NavBar menu={this.state.menu} />
            <div className='centerwhite px-3 pt-0 container'>
              <h2>Welcome { this.props.location.username }!</h2>
              <div className="my-4">
                <button onClick={this.openModal}>Create a room</button>
              </div>
              <RoomTable username={this.props.location.username} user_id={this.props.location.user_id} />
            </div>

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              dialogClassName='custom-dialog'
            >
    
              <div className="container">
                <div className="row">
                  <h2 ref={subtitle => this.subtitle = subtitle} className="col-4">Create Room</h2>
                  <button type="button" className="close col-2" onClick={this.closeModal}>&times;</button>
                </div>
                <div className="row col-12">
                  <div className="col-2">Room Name: </div>
                  <div><input onChange={this.handleRoomChange} value={this.state.roomVal} className="col-10"/></div>
                </div>
                <div className="row col-12 mt-4">
                  <div className="col-2">Password: </div>
                  <div><input onChange={this.handlePasswordChange} value={this.state.passwordVal}  className="col-10" type="password"/></div>
                </div>
                <div className="row mt-4 col-12">
                  <div className="col-2">Type: </div>
                  <div className="col-8 ml-3"><input type="radio" name="roomType" checked={this.state.typeVal == "0"} value="0" className="mr-2"  onChange={this.handleTypeChange}/>One to One Session</div>
                </div>
                <div className="row col-12">
                  <div className="col-2"> </div>
                  <div className="col-8 ml-3"><input type="radio" name="roomType" checked={this.state.typeVal == "1"} value="1" className="mr-2" onChange={this.handleTypeChange}/>One to Multiple Session</div>
                </div>
                <Link to="/twopersonchat">
                  <button onClick={this.createRoom}>
                    Create Room
                  </button>
                </Link>
              </div>            
            </Modal>

        </div>
      );
  }
}



export default HomePage;
