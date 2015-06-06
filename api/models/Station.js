module.exports = {
  connection: 'innotek_tobacco',
  //tableName: 'fresh_analysis',
  tableName:  'tobaccos',
  attributes: {
  		room_no:             {type: 'string'},
      tobacco_no:          {type: 'string'},
      name:                {type: 'string'},
      aca:                 {type: 'string'},
      middleware:          {type: 'string'}

      // tobaccos: {
      //   collection: 'workflow',
      //   via: 'owner'
      // }
  }
};