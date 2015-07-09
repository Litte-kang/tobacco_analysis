/**
* Baking.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var helper = require('../helper');


module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'analysis_baking',

  attributes: {
  		room_no:          {type: 'string'},
  		tobacco_no:       {type: 'string'},
      org_name:         {type: 'string'},
  		start_time:       {type: 'date'},
  		end_time:         {type: 'date'},
  		fresh_weight:     {type: 'float'},
  		baking_weight:    {type: 'float'},
  		dry_weight:       {type: 'float'},
  		created_at:       {type: 'date'}
  	},

	  //Class method
    findBakingHistory: function(opts, cb){
      var query = helper.createQueryParams(opts);
      
      Baking.find(query).sort('tobacco_no').exec(function(err, data){
        sails.log(data);
        cb(err, data);
      })
    },

    aggragateBaking: function(opts, cb){
      var query = helper.createAggregateParams(opts);
      var groupBy = helper.groupBy(opts);

      Baking.native(function(err, collection){
        if(err) cb(err);
        collection.group(
          groupBy,
          query,
          {bakingAmount:0, count :0, bakedAmount: 0},
          function(curr, result){
            if(curr.history.length > 0){
              result.count += curr.history.length;
              curr.history.forEach(function(history, index){
                result.bakedAmount += history.fresh_weight
              })
            }
            result.bakingAmount += curr.baking_weight
          },function(err, result){
              sails.log(result);
              cb(err,result);
          }
        )
      })
    },

    aggragateUsage: function(opts, cb){
      var query = helper.createAggregateParams(opts);
      var groupBy = helper.groupBy(opts);

      sails.log(groupBy);
      sails.log(query);
      Baking.native(function(err, collection){
        if(err) cb(err);
        collection.group(
          groupBy,
          query,
          {freshAmount:0, dryAmount:0, count: 0, amountTime: 0},
          function(curr, result){
            result.freshAmount += curr.baking_weight;
            if(curr.history.length > 0){
              result.count += curr.history.length;

              curr.history.forEach(function(history, index){
                result.amountTime += (history.end_time.getTime() - history.start_time.getTime())/3600000;
                result.dryAmount += history.dry_weight;
                result.freshAmount += history.fresh_weight;
              })

            }else{
              var date = new Date();
              result.amountTime += (date.getTime() - curr.start_time.getTime())/3600000;
            }

          },function(err, result){
            sails.log(result);
            cb(err, result);
          }
        )
      })

    }
};