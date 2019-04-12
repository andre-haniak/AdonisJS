'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

    /**
     * Criando o Relacionamento de Produtos/Images
     * */
    images() {
        return this.belongsToMany('App/Models/Image')
    }



    /**
     * Criando o Relacionamento de Produtos/Categorias
     * */

    categories() {
        return this.belongsToMany('App/Models/Category')
    }
}

module.exports = Product
