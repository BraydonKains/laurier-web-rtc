import React from 'react';
import '../style.css';
import NavBar from './NavBar';
import RoomTable from './RoomTable';
import { Link, Redirect } from "react-router-dom";

import * as JQuery from "jquery";

const $ = JQuery.default;


const goToPage = () => function(){
  return <Redirect to="/twopersonchat" />;
}




class HomePage extends React.Component {

  state = {
    menu : [4,5]
  }

  render() {
      return (
        <div> 
            <NavBar menu={this.state.menu} />
            <div className='centerwhite px-3 pt-0 container'>
              <h2>Welcome Chinh!</h2>
              <div className="my-4">
                <button data-toggle="modal" data-target="#myModal">Create a room</button>
              </div>
              <RoomTable />
            </div>

            <div className="modal" id="myModal">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Create Room</h3>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body container">
                      <div className="row col-12">
                        <div className="col-2">Room Name: </div>
                        <div><input className="col-12"/></div>
                      </div>
                      <div className="row col-12 mt-4">
                        <div className="col-2">Password: </div>
                        <div><input className="col-12" type="password"/></div>
                      </div>
                      <div className="row mt-4 col-12">
                        <div className="col-2">Type: </div>
                        <div className="col-8 ml-3"><input type="radio" name="roomType" value="0" className="mr-2" />One to One Session</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-2"> </div>
                        <div className="col-8 ml-3"><input type="radio" name="roomType" value="0" className="mr-2" />One to Multiple Session</div>
                      </div>
                    
                      <button onClick={goToPage}>Create Now!</button>
                      
                  </div>
                </div>
              </div>
            </div>
        </div>
      );
  }
}





export default HomePage;