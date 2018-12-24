let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');

passport.serializeUser( (user,done) =>{
	done( null,user.id );
});

passport.deserializeUser( (id,done) =>{
	User.findById( id, (err,user) =>{
		done( err,user );
	});
});

passport.use( 'local.signup', new LocalStrategy( {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, ( req,email,password,done ) =>{
	req.checkBody( 'email','Invalid Email' ).notEmpty().isEmail();
	req.checkBody( 'password','Invalid Password' ).notEmpty().isLength( {min:4} );
	let errors = req.validationErrors();
	if( errors ){
		let messages = [];
		errors.forEach( (error) =>{
			messages.push(error.msg);
		});
		return done( null, false, req.flash('error',messages));
	}; 
	User.findOne( { 'email': email }, (err,user) => {
		if(err){
			return done( err );
		};
		if(user){
			return done( null, false, { message:'Email is already in used.'} );
		};
		let newUser = new User();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.save( (err,result) => {
			if(err){
				return done(err);
			};
			return done( null, newUser );
		});
	});
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    });
}));