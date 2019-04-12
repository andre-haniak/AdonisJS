'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

    /**
     * Relacionamento de Categorias e Imagem
     */
    image() {
        return this.belongsTo('App/Models/Image')
    }

    /**
     * Criando o Relacionamento de Categorias/Produtos
     * */

    products() {
        return this.belongsToMany('App/Models/Product')
    }
}

module.exports = Category
