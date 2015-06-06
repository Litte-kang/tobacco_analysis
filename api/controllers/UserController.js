/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res){
		User.findOne({userId: req.body.userId, hashedPassword: User.encryptPassword(req.body.password)}).
			exec(function cb(err, user){
				if(err) return res.negotiate(err);
				if(user){
					if(req.wantsJSON)
						res.send(200, {user: user});
					else
						res.redirect('/dashbord');

				} else
					res.send(404,'User Not Found');
			});
	}
};

