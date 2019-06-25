var User = require("../models/user.js");

function index() {
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
}

function show(_id) {
    return new User(_id);
}

function create(_user) {
    let u = new User();
    u.username = _user.username;
    // TO DO: Hash the password
    u.password = _user.password;
    u.email = _user.email;
    u.commit();
}

function update(_user) {
    let u = new User(_user.id);
    u.username = _user.username;
    u.email = _user.email;
    u.commit();
}

function destroy(_id) {
    let u = new User(_id);
    u.destroy();
}
