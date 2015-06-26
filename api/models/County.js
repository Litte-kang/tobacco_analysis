module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'counties',
  autoPK : false,

  attributes: {
  	  id:       {type: 'string', columnName: '_id' ,primaryKey: true},
      name:     {type: 'string'},
    
      
      belongs:  {
        model: 'city'
      },

      towns: {
        collection: 'town',
        via: 'belongs'
      }

  },

  //Class methods
  getCounties: function(cityId, cb){
    County.find({city_id: cityId}).exec(function(err, counties){
      cb(err, counties);
    });
  },

  getCounty: function(id, cb){
    County.findOne({id: id}).exec(function(err, county){
      if(err) cb(err);
      if(county)
        Town.find({county_id: county.id}).exec(function(err, towns){
          
          county.towns = towns;
          sails.log(county);
          cb(err, county);
        });
    });
  }

  // getTowns: function(id, cb){
  //   Town.findOne({id: id}).exec(function(err, town){
  //     cb(err, town);
  //   })
  // }

};