module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'counties',
  autoPK : false,

  attributes: {
  	  id:       {type: 'string', primaryKey: true, unique: true, columnName: '_id'},
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
  getCountiesByCity: function(city, cb){
    sails.log('****' + city);
    County.find({city_id: city}).exec(function(err, counties){
      cb(err, counties);
    })
  }

};