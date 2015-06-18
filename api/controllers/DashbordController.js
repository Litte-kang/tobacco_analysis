/**
 * DashbordController
 *
 * @description :: Server-side logic for managing dashbords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
/*		AnalysisCounty.getAnalysisResult(null, function(err, result){
			if(err) res.negotiate(err);
			return res.view('dashbord', {fullName: req.session.fullName, 
										role: req.session.role ,
										result: result});
		})*/
		var session = req.session;
		switch(session.role.length){
			case 4:
				City.getCounties(session.role, function(err, result){
					if(err) res.negotiate(err);
					return res.view('dashbord', {fullName: session.fullName, result: result});
				});
				break;
		}
		
	}
};

