import React from 'react';
import '../style.css';
import { Link } from "react-router-dom";

class RooomTable extends React.Component {
    
    state = {
	room_list: []
    }

    constructor(props) {
	super(props);

	fetch(process.env.REACT_APP_API_URI + 'rooms/user/' + this.props.user_id, {
	    method: 'GET',
	    mode: 'cors',
	    cache: 'no-cache',
	    headers: {
		'Content-Type': 'application/json',
	    }
	})
	.then(res => res)
	.then(res => {
	    console.log("found rooms");
	    this.setState({roomList: res.room_list});
	})
	.catch(err => {
	    console.log(err);
	});
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
		    {
			this.state.room_list.map(room => (
			    <tr>
				<th scope="row">{room.id}</th>
				<td>{room.name}</td>
				<td>One to One Session</td>
				<td>
				    <Link to={{
					pathname: "/room/" + room.id,
					state: {
					    user_id: this.props.user_id,
					    username: this.props.username
					}
				    }}>
					<button>Open Room</button>
				    </Link>
				</td>
			    </tr>
			))
		    }
                </tbody>
            </table>

        );
    }

}

export default RooomTable;
