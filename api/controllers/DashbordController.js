/**
 * DashbordController
 *
 * @description :: Server-side logic for managing dashbords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//根据角色长短判断权限 4是市级权限
	index: function(req, res){

		var session = req.session;
		Breed.roomAnalysis(session.middleware, function(err, result){
			if(err) res.negotiate(err);
			return res.view('dashbord', {fullName: session.fullName, result: result});
		})
		
	},

	// overview: function(req, res){
	// 	var session = req.session;
	// 	Breed.roomAnalysis(req.query, function(err, result){
	// 		if(err) res.negotiate(err);
	// 		return res.view('overview', {fullName: session.fullName, result: result});
	// 	})
		
	// }
};

