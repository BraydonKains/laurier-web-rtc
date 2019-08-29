const pool = require("../pool.js");

class Room {
    constructor() {
	this.id = null;
	this.name = null;
	this.owner_id = null;
	this.capacity = null;
	this.room_type = null;
	this.open = null;
	this.password = null;
    }

    async retrieve(id) {
	try {
	    const res = await pool.query('SELECT * FROM rooms WHERE id = $1', [id]);
	    
	    if(res.rows.length > 0) {
		this.id = res.rows[0].id;
		this.owner_id = res.rows[0].owner_id;
		this.capacity = res.rows[0].capacity;
		this.open = res.rows[0].open;
		this.room_type = res.rows[0].room_type;
		this.password = res.rows[0].password;
		this.name = res.rows[0].name;
	    }
	} catch(err) {
	    console.log(err);
	}
    }

    async change_room_state() {
	var success = false;
	
	if(this.id) {
	    try {
		const res = await pool.query("UPDATE rooms SET open = $2 WHERE id = $1", [this.id, !this.open]);
		this.open = !this.open;
		success = true;
	    } catch(err) {
		console.log(err);
	    }
	}
	return success;
    }

    async destroy() {
	var success = false;
	if(this.id) {
	    try {
		const res = await pool.query("DELETE FROM rooms WHERE id = $1", [this.id]);
		success = true;
	    } catch(err) {
		console.log(err);
	    }
	}
	return success;
    }

    async commit() {
	var success = false;
	try {
	    const res = await pool.query("INSERT INTO rooms (owner_id, capacity, room_type, password, open, name) VALUES ($1, $2, $3, $4, $5, $6)", [this.owner_id, this.capacity, this.room_type, this.password, this.open, this.name]);
	    success = "created";
	} catch(err) {
	    console.log(err);
	}
	return success;
    }
}

module.exports = Room;
