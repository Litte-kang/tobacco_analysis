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
  		res.send(counties)
  	});
  },


  show: function (req, res) {
    County.getCounty(req.params.id, function(err, county){
      if(err) res.negotiate(err);
      return res.send(county);
    })
  },

  getTowns: function(req, res){
    Town.getTownsByCounty(req.params.id, function(err, towns){
      if(err) res.negotiate(err);
      sails.log(towns);
      return res.send(towns);
    })
  },

  getStationsByTown: function(req, res){
    Station.getStationsByTown(req.params.id, function(err, stations){
      if(err) res.negotiate(err);
      return res.send(stations);
    })
  }

};

