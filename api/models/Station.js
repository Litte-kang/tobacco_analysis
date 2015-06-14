module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'stations',
  autoPK : false,

  attributes: {
  	  _id:           {type: 'string', primaryKey: true, unique: true},
      name:          {type: 'string'},
      code:          {type: 'string'},
      createdAt:     {type: 'date'},
      middlewares:   {type: 'array'},

      belongs:  {
        model: 'town'
      }

  }

};