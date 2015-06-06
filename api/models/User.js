/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var crypto = require('crypto');


module.exports = {
  connection: 'innotek_tobacco',
  tableName: 'users',

  attributes: {

  		firstName:          {type: 'string'},
  		lastName:           {type: 'string'},
  		userId:             {type: 'string'},
  		hashedPassword:     {type: 'string'},
  		ip:                 {type: 'string'},
  		isAdmin:            {type: 'boolean', defaultsTo: false},
  		lastLogin:          {type: 'string'},
  		createdAt:          {type: 'date'},
  		middlewares:        {type: 'array'},

  		getFullName: function(){
  			return this.firstName + ' ' + this.lastName;
  		}
  	},

	  //Class method
    encryptPassword: function(password){
  		var sha = crypto.createHash('sha1');
		sha.update(password);
		return sha.digest('hex');
    }
};

