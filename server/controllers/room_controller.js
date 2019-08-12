const Room = require("../models/room.js");
const pool = require("../pool.js");
const bcrypt = require("bcrypt");

exports.index = async function() {
    var r_arr = [];

    try {
	const res = await pool.query("SELECT * FROM rooms");

	for(i=0; i<res.rows.length; i++) {
	    let r = new Room();
	    r.id = res.rows[i].id;
	    r.owner_id = res.rows[i].username;
	    r.capacity = res.rows[i].capacity;
	    r.open = res.rows[i].open;
	    r_arr.push(r);
	}
    } catch(err) {
	console.log(err);
    }

    console.log(r_arr);
    return r_arr;
}

exports.show = async function(_id) {
    let r = new Room();
    await r.retrieve(_id);
    return r;
}

exports.create = async function(_room) {
    
}
