/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/*
	User.role.length 2 => states ,4 => city , 6 => county , 8=> town, 10 => station 
	*/
	login: function(req, res){
		User.findUserByUserIdAndPassword(req.body, function(err, user){
			if(err) res.negotiate(err);
			if(user){
				req.session.authenticated = true;
				req.session.user = user._id;
				req.session.role = user.role;
				req.session.fullName = user.fullName();
				req.session.middleware = user.middlewares[0];
				
				if(req.wantsJSON) return res.send({user: user});
				return res.redirect('/dashbord');

			}else{
				req.session.authenticated = false;
				return res.view('homepage', {msg: 'Invalid userId or password'});
			}
		})
	}
};

