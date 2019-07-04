const User = require("../models/user.js");
const pool = require("../pool.js");
exports.index = async function() {
    // SELECT * FROM users
    var u_arr = [];
    try {
	const res = await pool.query("SELECT * FROM users");

	for(i=0; i<res.rows.length; i++) {
	    let u = new User();
	    u.id = res.rows[i].id;
	    u.username = res.rows[i].username;
	    u.email = res.rows[i].email;
	    u.plain_pass = res.rows[i].password;
	    u_arr.push(u);
	}
    } catch(err) {
	console.log(err);
    }

    console.log(u_arr);
    return u_arr;
}

exports.show = async function(_id) {
    let u = new User();
    await u.retrieve(_id);
    return u;
}

exports.create = async function(_user) {
    let u = new User();
    u.username = _user.username;
    // TO DO: Hash the password
    u.plain_pass = _user.password;
    u.email = _user.email;
    let result = await u.commit();
    return result;
}

exports.update = async function(_user) {
    let u = new User();
    console.log(_user);
    await u.retrieve(_user.id);
    u.username = _user.username;
    u.email = _user.email;
    let result = await u.commit();
    return result;
}

exports.destroy = async function(_id) {
    let u = new User();
    await u.retrieve(_id);
    let result = await u.destroy();
    return result;
}
