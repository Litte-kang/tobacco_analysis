/*
  整个烘烤流程结果集合
*/


module.exports = {
  connection: 'innotek_tobacco',
  tableName:  'backups',

  attributes: {
      room_no:            {type: 'string'},
      tobacco_no:         {type: 'string'},
      org_name:           {type: 'string'},
  	  address:            {type: 'string'},
      middleware:         {type: 'string'},
  	  arbitrate:          {type: 'json'},
  	  dry_tobacco:        {type: 'json'},
  	  fresh_tobacco:      {type: 'json'},
  	  room_status:        {type: 'json'},
  	  packing:            {type: 'json'},

  	  // owner: {
  	  // 	model: 'station'
  	  // },

  	  //装烟量（斤）
      tobaccoSum: function(){
        return this.packing.average_weight * this.packing.packing_amount;
      },

      //返回烟叶成熟度数组[适熟， 过熟， 欠熟]
      tobaccoMaturity: function(){
      	return  this.fresh_tobacco.maturity.split('/');
      },

      //鲜烟品种
      tobaccoBreed: function(){
      	return this.fresh_tobacco.breed;
      },

      //鲜烟部位
      tobaccoPart: function(){
      	return this.fresh_tobacco.part;
      },

      //鲜烟种类
      tobaccoType: function(){
      	return this.fresh_tobacco.tobacco_type;
      },

      //鲜烟含水量
      waterContent: function(){
      	return this.fresh_tobacco.water_content;
      },

      //鲜烟品质
      tobaccoQuality: function(){
      	return this.fresh_tobacco.quality;
      },

      freshTobaccoImages: function(){
        return this.fresh_tobacco.filename;
      }

  },

  integrateToStation: function(opts, cb){

    var query = {};
    var subQuery = {};
    Object.getOwnPropertyNames(opts).forEach(function(element, index){
        switch(element){
          case 'room_no':
          case 'tobacco_no':
            query[element] = opts[element];
            break;

          case 'code':
            query.middleware = {'startsWith': opts[element]};
            subQuery.middleware ={'startsWith': opts[element]};
            break;

          case 'startDate':
            subQuery.protocol_created_at = {'>=' : opts[element]};
            break;
          case 'endDate':
            subQuery.protocol_created_at = {'<=' : opts[element]};
            break;

          case 'fresh_tobacco.breed':
          case 'fresh_tobacco.part':
            subQuery[element] = opts[element];
            break;
        }
    });

    Tobacco.find(query).exec(function(err, stations){

        if(err) return cb(err);
        if(stations.length > 0){

            sails.log(subQuery);
            Workflow.find(subQuery).exec(function(err, workflows){
                if(err) return cb(err);
                sails.log(workflows);
                for(var i = 0; i < workflows.length; i++){
                    var workflow = workflows[i];
                    
                    for(var j = 0; j < stations.length; j++){
                        
                      if(workflow.middleware.localeCompare(stations[j].middleware) == 0
                                && workflow.address.localeCompare(stations[j].aca) == 0){

                          workflow.room_no = stations[j].room_no;
                          workflow.org_name = stations[j].name;
                          workflow.tobacco_no = stations[j].tobacco_no;

                          break;
                      }
                    }
                }
                
                return cb(null, workflows);
            });
        }

      }
    )
  }
};































