module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'analysis_fresh_group_by_county',

  attributes: {
  		package_amount:       {type: 'foat'},
      package_bar:          {type: 'integer'},
  		breeds:               {type: 'json'},
      tobacco_type:         {type: 'json'},
      created_at:           {type: 'date'}
  	},

    getAnalysisResult: function(opt, cb){
        AnalysisCounty.find().exec(function(err, result){
            cb(err, result);
        })
    }

}