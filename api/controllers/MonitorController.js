/**
 * MonitorController
 *
 * @description :: Server-side logic for managing monitors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		res.view('monitor/index');
	},

	alarms: function(req, res){
		Alarm.findAlarmMessage(req.params.roomNo , function(err, results){
			if(err) res.negotiate(err);
			res.send(results);
		})
	}
};

