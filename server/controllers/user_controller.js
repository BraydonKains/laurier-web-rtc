const User = require("../models/user.js");
const pool = require("../pool.js");
exports.index = function() {
    // SELECT * FROM users
    let u_arr = [];
    pool.query("INSERT INTO users VALUES username = $1, email = $2, password = $3", [this.username, this.email, this.plain_pass])
	.then(res => {
	    for(i=0; i<res.rows.length; i++) {
		let u = new User();
		u.id = res.rows[i].id;
		u.username = res.rows[i].username;
		u.email = res.rows[i].email;
		u.plain_pass = res.rows[i].password;
	    }
	})
	.catch(e => success = false); 
    return u_arr;
}

exports.show = function(_id) {
    return new User(_id);
}

exports.create = function(_user) {
    let u = new User();
    u.username = _user.username;
    // TO DO: Hash the password
    u.plain_pass = _user.password;
    u.email = _user.email;
    let result = u.commit();
    return _user;
}

exports.update = function(_user) {
    let u = new User(_user.id);
    u.username = _user.username;
    u.email = _user.email;
    u.commit();
}

exports.destroy = function(_id) {
    let u = new User(_id);
    u.destroy();
}
