/**
 * MonitorController
 *
 * @description :: Server-side logic for managing monitors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		res.view('monitor/index', {fullName: req.session.fullName});
	},

	alarms: function(req, res){
		Alarm.findAlarmMessage(req , function(err, results){
			if(err) res.negotiate(err);
			sails.log(results.length);
			res.send(results);
		})
	}
};

