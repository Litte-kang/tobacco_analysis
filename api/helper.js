module.exports = {

	//Uses waterline.js ORM methods
	createQueryParams: function(opts){
	      var query = {};
	      var params = Object.getOwnPropertyNames(opts);

	      if(params.indexOf('startDate') >= 0 || params.indexOf('endDate') >= 0) 
	        query.created_at = {};

	      if(params.indexOf('code') >= 0)
	      	query.middleware = {};

	      params.forEach(function(element, index){
	      	switch(element){
	      		case 'startDate':
	      			query.created_at['>='] = new Date(opts[element]);
	      			break;
	      		case 'endDate':
	      			query.created_at['<='] = new Date(opts[element]);
	      			break;
	      		case 'code':
	      			query.middleware['startsWith'] = opts[element]
	      			break;
	      		default:
	      			query[element] = opts[element];

	      	}
	      });
	     
	      return query;
    },

    //Cause the aggregation using mongodb native method
    //so this query is different from waterline.js ORM method 
	createAggregateParams: function(opts){
      var query = {};
      var params = Object.getOwnPropertyNames(opts);

      if(params.indexOf('startDate') >= 0 || params.indexOf('endDate') >= 0){
      	query.created_at = {};
      }

      params.forEach(function(param){
      	switch(param){
      		case 'code':
      			query.middleware = new RegExp(opts[param]);
      			break;
      		case 'startDate':
      			query.created_at['$gte'] = new Date(opts[param]);
      			break;
      		case 'endDate':
      			query.created_at['$lte'] = new Date(opts[param]);
      			break;
          case 'groupBy':
            break;
      		default:
      			query[param] = opts[param];
      	}
      });

      return query;
    },

    //Aggregation group
    groupBy: function(opts){
      var groupBy = {};
      
      if(opts.groupBy != undefined && opts.groupBy == '2'){
        return {room_no : 1 , tobacco_no : 1, org_name : 1};
      }

      switch(opts['code'].length){
        case 2:
          groupBy.city = 1;
          break;
        case 4:
          groupBy.county = 1;
          break;
        case 6:
          groupBy.town = 1;
          break;
        case 8:
          groupBy.org_name = 1;
          break;
        default:
          groupBy = {room_no : 1 , tobacco_no : 1, org_name : 1}; 
      } 
     		
      return groupBy;
    }
}