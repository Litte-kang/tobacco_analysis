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
  getCity: function(code, cb){
      City.findOne({code: code}).exec(function(err, city){
        cb(err, city);
      })
  },

  getCounties: function(city, cb){
    sails.log('City code ' + city);
      City.find({code: city}).populate('counties').exec(function(err, data){
        cb(err, data);
      })
  },


  getAviableRooms: function(city, cb){
      Tobacco.find({middleware: {'startsWith': city}, select: ['tobacco_no']}).exec(function(err, tobaccos){
        if(err) cb(err);
        else
          var arr = [];
          tobaccos.forEach(function(element, index){
            arr.push(element.tobacco_no);
          })
          sails.log(arr);
          Breed.find({tobacco_no: arr}).exec(function(err, results){
            cb(err, results);
          })
      });
  }

};