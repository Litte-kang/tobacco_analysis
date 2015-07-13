$('#protocolStartDate').datepicker({format: 'yyyy-mm-dd'});
$('#protocolEndDate').datepicker({format: 'yyyy-mm-dd'});
function parseAlarm(data){
        
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
      tmp = data[i];
      tmp <<= (i * 8);
      alert_info |= tmp;
      
    }
    
    tmp = data[4];
    tmp <<= 8;
    tmp |= data[5];

    array[array_i++] = (tmp / 10);

    tmp = data[6];
    tmp <<= 8;
    tmp |= data[7];

    array[array_i++] = (tmp / 10);
  
    for(var i = 0; i < 16; ++i){
      if(errorCode[i] == (alert_info & errorCode[i])){
        array[array_i] = errorContent[i];
        array_i++;
      }
    }

    tmp = data[2];
    tmp <<= 8;
    tmp |= data[3];

    array[array_i] = (tmp / 10);

    return array;
}


function sumColumnValues(table, columnIndex){
  var result = 0
  table.api().columns(columnIndex).data().reduce(function(a,b){
    return a + b;
  }).forEach(function(value, index){
    result += parseFloat(value);
  });

  return result;
}

/*
indexs: column index
*/
function generatePieChartDatasets(table, indexs, labels){
  var datasets = [];
  indexs.forEach(function(value, index){
    datasets.push({y: sumColumnValues(table, value), indexLabel: labels[index]});
  });
  return datasets;
}


function createPieChart(chartContainer, datasets){
  
  var chart = new CanvasJS.Chart(chartContainer,
    {
      
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{indexLabel}",
        toolTipContent: "{y} - #percent %",
        dataPoints: datasets
      }
      ]
    });
    chart.render();
}

function initLinkedSelect(){
  $('#place').on('change', function(){
      var county = $('#place').val();
      setStateParam(county);

      $.getJSON('/counties/' + county + '/towns', function(data){
        
        if(data.length > 0){
          var options = '<option value="">选择镇</option>';
          data.forEach(function(town, index){
            options += '<option value="'+ town.id +'">' + town.name + '</option>';
          });
          $(options).appendTo($('#town'));
          $('#towns').show();
        }else{
          $('#towns').find('option').remove();
          $('#towns').hide();
          $('#station').find('option').remove();
          $('#station').hide();
        }

      });
  });

  $('#town').on('change', function(){
      var town = $('#town').val();
      setStateParam(town);

      $.getJSON('/towns/' + town + '/stations', function(data){
        if(data.length > 0){
           
            var options = '<option value="">选择工场</option>';
            data.forEach(function(station, index){
              options += '<option value="' + station.middlewares + '">' + station.name + '</option>';
            });
            $(options).appendTo($('#station'));
            $('#stations').show();
        }else{
          $('#station').find('option').remove();
          $('#station').hide();
        }
      })
    });

  $('#station').on('change', function(){
      setStateParam($('#station').val());
  });
}

function initLinkedSelectByJSON(role){
    var url = '/cities/' + role;
    $.getJSON(url, function(data){
      if(data){
        console.log(data);
        var options = '';
        data.forEach(function(county, index){
          options += '<option value="' +county.id +'">' + county.name + '</option>';
        });
        $(options).appendTo($('#place'));
      }
    });

    $('#place').on('change', function(){
        var county = $('#place').val();
        setStateParam(county);

        $.getJSON('/counties/' + county + '/towns', function(data){
          
          if(data.length > 0){
            var options = '<option value="">选择镇</option>';
            data.forEach(function(town, index){
              options += '<option value="'+ town.id +'">' + town.name + '</option>';
            });
            $(options).appendTo($('#town'));
            $('#towns').show();
          }else{
            $('#towns').find('option').remove();
            $('#towns').hide();
            $('#station').find('option').remove();
            $('#station').hide();
        }
        });
    });

    $('#town').on('change', function(){
        var town = $('#town').val();
        setStateParam(town);

        $.getJSON('/towns/' + town + '/stations', function(data){
          if(data.length > 0){
              console.log(data);
              var options = '<option value="">选择工场</option>';
              data.forEach(function(station, index){
                options += '<option value="' + station.middlewares + '">' + station.name + '</option>';
              });
              $(options).appendTo($('#station'));
              $('#stations').show();
          }else{
            $('#station').find('option').remove();
            $('#station').hide();
        }
        })
      });

    $('#station').on('change', function(){
        setStateParam($('#station').val());
    });
  }


function setStateParam(state){
  stateParam = state;
}

function initAdvanceSearchLink(){
  $('#advance-search-link').on('click', function(){
    if(advanceDisplay)
      $('#search-advance').hide();
    else
      $('#search-advance').show();

    advanceDisplay = !advanceDisplay;
  });
}

function initSearchButton(baseURL, callBack){
  
  $('#searchButton').on('click', function(){
    
    var url = baseURL;
    var roomNo = $('#roomNo').val();
    var tobaccoNo = $('#tobaccoNo').val();
    var tobaccoBreed = $('#tobaccoBreed').val();
    var tobaccoPart = $('#tobaccoPart').val();
   
    var protocolStartDate = $('#protocolStartDate').val();
    var protocolEndDate = $('#protocolEndDate').val();
    
    if(roomNo != '')
      url += 'room_no=' + roomNo + '&'  
    if(tobaccoNo != '')
      url += 'tobacco_no=' + tobaccoNo + '&';
      
    if(tobaccoBreed != '' && tobaccoBreed != undefined)
      url += 'fresh_tobacco.breed=' + tobaccoBreed + '&';
  
    if(tobaccoPart != '' && tobaccoPart != undefined)
      url += 'fresh_tobacco.part=' + tobaccoPart + '&';
   
    if(stateParam != '')
      url += 'code=' + stateParam + '&';
   
    if(protocolStartDate != '' && protocolStartDate != undefined)
      url += 'startDate=' + protocolStartDate + '&';

    if(protocolEndDate != '' && protocolEndDate != undefined)
      url += 'endDate=' + protocolEndDate + '&';

    url = url.substring(0, url.lastIndexOf('&') );
    console.log(url);
    $.getJSON(url, function(data){
        callBack(data);
    });
  });
}