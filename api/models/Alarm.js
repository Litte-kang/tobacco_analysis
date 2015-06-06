module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'alarmhistories',

  attributes: {
      address:    'string',
      midAddress: 'string',
      createdAt:  'date',
      data:       'array',


      parseAlarm: function(){
        var array = [];
        var alert_info = 0;
    
        var array_len = 0;
        var length = 16;
    
    
        var array_i = 0;
        var tmp = 0;
    
        var errorCode =[
          0x00000001,
          0x00000002,
          0x00000004,
          0x00000008,
          0x00000010,
          0x00000020,
          0x00000040,
          0x00000080,
          0x00000100,
          0x00000200,
          0x00000400,
          0x00000800,
          0x00001000,
          0x00002000,
          0x00004000,
          0x00008000
        ];
    
        var errorContent = [
          "稳定温度超时，请重新设置数据",
          "物联网连接失败",
          "变频器通讯失败",
          "干球温度偏高",
          "干球温度偏低",
          "湿球温度偏高",
          "湿球温度偏低",
          "传感器故障",
          "风机无电流",
          "风机缺相",
          "风机过载",
          "电压偏低，请关闭系统电源",
          "电压偏高，请关闭系统电源",
          "晶体失效，请换主板",
          "故障：存储器数据错误，请恢复出厂值",
          "null"
        ];
    
        //array_len = this.data.length - 4;
    
        for(var i = 0; i < 2; ++i){
          tmp = this.data[i];
          tmp <<= (i * 8);
          alert_info |= tmp;
          
        }
        
        tmp = this.data[4];
        tmp <<= 8;
        tmp |= this.data[5];
    
    
        array[array_i++] = parseFloat(tmp) /10;
    
        tmp = this.data[6];
        tmp <<= 8;
        tmp |= this.data[7];
    
        array[array_i++] = parseFloat(tmp) /10;
      
        for(var i = 0; i < length; ++i){
          if(errorCode[i] == (alert_info & errorCode[i])){
            array[array_i] = errorContent[i];
            array_i++;
          }
        }
    
        //tmp = (alert_info & 0x00ff0000) >> 8;
        //tmp |= (alert_info & 0xff000000) >> 24;
        tmp = this.data[2];
        tmp <<= 8;
        tmp |= this.data[3];

        array[array.length - 1] = parseFloat(tmp) / 10;
    
        
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

                
                // var contents = results[i].parseAlarm();
                // sails.log(contents);
                // if(contents.length > 3)
                //   temp.push(contents.slice(2, contents.length-1));
                // else
                //   temp.push('');

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