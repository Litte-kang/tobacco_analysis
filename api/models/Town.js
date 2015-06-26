module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'towns',
  autoPK : false,

  attributes: {
  	  id:       {type: 'string', primaryKey: true, columnName: '_id'},
      name:     {type: 'string'},
      code:     {type: 'string'},

      belongs:  {
        model: 'county'
      },

      stations: {
        collection: 'station',
        via: 'belongs'
      }

  },

  getTownsByCounty: function(countyId, cb){
    Town.find({county_id: countyId}).exec(function(err, towns){
      cb(err, towns);
    })
  }

};