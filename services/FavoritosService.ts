'use strict';


/**
 * Adicionar um contato aos favoritos
 *
 * id Integer Id da pessoa a ser adicionada aos favoritos
 * returns BasicResponse
 **/
exports.addFavorito = (id) => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}


/**
 * Listar contatos favoritos do usuário logado
 *
 * returns FavoritoArray
 **/
exports.listFavoritos = () => {
  return new Promise<void>((accept, reject) => {
    accept();
  })
}


/**
 * Remover um contato dos favoritos
 *
 * id Integer Id da pessoa a ser removida dos favoritos
 * returns BasicResponse
 **/
exports.removeFavorito = (id) => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}

