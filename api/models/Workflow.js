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
      county:             {type: 'string'},
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

  getBackups: function(opts, cb){
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
              var date = opts[element].split('-');
              query.protocol_created_at['>='] = new Date(date[0],parseInt(date[1]) - 1,date[2],0,0,0);
              break;
            case 'endDate':
              var endDate = opts[element].split('-');
              query.protocol_created_at['<='] = new Date(endDate[0],parseInt(endDate[1]) - 1,endDate[2],23,59,59);
              break;

            case 'fresh_tobacco.breed':
            case 'fresh_tobacco.part':
              query[element] = opts[element];
              break;
          }
      });
      Workflow.find(query).exec(function(err, result){
        cb(err, result);
      })
  }


};































