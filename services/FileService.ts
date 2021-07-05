'use strict';
var fs = require('fs')
var db = require('../models')
var Pessoa = db.pessoa
var writer = require('../utils/writer.ts');
var foreach = require('../utils/foreach').foreach;
var uuid = require('uuid').v4
var dir = process.env.USER_FOTOS_DIRECTORY

interface File {
	fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer,
    size: number
}

class FileHolder {
	filename: String;
	buffer?: Buffer;

	constructor(filename, buffer?) {
		this.filename = filename;
		this.buffer = buffer ?? null
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

var getFilename = (file: File, tx=null) => {
	return new Promise<string>( (accept, reject) => {
		var makeFilename = () => {
			try {
				var filename = uuid() + '.' + file.mimetype.split('/')[1]
				var options: any = {
					where: {
						foto: filename
					}
				}
				if (tx != null) {
					options.transaction = tx
				}
				Pessoa.findOne(options).then( (pessoa) => {
					if (pessoa != null && pessoa != undefined) {
						makeFilename()
					} else {
						accept(filename)
					}
				}).catch( (err) => {
					reject(err)
				})
			} catch (err) {
				reject(err)
			}
		}
		makeFilename()
	})
}

module.exports.getFoto = (filename) => {
	return new Promise<Buffer>( (accept, reject) => {
		fs.readFile(getPath(filename), (err, data) => {
			if (err != null && err != undefined) {
				reject(err)
			} else {
				accept(data)
			}
		})
	})
}

module.exports.saveFoto = (file: File, ft: FileServiceTransaction, tx=null) => {
	return new Promise<string>( (accept, reject) => {
		getFilename(file, tx).then( (filename) => {
			var fh = new FileHolder(filename, file.buffer)
			ft.filesToSave.push(fh)
			accept(filename)
		}).catch( (err) => {
			reject(err)
		})
	})
}

module.exports.deleteFoto = (filename: String, ft: FileServiceTransaction) => {
	return new Promise<void>( (accept, reject) => {
		try {
			if (filename.length > 0) {
				var fh = new FileHolder(filename)
				ft.filesToDelete.push(fh)
			}
			accept()
		} catch (err) {
			reject(err)
		}
	})
}

module.exports.transaction = (exec: Function) => {
	return new Promise<ResponsePayload>( (accept, reject) => {
		var filesToSave: Array<FileHolder> = []
		var filesToDelete: Array<FileHolder> = []
		var fileTransaction = new FileServiceTransaction(filesToSave, filesToDelete)
		exec(fileTransaction).then( (response: ResponsePayload) => {
			commit(fileTransaction).then( () => {
				accept(response)
			}).catch( (err) => {
				reject( writer.tratarErro(err) )
			})
		}).catch( (err) => {
			reject( writer.tratarErro(err) )
		})
	})
}

var commit = (ft: FileServiceTransaction) => {
	return new Promise<void>( (accept, reject) => {
		foreach(ft.filesToSave, saveFile).then( () => {
			foreach(ft.filesToDelete, deleteFile).then( () => {
				accept()
			}).catch( (err) => {
				reject(err)
			})
		}).catch( (err) => {
			reject(err)
		})
	})
}

var getPath = (filename: String) => {
	return dir + filename
}

var saveFile = (file: FileHolder) => {
	return new Promise<void>( (accept, reject) => {
		fs.writeFile(getPath(file.filename), file.buffer, (err) => {
			if (err != null && err != undefined) {
				reject(err)
			} else {
				accept()
			}
		})
	})
}

var deleteFile = (file: FileHolder) => {
	return new Promise<void>( (accept, reject) => {
		fs.unlink(getPath(file.filename), (err) => {
			if (err != null && err != undefined) {
				reject(err)
			} else {
				accept()
			}
		})
	})
}