/**
* Baking.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/



module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'analysis_baking',

  attributes: {
  		room:             {type: 'string'},
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
      Baking.find().sort('tobacco_no').exec(function(err, data){

        // results = [
        //             [{'a' : 2}, {'a': 5}],
        //             [{'a' : 8}, {'a': 9}]
        //           ]
        var results = [];
        var temp = [];
        var lastNo;
        
        if(data.length > 0)
            for(var i = 0; i < data.length; i++){
              if(temp.length == 0){
                temp.push(data[i]);
                lastNo = data[i].tobacco_no;
              }else{
                if(lastNo == data[i].tobacco_no){
                  temp.push(data[i]);
                  lastNo = data[i].tobacco_no;
                }else{
                  results.push(temp);
                  temp = [];
                  temp.push(data[i]);
                  lastNo = data[i].tobacco_no;
                }
              }
              if(i == data.length -1)
                results.push(temp);
            }

        sails.log(results);
        cb(err, results);
      })
    }
};