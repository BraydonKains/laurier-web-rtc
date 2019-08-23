import React from 'react';
import '../style.css';
import { Link } from "react-router-dom";

class RooomTable extends React.Component {

    displayRoomItem() {
        return (
            <tr>
                <th scope="row">1</th>
                <td>Appointment</td>
                <td>August 22, 2019</td>
                <td>One to One Session</td>
                <td>
                    <Link to="/twopersonchat">
                        <button>Open Room</button>
                    </Link>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.displayRoomItem()}
                    {this.displayRoomItem()}
                </tbody>
            </table>

        );
    }

}

export default RooomTable;