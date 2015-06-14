/**
 * nullPolicy
 *
 * @module      :: Policy
 * @description :: Anybody could run this action
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
	return next();
};