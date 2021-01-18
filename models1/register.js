var uniqid = require('uniqid');
const bcrypt = require('bcrypt');
var config = require('../config');
const e = require('express');
var mysql = require('mysql');

//console.log(uniqid());

module.exports.register = function (req, res, activeToken, activeExpires) {
	return new Promise(function (resolve, reject) {
		const Connection = mysql.createConnection(config);
		//console.log(req.body.password);
		//console.log(req.body.email);
		//console.log(req.body.repassword);
		const myPassword = req.body.password;

		const saltRounds = 10;

		bcrypt.hash(myPassword, saltRounds, function (err, hash) {
			if (err) {
				// throw err;
				return reject(err);
			}

			//console.log(`hash created : ${hash}`);
			/**user_id
email
mobile_no
password
created_at
fullname
google_id
activeToken
activeExpires
activestatus */
			var today = new Date();
			var users = {
				
				fullname: req.body.fullname,
				email: req.body.email,
				password: hash,
				created_at: today,
				activeToken: activeToken,
				activeExpires: activeExpires,
				activestatus: false,
				mobile_no:req.body.mobile,
			};
			//console.log(activeToken);
			Connection.connect();
			Connection.query('INSERT INTO users SET ?', users, function (
				error,
				results,
			) {
				if (error) {
					//throw error;
					Connection.end();
					return reject(error);
				} else {
					Connection.end();
					return resolve(results);
				}
			});
		});
	});
	
};
