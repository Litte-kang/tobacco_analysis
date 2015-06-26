/**
 * CityController
 *
 * @description :: Server-side logic for managing cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getCounties: function(req, res){
    County.getCounties(req.params.id, function(err, result){
      if(err) res.negotiate(err);
      return res.send(result);
    })
  }
};

