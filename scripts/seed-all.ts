var db = require('../models')
var User = db.user
const exec = require("child_process").exec

User.count().then( (count) => {
	if (count > 0) {
  		process.exit()
	} else {
		exec("sequelize-cli db:seed:all", (error, stdout, stderr) => {
		    if (error) {
		        console.log(`error: ${error.message}`);
		        process.exit(1)
		    } else if (stderr) {
		        console.log(`stderr: ${stderr}`);
		        process.exit(1)
		    } else {
		    	console.log(`stdout: ${stdout}`);
		    	process.exit()
		    }
		});
	}
}).catch( (err) => {
	console.log(`err: ${err}`)
	process.exit(1)
})