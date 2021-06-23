'use strict';

var fs = require('fs')

class FileHolder {
	mimetype: String;
	buffer: Buffer;

	constructor(mimetype, buffer) {
		this.mimetype = mimetype;
		this.buffer = buffer
	}
}

class FileServiceTransaction {
	filesToSave: Array<FileHolder>;
	filesToDelete: Array<FileHolder>;

	constructor(filesToSave, filesToDelete) {
		this.filesToSave = filesToSave;
		this.filesToDelete = filesToDelete;
	}
}

module.exports.transaction = (exec) => {
	return new Promise<void>( (accept, reject) => {
		var filesToSave: Array<FileHolder> = []
		var filesToDelete: Array<FileHolder> = []
		var fileTransaction = new FileServiceTransaction(filesToSave, filesToDelete)
		
		accept()
	})
}