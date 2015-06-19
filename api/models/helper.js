module.exports = {
	createQueryParams: function(opts){
      var query = {};
      var params = Object.getOwnPropertyNames(opts);

      if(params.indexOf('startDate') >= 0 || params.indexOf('endDate') >= 0) 
        query.created_at = {};

      params.forEach(function(element, index){
      	switch(element){
      		case 'startDate':
      			query.created_at['>='] = new Date(opts[element]);
      			break;
      		case 'endDate':
      			query.created_at['<='] = new Date(opts[element]);
      			break;
      		case 'code':
      			query.org_name = new RegExp(opts[element]);
      			break;
      		default:
      			query[element] = opts[element];

      	}


            // if(element == 'startDate'){
            //   query.created_at['>='] = new Date(opts[element]);
            // }

            // if(element == 'endDate')
            //   query.created_at['<='] = new Date(opts[element]);

            // if(element == 'code'){
            //  query.org_name = new RegExp(opts[element]);
            // }else query[element] = opts[element];
      });
      sails.log(query);
      return query;
    }
}