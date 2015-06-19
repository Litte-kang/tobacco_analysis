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
    var result = null;
    var opts = {};
    Object.getOwnPropertyNames(req.query).forEach(function(element, index){
        opts[element] = req.query[element];
    });

    Workflow.integrateToStation(opts, function(err, tobaccos){
      if(err) res.negotiate(err);
      result = tobaccos;
      return res.send(result);
    })
  },

  //Return breeds json
  analysisTobaccoBreed: function(req, res) {
    var opts = {};
    Object.getOwnPropertyNames(req.query).forEach(function(element, index){
        opts[element] = req.query[element];
    });
    
    Breed.analysisBreed(opts, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  },

  analysisTobaccoType: function(req, res){
    var opts = {};
    Object.getOwnPropertyNames(req.query).forEach(function(element, index){
        opts[element] = req.query[element];
    });

    Breed.analysisType(opts, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  },

  analysisPacking: function(req, res){
    var opts = {};
    Object.getOwnPropertyNames(req.query).forEach(function(element, index){
        opts[element] = req.query[element];
    });

    Packing.analysisPacking(opts, function(err, result){
      if(err) res.negotiate(err);
      res.send(result);
    })
  },

  //干烟质量分析
  analysisDryTobacco: function(req, res){
    var opts = {};
    Object.getOwnPropertyNames(req.query).forEach(function(element, index){
        opts[element] = req.query[element];
    });

    Breed.analysisDryTobacco(opts, function(err, result){
      if(err) res.negotiate(err);
      res.send(result);
    })
  },

  findBakingHistory: function(req, res){
    var opts = {};
    Object.getOwnPropertyNames(req.query).forEach(function(element, index){
        opts[element] = req.query[element];
    });

    Baking.findBakingHistory(opts, function(err, result){
      if(err) res.negotiate(err);
      res.send(result)
      //res.view('workflow/dry_tobacco/index', {results: results, fullName: req.session.fullName});
    })
  }


};

