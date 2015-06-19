/**
* Packing.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var crypto = require('crypto');


module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'analysis_packing',

  attributes: {

  		tobacco_no:         {type: 'string'},
  		room:               {type: 'string'},
  		org_name:           {type: 'string'},
  		packing_amount:     {type: 'float'},
  		packing_bar:        {type: 'integer'},
  		packing_average:    {type: 'float'},
  		farmer:             {type: 'string'},
  		createdAt:          {type: 'date'},
  		operater:           {type: 'string'},
      packing_image:      {type: 'array'},
      packing_category:   {type: 'json'},
      uniformity:         {type: 'json'},
      category_state:     {type: 'json'},
      packing_type:       {type: 'json'},
      rod_uniform:        {type: 'json'}
  	},

    analysisPacking: function(opts, cb){
      var query = {};

      Object.getOwnPropertyNames(opts).forEach(function(element, index){
            if(element == 'startDate')
              query.created_at = {'>=': new Date(opts[element])};
            if(element == 'endDate')
              query.created_at = {'<=': new Date(opts[element])};
            if(element == 'code'){
             query.org_name = new RegExp(opts[element]);
            }else query[element] = opts[element];
      }); 

      Packing.native(function(err, collection){
          if(err) return cb(err);
          collection.group(
              {room: 1, tobacco_no: 1, org_name: 1, packing_average: 1},
              query,
              {amount: 0, bars:0 ,totalA: 0, totalB: 0,
               totalC: 0, totalD: 0, totalE: 0,
               totalF: 0, totalG: 0, totalH: 0,
               totalI: 0, totalJ: 0, totalK: 0
              },
              function(curr, result){
                result.amount += curr.packing_amount
                result.bars   += curr.packing_bar
                result.totalA += curr.packing_category.A
                result.totalB += curr.packing_category.B

                result.totalC += curr.uniformity.A
                result.totalD += curr.uniformity.B
                result.totalE += curr.uniformity.C

                result.totalF += curr.category_state.A
                result.totalG += curr.category_state.B

                result.totalH += curr.packing_type.A
                result.totalI += curr.packing_type.B

                result.totalJ += curr.rod_uniform.A
                result.totalK += curr.rod_uniform.B
              },
              {$sort : { room : 1 } },
          function(err, results){
            cb(err, results);

          })
      })
    },   
};

