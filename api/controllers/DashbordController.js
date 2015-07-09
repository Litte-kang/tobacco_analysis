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
		req.query.code = session.role;

		Breed.roomAnalysis(req.query, function(err, result){
			if(err) res.negotiate(err);
			if(req.wantsJSON) return res.send(result); 
			return res.view('dashbord', {fullName: session.fullName, result: result, role: session.role});
		})
		
	}
};

