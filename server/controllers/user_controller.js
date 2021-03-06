const User = require("../models/user.js");
const pool = require("../pool.js");
const bcrypt = require("bcrypt");
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
    u.email = _user.email;
    console.log(_user.password);
    try {
	const hash = await bcrypt.hash(_user.password, 10);

	u.password = hash;
	console.log("user password: " + u.password);
	let result = await u.commit();
	return result;
    } catch(err) {
	if(err) throw err;
	return false;
    }
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
