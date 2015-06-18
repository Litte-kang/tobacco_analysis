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
  
    var opts = {};
    Object.getOwnPropertyNames(req.query).forEach(function(element, index){
        opts[element] = req.query[element];
    });

    Workflow.integrateToStation(opts, function(err, tobaccos){
      if(err) res.negotiate(err);
      sails.log(tobaccos == null);

      return res.send({result: tobaccos});
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
      //res.view('workflow/fresh_tobacco/breeds', {results: results, fullName: req.session.fullName});
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
      //res.view('workflow/fresh_tobacco/fresh_type', {results: results, fullName: req.session.fullName});
    })
  },

  analysisPacking: function(req, res){
    var opts = {};
    Object.getOwnPropertyNames(req.query).forEach(function(element, index){
        opts[element] = req.query[element];
    });

    Packing.analysisPacking(opts, function(err, result){
      if(err) res.negotiate(err);
      //res.view('workflow/fresh_tobacco/packings', {results: results, fullName: req.session.fullName});
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

