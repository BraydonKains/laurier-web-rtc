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
		    if(bcrypt.compareSync(password, u.password)) {
			return done(null, u);
		    } else {
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


