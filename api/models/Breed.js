module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'analysis_fresh_breed',

  attributes: {

  		tobacco_no:           {type: 'string'},
  		room:                 {type: 'string'},
  		userId:               {type: 'string'},
  		org_name:             {type: 'string'},
  		package_amount:       {type: 'foat'},
  		created_at:           {type: 'date'},
  		breeds:               {type: 'json'},
      dry_tobacco:          {type: 'json'},
      fresh_tobacco_image:  {type: 'array'},
      tobacco_type:         {type: 'json'}
  	},

	  //Class method
    analysisBreed: function(opts, cb){
      sails.log('Begin breed analysis...');

      Breed.native(function(err, collection){
          if(err) return cb(err);
          collection.group(
              {room: 1, tobacco_no: 1, org_name: 1},
              {},
              {amount: 0, totalA: 0, totalB: 0, totalC: 0, totalD:0},
              function(curr, result){
                result.amount += curr.packing_amount
                result.totalA += curr.breeds.A
                result.totalB += curr.breeds.B
                result.totalC += curr.breeds.C
                result.totalD += curr.breeds.D
              }
              
            ,
          function(err, results){
            cb(err, results);
          })
      })
    },

    analysisType: function(opts, cb){
      sails.log('Begin fresh tobacco type analysis...');

      Breed.native(function(err, collection){
        if(err) return cb(err);
        collection.group(
          {room: 1, tobacco_no: 1, org_name: 1},
          {},
          {amount: 0, totalA:0 , totalB: 0, totalC: 0, totalD:0, totalE: 0},
          function(curr, result){
            result.amount += curr.packing_amount
            result.totalA += curr.tobacco_type.A
            result.totalB += curr.tobacco_type.B
            result.totalC += curr.tobacco_type.C
            result.totalD += curr.tobacco_type.D
            result.totalE += curr.tobacco_type.E
          },
          function(err, results){
            cb(err, results);
          }
        )
      })
    }
};