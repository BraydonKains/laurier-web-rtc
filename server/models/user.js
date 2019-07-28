const pool = require("../pool.js");

class User {
    constructor() {
	this.id = null;
	this.username = null;
	this.email = null;
	this.plain_pass = null;
    }

    async retrieve(id) {
	try {
	    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

	    if(res.rows.length > 0) {
		this.id = res.rows[0].id;
		this.username = res.rows[0].username;
		this.email = res.rows[0].email;
		this.password = res.rows[0].password;
	    }
	} catch(err) {
	    console.log(err);
	}
    }

    async retrieve_name(name) {
	try {
	    const res = await pool.query("SELECT * FROM users WHERE username = $1", [name]);

	    if(res.rows.length > 0) {
		this.id = res.rows[0].id;
		this.username = res.rows[0].username;
		this.email = res.rows[0].email;
		this.password = res.rows[0].password;
	    }
	} catch(err) {
	    console.log(err);
	    return false;
	}
    }

    async commit() {
	var success = false;
	if(this.id != null) {
	    try {
		const res = await pool.query("UPDATE users SET username = $2, email = $3 WHERE id = $1", [this.id, this.username, this.email]);
		success = "updated";
	    } catch(err) {
		console.log(err);
	    }
	} else {
	    try {
		const res = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [this.username, this.email, this.password])
		success = "created";
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
		const res = await pool.query("DELETE FROM users WHERE id = $1", [this.id]);
		success = true;
	    } catch(err) {
		console.log(err);
	    }
	}
	return success;
    }

}

module.exports = User;
