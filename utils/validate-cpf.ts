var writer = require('./writer.ts');

exports.validateCpf = (originalCpf: string) => {
	return new Promise<string>( (accept, reject) => {
		if (originalCpf.length == 14) {
			originalCpf = originalCpf.split('.').join('').split('-').join('')
		}

		var cpf: any = originalCpf
		if (cpf.length == 11) {
			cpf = cpf.split('')

			var areAllDigitsSame = true
			for(var i = 1; i < cpf.length; i++) {
				if (cpf[i] != cpf[i-1]) {
					areAllDigitsSame = false
				}
			}

			if (areAllDigitsSame) {
				reject( writer.respondWithCode(400, { message: 'CPF inválido' }) )
			} else {
				var dvs = cpf.splice(9, 2)

				var soma = 0
				for (var i = 10; i > 1; i--) {
					soma += ( cpf[10 - i] * i )
				}
				var dv1 = (soma % 11) < 2 ? 0 : 11 - (soma % 11)

				cpf.push(dv1)

				soma = 0
				for (var i = 11; i > 1; i--) {
					soma += ( cpf[11 - i] * i )
				}
				var dv2 = (soma % 11) < 2 ? 0 : 11 - (soma % 11)

				cpf.push(dv2)

				cpf = cpf.join('')
				if (cpf == originalCpf) {
					accept(cpf)
				} else {
					reject( writer.respondWithCode(400, { message: 'CPF inválido' }) )
				}
			}
		} else {
			reject( writer.respondWithCode(400, { message: 'CPF inválido' }) )
		}
	})
}