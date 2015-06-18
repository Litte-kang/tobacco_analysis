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

      var query = {};

      Object.getOwnPropertyNames(opts).forEach(function(element, index){
            if(element == 'startDate')
              query.created_at = {'>=': opts[element]};
            if(element == 'endDate')
              query.created_at = {'<=': opts[element]};
            if(element == 'code'){
             query.org_name = new RegExp(opts[element]);
            }else query[element] = opts[element];
      }); 

      Breed.native(function(err, collection){
        if(err) return cb(err);

        sails.log(query);
          collection.group(
              {room: 1, tobacco_no: 1, org_name: 1},
              query,
              {amount: 0, totalA: 0, totalB: 0, totalC: 0, totalD:0},
              function(curr, result){
                result.amount += curr.packing_amount
                result.totalA += curr.breeds.A
                result.totalB += curr.breeds.B
                result.totalC += curr.breeds.C
                result.totalD += curr.breeds.D
              },
              function(err, results){
                  results.sort();
                  cb(err, results);
              })
      })
    },

    analysisType: function(opts, cb){
      var query = {};
      Object.getOwnPropertyNames(opts).forEach(function(element, index){
           if(element == 'startDate')
              query.created_at = {'>=': opts[element]};
            if(element == 'endDate')
              query.created_at = {'<=': opts[element]};
            if(element == 'code'){
             query.org_name = new RegExp(opts[element]);
            }else query[element] = opts[element];
      });


      Breed.native(function(err, collection){
        if(err) return cb(err);
        collection.group(
          {room: 1, tobacco_no: 1, org_name: 1},
          query,
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
    },

    //干烟质量分析
    analysisDryTobacco: function(opts, cb){
      var query = {};
      Object.getOwnPropertyNames(opts).forEach(function(element, index){
           if(element == 'startDate')
              query.created_at = {'>=': opts[element]};
            if(element == 'endDate')
              query.created_at = {'<=': opts[element]};
            if(element == 'code'){
             query.org_name = new RegExp(opts[element]);
            }else query[element] = opts[element];
      });

      Breed.native(function(err, collection){
        if(err) return cb(err);

        collection.group(
          {room: 1, tobacco_no: 1, org_name: 1},
          query,
          {amount: 0, dry: 0},
          function(curr, result){
            result.amount += curr.packing_amount;
            if(curr.dry_tobacco != null)
              result.dry +=  parseFloat(curr.dry_tobacco.dry_tobacco_weight) * curr.packing_bar
            else
              result.dry += 0;
          },
          function(err, result){
            cb(err, result);
          }
        );
      })
    }
};