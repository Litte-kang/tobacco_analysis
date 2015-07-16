var helper = require('../helper');

module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'analysis_fresh_breed',

  attributes: {

  		tobacco_no:           {type: 'string'},
  		room_no:              {type: 'string'},
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
      sails.log(query);

      Breed.native(function(err, collection){
        if(err) return cb(err);

          collection.group(
              {room_no: 1, tobacco_no: 1, org_name: 1},
              query,
              {amount: 0, totalA: 0, totalB: 0, totalC: 0, totalD:0},
              function(curr, result){
                result.amount += curr.packing_amount;
                result.totalA += curr.breeds.A;
                result.totalB += curr.breeds.B;
                result.totalC += curr.breeds.C;
                result.totalD += curr.breeds.D;


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
      var groupBy = helper.groupBy(opts);

      Breed.native(function(err, collection){
        if(err) return cb(err);

          collection.group(
              groupBy,
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
                  sails.log(result);
                  cb(err, result);
              })
      })
    },

    analysisType: function(opts, cb){
      var query = helper.createAggregateParams(opts);

      Breed.native(function(err, collection){
        if(err) return cb(err);
        collection.group(
          {room_no: 1, tobacco_no: 1, org_name: 1},
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
      var groupBy = helper.groupBy(opts);
      sails.log(groupBy);
      sails.log(query);

      Breed.native(function(err, collection){
        if(err) return cb(err);
        collection.group(
          groupBy,
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
          {room_no: 1, tobacco_no: 1, org_name: 1},
          query,
          {amount: 0, dry: 0},
          function(curr, result){
            result.amount += curr.packing_amount;
            if(curr.dry_tobacco != null)
              result.dry +=  parseFloat(curr.dry_tobacco.dry_tobacco_weight)
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
      var groupBy = helper.groupBy(opts);
      sails.log(query);
      sails.log(groupBy);

      Breed.native(function(err, collection){
        if(err) cb(err);

        collection.group(
        groupBy,
        query,
        {amount: 0, dry: 0},
        function(curr, result){
            result.amount += curr.packing_amount;
            if(curr.dry_tobacco != null)
              result.dry += curr.dry_tobacco.dry_tobacco_weight;
            else
              result.dry += 0;

            result.amount = parseFloat(result.amount.toFixed(2));
            result.dry = parseFloat(result.dry.toFixed(2));
          },
          function(err, result){
            sails.log(result);
            cb(err, result);
          }
        )
      })
    },

    //鲜烟成熟度统计
    analysisMaturitySummery: function(opts, cb){

      var query = {};
      var groupBy = helper.groupBy(opts);

      var arr = Object.getOwnPropertyNames(opts);

      if(arr.indexOf('startDate') >= 0 || arr.indexOf('endDate') >= 0 )
        query.protocol_created_at = {};

      arr.forEach(function(param, index){

          switch(param){
            case 'code':
            query.middleware = new RegExp(opts[param]);
            break;
          case 'startDate':
            var date = opts[param].split('-');
            query.protocol_created_at['$gte'] = new Date(date[0],date[1],date[2],0,0,0);
            break;
          case 'endDate':
            var endDate = opts[param].split('-');
            query.protocol_created_at['$lte'] = new Date(endDate[0],endDate[1],endDate[2],0,0,0);
            break;
          
          default:
            query[param] = opts[param];
          }
      });
      
      Breed.native(function(err, collection){
        if(err) return cb(err);
          collection.group(
              groupBy,
              query,
              {amount: 0, totalA: 0, totalB: 0, totalC: 0},
              function(curr, result){
                result.amount += curr.packing_amount;
                result.totalA += curr.maturity.A;
                result.totalB += curr.maturity.B;
                result.totalC += curr.maturity.C;
                
                result.amount = parseFloat(result.amount.toFixed(2));
                result.totalA = parseFloat(result.totalA.toFixed(2));
                result.totalB = parseFloat(result.totalB.toFixed(2));
                result.totalC = parseFloat(result.totalC.toFixed(2))
              }, 
              function(err, result){
                  sails.log(result)
                  result.sort();
                  cb(err, result);
              })
      });
    },

    //烘烤总览
    /**

    **/
    roomAnalysis: function(opts, cb){
      var query = helper.createAggregateParams(opts);
      var groupBy = helper.groupBy(opts);

      sails.log(query);
      sails.log(groupBy);
      
      Breed.native(function(err, collection){
        if(err) cb(err);
        collection.group(
          groupBy,
          query,
          {bakingRoom: 0, amount: 0, normalRoom: 0, dryAmount:0, abitrateRoom:0, abitrateTobacco:0, abitrateFinished:0},
          function(curr, result){
            if(!curr.dry_tobacco){
              result.bakingRoom += 1;
              result.amount += curr.packing_amount;
            }else{
              result.normalRoom += 1;
              result.dryAmount += curr.dry_tobacco.dry_tobacco_weight;
            }
            //result.amount += curr.packing_amount;


            result.amount = parseFloat(result.amount.toFixed(2));
            result.dryAmount = parseFloat(result.dryAmount.toFixed(2));
          },function(err, result){
            sails.log(result);
            cb(err, result);
          }
        )
      })
    }

};