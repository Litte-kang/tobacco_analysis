module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'towns',
  autoPK : false,

  attributes: {
  	  _id:      {type: 'string', primaryKey: true, unique: true},
      name:     {type: 'string'},

      belongs:  {
        model: 'county'
      },

      stations: {
        collection: 'station',
        via: 'belongs'
      }

  }

};