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
    Workflow.getBackups(req.query, function(err, tobaccos){
      if(err) res.negotiate(err);
      
      return res.send(tobaccos);
    })
  },

  //Return breeds json
  analysisTobaccoBreed: function(req, res) {
    
    Breed.analysisBreed(req.query, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  },

  analysisTobaccoType: function(req, res){

    Breed.analysisType(req.query, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  },

  analysisPacking: function(req, res){

    Packing.analysisPacking(req.query, function(err, result){
      if(err) res.negotiate(err);
      res.send(result);
    })
  },

  //干烟质量分析
  analysisDryTobacco: function(req, res){

    Breed.analysisDryTobacco(req.query, function(err, result){
      if(err) res.negotiate(err);
      res.send(result);
    })
  },

  findBakingHistory: function(req, res){

    Baking.findBakingHistory(req.query, function(err, result){
      if(err) res.negotiate(err);
      res.view('workflow/dry_tobacco/index', {result: result, fullName: req.session.fullName, role: req.session.role});
    })
  },

  bakingAnalysis: function(req, res){
    Baking.aggragateBaking(req.query, function(err, result){
      if(err) res.negotiate(err);
      res.view('workflow/baking/index', {result: result, fullName: req.session.fullName, role: req.session.role});
    })
  },

  roomUsage: function(req, res){
    Baking.aggragateUsage(req.query, function(err, result){
      if(err) res.negotiate(err);
      res.view('workflow/baking/room', {result: result, fullName: req.session.fullName, role: req.session.role});
    })
  }


};

