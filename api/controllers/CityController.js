/**
 * CityController
 *
 * @description :: Server-side logic for managing cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `CityController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },


  /**
   * `CityController.show()`
   */
  show: function (req, res) {
    City.getCity(req.params.id, function(err, city){
      if(err) res.negotiate(err);
      return res.view('workflow/fresh_tobacco/index', 
                      {fullName: req.session.fullName,
                       place: city.name,
                       code: city.code});
    }); 
  },

  breeds: function(req, res){
    City.getCity(req.params.id, function(err, city){
      if(err) res.negotiate(err);
      return res.view('workflow/fresh_tobacco/breeds', {fullName: req.session.fullName,
                                                        place: city.name,
                                                        code: city.code});
    });
  },

  types: function(req, res){
    City.getCity(req.params.id, function(err, city){
      if(err) res.negotiate(err);
      return res.view('workflow/fresh_tobacco/types', 
                      {fullName: req.session.fullName, place: city.name, code: city.code});
    });
  },

  dries: function(req, res){
    City.getCity(req.params.id, function(err, city){
      if(err) res.negotiate(err);
      return res.view('workflow/fresh_tobacco/dry', 
                      {fullName: req.session.fullName, place: city.name, code: city.code});
    });
  },

  bakingHistory: function(req, res){
    City.getCity(req.params.id, function(err, city){
      if(err) res.negotiate(err);
      return res.view('workflow/dry_tobacco/index', 
                      {fullName: req.session.fullName, place: city.name, code: city.code});
    });
  },

  packings: function(req, res){
    City.getCity(req.params.id, function(err, city){
      if(err) res.negotiate(err);
      return res.view('workflow/fresh_tobacco/packings', 
                      {fullName: req.session.fullName, place: city.name, code: city.code});
    });
  },

  alarms: function(req, res){
    City.getCity(req.params.id, function(err, city){
      if(err) res.negotiate(err);
      return res.view('monitor/index', 
                      {fullName: req.session.fullName, place: city.name, code: city.code});
    });
  }
};

