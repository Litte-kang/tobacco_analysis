module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'information',

  attributes: {
      address:      'string',
      midAddress:   'string',
      createdAt:    'date',
      information:  'array',

      parseInfo: function(){
          var val = 0;
          var n = 0;
          var item = 0;
          var tmp = 0;
          var array = [];
    
          var informations = [
              "干球目标温度",
              "湿球目标温度",
              "总时间",
              "电压",
              "装烟量",
              "风门打开",
              "助燃风机打开",
              "风门关闭",
              "助燃风机关闭",
              "循环风机关闭",
              "循环风机高速",
              "循环风机低速"
          ];
    
          var informationIndex = [
              [0x01, 5, 7],
              [0x04, 6, 8],
          ];
    
          for(var i = 0; i < 5; i++){
              tmp = this.information[n];
              tmp <<= 8;
              n++;
              tmp |= this.information[n];
              n++;
      
              if(2 == i || 3 == i){
                val = tmp;
              }else{
                val = parseFloat(tmp) / 10;
              }
          
            array[item] = val;
            item++;
          }
    
          tmp = this.information[n];
          for(var i = 0; i < 2; ++i){
              if(informationIndex[i][0] == (informationIndex[i][0] & tmp))
                array[item] = informations[informationIndex[i][1]];
              else
                array[item] = informations[informationIndex[i][2]];
              item++;
          }
    
          if(0x00000002 == (0x00000002 & tmp)){
              array[item] = informations[9];
          }else if(0x00000080 == (0x00000080 & tmp)){
              array[item] = informations[11];
          }else if(0x00000040 == (0x00000040 & tmp)){
              array[item] = informations[10];
          }

            return array;
          }
      },

      //Class methods
      findAlarmMessage: function(opt, cb){
          if(opt != null){
            var roomNo = opt;
            
            Station.findOne({room_no: roomNo}).exec(function(err, station){
              if(err) cb(err);

              else if(station){
                  sails.log(station);
                  Alarm.find({address: station.aca, midAddress: station.middleware})
                       .sort('createdAt DESC').limit(20).exec(function(err, results){

                  var array = [];
                  for(var i = 0; i < results.length; i++){
                      var temp = [];
                      sails.log(results[i].parseAlarm());
                      temp.push(results[i].createdAt);
                      temp.push(results[i].parseAlarm()[0]);
                      temp.push(results[i].parseAlarm()[1]);

                      array.push(temp);
                  } 
                  cb(err, {data: array});
                  })
              }else
                cb(err, {data: null});
            });

          }else{
            cb(err, {data: null});
          } 
      }




}