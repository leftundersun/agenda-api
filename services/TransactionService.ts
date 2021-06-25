'use strict';
var db = require('../models')
var FileSrvc = require('../services/FileService');
var writer = require('../utils/writer.ts');

module.exports.transaction = (exec: Function) => {
	return new Promise<void>( (accept, reject) => {
		db.sequelize.transaction( (tx) => {
			return new Promise<any>( (accept, reject) => {
				FileSrvc.transaction( (ft) => {
					return new Promise<any>( (accept, reject) => {
						exec(tx, ft).then( (response) => {
							accept(response)
						}).catch( (err) => {
							reject(err)
						})
					})
				}).then( (response) => {
					accept(response)
				}).catch( (err) => {
					reject(err)
				})
			})
		}).then( (response) => {
			accept(response)
		}).catch( (err) => {
			reject(err)
		})
	})
}