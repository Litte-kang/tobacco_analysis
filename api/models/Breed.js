var helper = require('../helper');

module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'analysis_fresh_breed',

  attributes: {

  		tobacco_no:           {type: 'string'},
  		room:                 {type: 'string'},
  		userId:               {type: 'string'},
  		org_name:             {type: 'string'},
  		package_amount:       {type: 'float'},
  		created_at:           {type: 'date'},
  		breeds:               {type: 'json'},
      dry_tobacco:          {type: 'json'},
      fresh_tobacco_image:  {type: 'array'},
      tobacco_type:         {type: 'json'}
  	},

    analysisBreed: function(opts, cb){
      var query = helper.createAggregateParams(opts);

      Breed.native(function(err, collection){
        if(err) return cb(err);

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
              function(err, result){
                  result.sort();
                  sails.log(result)
                  cb(err, result);
              })
      })
    },

	  //鲜烟品种合计 
    aggregateBreeds: function(opts, cb){
      var query = helper.createAggregateParams(opts);

      Breed.native(function(err, collection){
        if(err) return cb(err);

          collection.group(
              {county: 1},
              query,
              {amount: 0, totalA: 0, totalB: 0, totalC: 0, totalD:0},
              function(curr, result){
                result.amount += curr.packing_amount
                result.totalA += curr.breeds.A
                result.totalB += curr.breeds.B
                result.totalC += curr.breeds.C
                result.totalD += curr.breeds.D
              },
              function(err, result){
                  result.sort();
                  sails.log(result)
                  cb(err, result);
              })
      })
    },

    analysisType: function(opts, cb){
      var query = helper.createAggregateParams(opts);

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

    analysisTypesSummery: function(opts, cb){
      var query = helper.createAggregateParams(opts);

      Breed.native(function(err, collection){
        if(err) return cb(err);
        collection.group(
          {county :1},
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

    //干烟质量分析明细
    analysisDryTobacco: function(opts, cb){
      var query = helper.createAggregateParams(opts);

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
    },


    analysisDrySummery: function(opts, cb){
      var query = helper.createAggregateParams(opts);

      Breed.native(function(err, collection){
        if(err) cb(err);

        collection.group(
        {county :1},
        query,
        {amount: 0, dry: 0},
        function(curr, result){
            result.amount += curr.packing_amount;
            if(curr.dry_tobacco != null)
              result.dry +=  curr.dry_tobacco.dry_tobacco_weight;
            else
              result.dry += 0;
          },
          function(err, result){
            sails.log(result);
            cb(err, result);
          }
        )
      })
    },


    analysisMaturitySummery: function(opts, cb){

      var query = {};
     
      var arr = Object.getOwnPropertyNames(opts);

      if(arr.indexOf('startDate') >= 0 || arr.indexOf('endDate') >= 0 )
        query.protocol_created_at = {};

      arr.forEach(function(element, index){

          switch(element){
            case 'room_no':
            case 'tobacco_no':
              query[element] = opts[element];
              break;

            case 'code':
              query.middleware = {'startsWith': opts[element]};

              break;

            case 'startDate':
              query.protocol_created_at['>='] = new Date(opts[element]);
              break;
            case 'endDate':
              query.protocol_created_at['<='] = new Date(opts[element]);
              break;

            case 'fresh_tobacco.breed':
            case 'fresh_tobacco.part':
              query[element] = opts[element];
              break;
          }
      });
        
      Breed.native(function(err, collection){
        if(err) return cb(err);
          collection.group(
              {county: 1},
              {city: '永州市'},
              {amount: 0, totalA: 0, totalB: 0, totalC: 0},
              function(curr, result){
                result.amount += curr.packing_amount
                result.totalA += curr.maturity.A
                result.totalB += curr.maturity.B
                result.totalC += curr.maturity.C
                
              },
              function(err, results){
                  results.sort();
                  sails.log(results);
                  cb(err, results);
              })
      });
    },

    roomAnalysis: function(opts, cb){
      ///var query = helper.createAggregateParams(opts);

      Breed.native(function(err, collection){
        if(err) cb(err);
        collection.group(
          {city : 1},
          {city: '永州市'},
          {bakingRoom: 0, amount: 0, normalRoom: 0, dryAmount:0, abitrateRoom:0, abitrateTobacco:0, abitrateFinished:0},
          function(curr, result){
            if(curr.dry_tobacco == null){
              result.bakingRoom += 1;
              result.amount += curr.packing_amount;
            }else{
              result.normalRoom += 1;
              result.dryAmount += curr.dry_tobacco.dry_tobacco_weight;
            }
          },function(err, result){
            sails.log(result);
            cb(err, result);
          }
        )
      })
    }

};