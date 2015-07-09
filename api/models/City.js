module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'cities',
  autoPK : false,

  attributes: {
  	  id:       {type: 'string', columnName: '_id', primaryKey: true},
      name:     {type: 'string'},
      code:     {type: 'string'},

      belongs:  {
        model: 'state'
      },

      counties:   {
        collection: 'county',
        via:        'belongs'
      }
  },

  
  getCity: function(city, cb){
      City.findOne({_id: city}).exec(function(err, city){
        if(city){
          County.find({city_id: city.id}).exec(function(err, counties){
            city.counties = counties;
            cb(err, city);
          });
        }
      })
  },

  getCounties: function(cityId, cb){
      County.find({city_id: cityId}).exec(function(err, data){
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
          Breed.find({tobacco_no: arr}).exec(function(err, results){
            cb(err, results);
          })
      });
  }

};