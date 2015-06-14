module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'states',
  autoPK : false,

  attributes: {
      _id:      {type: 'string', primaryKey: true, unique: true}, 
      name:     {type: 'string'},
      cities:   {collection: 'city', via: 'belongs'}
  },

  //Class methods
  getAvilableStations: function(){
    
  }

};