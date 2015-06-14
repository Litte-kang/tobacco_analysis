/**
 * CountyController
 *
 * @description :: Server-side logic for managing counties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `CountyController.show()`
   */

  index: function(req, res){
  	County.getCountiesByCity(req.params.city_id, function(err, counties){
  		if(err) res.negotiate(err);
  		//res.view('counties/index', {counties: counties, fullName: req.session.fullName});
      sails.log('*****' + counties.length);
  		res.send(counties)
  	});
  },


  show: function (req, res) {
    res.send(req.params.id);
  }

};

