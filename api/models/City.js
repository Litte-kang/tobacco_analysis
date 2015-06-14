module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'cities',
  autoPK : false,

  attributes: {
  	  id:       {type: 'string', primaryKey: true, unique: true, columnName: '_id'},
      name:     {type: 'string'},
      belongs:  {
        model: 'state'
      },

      counties:   {
        collection: 'county',
        via:        'belongs'
      }
  },

  //Class methods
  getCitiesByRole: function(role, cb){
    City.find({code: role}).exec(function(err, cities){
      cb(err, cities);
    })
  },

  getAvilableCounties: function(role, cb){
     City.findOne({code: role}).populate('counties').exec(function(err, data){
        cb(err, data);
     });
  }

};