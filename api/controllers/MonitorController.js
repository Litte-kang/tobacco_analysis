/**
 * MonitorController
 *
 * @description :: Server-side logic for managing monitors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		res.view('monitor/index', {fullName: req.session.fullName, role: req.session.role});
	},

	alarms: function(req, res){
		Alarm.findAlarmMessage(req , function(err, result){
			if(err) res.negotiate(err);
			if(result)
				res.send(result);
			else
				res.send(null);
		})
	}
};

