/**
 * FreshAnalysisController
 *
 * @description :: Server-side logic for managing Freshanalyses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res){
  	switch(req.session.role.length){
  		case 4:
  			City.getCity(req.session.role, function(err, city){
  				if(err) res.negotiate(err);
  				return res.view('workflow/fresh_tobacco/index', 
  								{place: city, fullName: req.session.fullName, middleware: req.session.middleware, role: req.session.role});
  			});
  		break;
  	}
  },


  maturityAnalysis: function(req, res){
  	Workflow.integrateToStation(req.query, function(err, tobaccos){
      if(err) res.negotiate(err);
      sails.log(tobaccos);
      return res.send(tobaccos);
    });
  },

  //根据地区统计成熟度，返回JSON
  maturitySummery: function(req ,res){
    Breed.analysisMaturitySummery(req.query, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  },

  breedsAnalysis:  function(req, res){
    return res.view('workflow/fresh_tobacco/breeds', {fullName: req.session.fullName, role: req.session.role});
  },

  breedsSummery: function(req, res){
    Breed.aggregateBreeds(req.query, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  },

  //鲜烟类型分析
  typesAnalysis: function(req, res){
    return res.view('workflow/fresh_tobacco/types', {fullName: req.session.fullName, role: req.session.role});
  },

  typesSummery: function(req, res){
    Breed.analysisTypesSummery(req.query, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  },

  //干烟质量分析
  dryTobacco: function(req, res){
    return res.view('workflow/fresh_tobacco/dry', {fullName: req.session.fullName, role: req.session.role});
  },

  dryTobaccoSummery: function(req, res){
    Breed.analysisDrySummery(req.query, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  },

  packings: function(req, res){
    return res.view('workflow/fresh_tobacco/packings', {fullName: req.session.fullName, role: req.session.role});
  }

};

