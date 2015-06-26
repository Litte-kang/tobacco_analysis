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
	      			//query.org_name = new RegExp(opts[element]);
	      			query.middleware['startsWith'] = opts[element]
	      			break;
	      		default:
	      			query[element] = opts[element];

	      	}
	      });
	      sails.log(query);
	      return query;
    },

    //Use mongodb native methods
	createAggregateParams: function(opts){
      var query = {};

      var params = Object.getOwnPropertyNames(opts);

      if(params.indexOf('startDate') >= 0 || params.indexOf('endDate') >= 0){
      	query.created_at = {};
      }

      params.forEach(function(param, index){
      	switch(param){
      		case 'code':
      			query.middleware = new RegExp(opts[param]);
      			break;
      		case 'startDate':
      			query.created_at['$gt'] = new Date(opts[param]);
      			break;
      		case 'endDate':
      			query.created_at['$lt'] = new Date(opts[param]);
      			break;
      		case 'groupBy':

      			break;
      		default:
      			query[param] = opts[param];
      	}
      })

      sails.log(query);
      return query;
    },

    groupBy: function(opts){
    	var groupBy = {};

      	var params = Object.getOwnPropertyNames(opts);
    	    if(params.indexOf('groupBy') >= 0)
		      	switch(parseInt(opts['groupBy'])){
		      		case 1:
		      			groupBy.city = 1;
		      			break;
		      		case 2:
		      			groupBy.county = 1;
		      			break;
		      		case 3:
		      			groupBy.town = 1;
		      			break;
		      		case 4:
		      			groupBy.org_name = 1;
		      			break;
		      	}
     		else
      			groupBy = {room : 1 , tobacco_no : 1, org_name : 1};
      		
      	sails.log(groupBy);
      	return groupBy;
    }
}