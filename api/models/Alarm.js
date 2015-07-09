var helper = require('../helper');

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
          0x0001,
          0x0002,
          0x0004,
          0x0008,
          0x0010,
          0x0020,
          0x0040,
          0x0080,
          0x0100,
          0x0200,
          0x0400,
          0x0800,
          0x1000,
          0x2000,
          0x4000,
          0x8000
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
    
        array[array_i++] = (tmp / 10);
    
        tmp = this.data[6];
        tmp <<= 8;
        tmp |= this.data[7];
    
        array[array_i++] = (tmp / 10);
      
        for(var i = 0; i < 16; ++i){
          if(errorCode[i] == (alert_info & errorCode[i])){
            array[array_i] = errorContent[i];
            array_i++;
          }
        }
    
        tmp = this.data[2];
        tmp <<= 8;
        tmp |= this.data[3];

        array[array_i] = (tmp / 10);
    
        
        return array;
      }
  },

  //Class methods
  findAlarmMessage: function(opts, cb){
    var pointsPerDay = 24 * 30;

    Tobacco.findOne({room_no: opts.params.roomNo, middleware: '4311290111'}).exec(function(err, data){
      if(err) cb(err);
      if(data){        
        var points = [];
        var query = {};
        sails.log(opts.query.startDate);
        query.createdAt = {'>=' : new Date(opts.query.startDate), 
                       '<=' : new Date(opts.query.endDate.split('-')[0],
                                        opts.query.endDate.split('-')[1],
                                        opts.query.endDate.split('-')[2], 23,59,59)};
        query.midAddress = data.middleware;
        query.address = data.aca;
        
        
        Alarm.find(query).exec(function(err, result){
          cb(err, result);
        })
        
      }else
        cb(null);
    })
  }
  

}