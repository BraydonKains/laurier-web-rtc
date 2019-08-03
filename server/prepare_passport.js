var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;
var User = require('./models/user.js');
var bcrypt = require('bcrypt');

exports.prepare = () => {
    passport.use(new LocalStrategy(function(username, password, done) {
	let u = new User();
	
	u.retrieve_name(username)
	    .then(() => {
		if(u.id != null) {
		    console.log("hello in then");
		    if(bcrypt.compareSync(password, u.password)) {
			console.log("wow we did it");
			return done(null, u);
		    } else {
			console.log("wow we did not");
			return done(null, false);
		    }
		}
	    })
	    .catch((err) => {
		console.log(err);
		return done(null, false);
	    });
    }));

    passport.serializeUser(function(user, done) {
	done(null, user.id);
    });
    
    passport.deserializeUser(function(user, done){
	let u = new User();
	u.retrieve(user.id)
	    .then((res) => {
		done(null, u);
	    })
	    .catch((err) => {
		done(err, null);
	    });
    });
}


