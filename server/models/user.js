const pool = require("../pool.js");

class User {
    constructor(id = 0) {
	if(id > 0) { 
	    pool.query('SELECT * FROM users WHERE id = $1', [_id])
		.then(res => {
		    if(res.rows.length > 0) {
			this.id = res.row[0].id;
			this.username = res.row[0].username;
			this.email = res.row[0].email;
			this.plain_pass = null;
		    } else {
			this.id = null;
			this.username = null;
			this.email = null;
			this.plain_pass = null;
		    }
		})
		.catch(e => console.log(e));
	} else {
	    this.id = null;
	    this.username = null;
	    this.email = null;
	    this.plain_pass = null;
	}
    }

    commit() {
	var success = "cheese curds";
	if(this.id != null) {
	    pool.query("UPDATE users username = $2, email = $3 WHERE id = $1", [this.id, this.username, this.email])
	    .then(res => {
		success = true;
	    })
	    .catch(e => success = e); 
	} else {
	    pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [this.username, this.email, this.plain_pass])
	    .then(res => {
		success = "aaahhh";
	    })
	    .catch(e => success = "aaaahhhh"); 
	}
	return success;
    }

    destroy() {
	var success = true;
	if(this.id) {
	    pool.query("DELETE FROM users WHERE id = $1", [this.id])
		.then(res => {
		    success = true;
		})
		.catch(e => success = false); 
	}
	return success;
    }
}

module.exports = User;
