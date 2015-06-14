/**
 * DashbordController
 *
 * @description :: Server-side logic for managing dashbords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		AnalysisCounty.getAnalysisResult(null, function(err, result){
			if(err) res.negotiate(err);
			//res.send(result);
			return res.view('dashbord', {fullName: req.session.fullName, result: result});
		})
			
	}
};

