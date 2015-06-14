/**
 * WorkflowController
 *
 * @description :: 烤房流程操作集合
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  /**
   *  WorkflowTobaccoController.index()`
   */
  index: function (req, res) {
      res.view('workflow/fresh_tobacco/index', {fullName: req.session.fullName});
  },

  getFreshTobaccos: function(req, res){
    Workflow.integrateToStation(null, function(err, tobaccos){
      if(err) res.negotiate(err);
      return res.send({result: tobaccos});
    })
  },

  analysisTobaccoBreed: function(req, res) {
    Breed.analysisBreed(null, function(err, results){
      if(err) res.negotiate(err);
      res.view('workflow/fresh_tobacco/breeds', {results: results, fullName: req.session.fullName});
    })
  },

  analysisTobaccoType: function(req, res){
    Breed.analysisType(null, function(err, results){
      if(err) res.negotiate(err);
      res.view('workflow/fresh_tobacco/fresh_type', {results: results, fullName: req.session.fullName});
    })
  },

  analysisPacking: function(req, res){
    Packing.analysisPacking(null, function(err, results){
      if(err) res.negotiate(err);
      res.view('workflow/fresh_tobacco/packings', {results: results, fullName: req.session.fullName});
      //res.send(results);
    })
  },

  findBakingHistory: function(req, res){
    Baking.findBakingHistory(null, function(err, results){
      if(err) res.negotiate(err);
      res.view('workflow/dry_tobacco/index', {results: results, fullName: req.session.fullName});
    })
  }


};

