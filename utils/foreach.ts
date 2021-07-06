exports.foreach = (items, method, callback=null) => {
	return new Promise<void>( (accept, reject) => {
		var exec = (i) => {
			var item = items[i]
			method(item).then( (result) => {
				var next = () => {
					i++
					if (i < items.length) {
						exec(i)
					} else {
						accept()
					}
				}
				if (callback != null) {
					callback(result).then( () => {
						next()
					}).catch( (err) => {
						reject(err)
					})
				} else {
					next()
				}
			}).catch( (err) => {
				reject(err)
			})
		}
		if (items.length > 0) {
			exec(0)
		} else {
			accept()
		}
	})
}