'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
    up() {
        this.create('payments', (table) => {
            table.increments()
            table.integer('user_id').unsigned()
            table.integer('order_id').unsigned()
            table.integer('payment_method_id').unsigned()
            table.string('ip', 120)
            table.enu('status', ['awaiting', 'aproved', 'refused']).defaultTo('awaiting')

            table.string('currency', 10).notNullable().defaultTo('BRL')

            table.decimal('amount', 12, 2)
            table.json('details') // Informações de Pagamento do Usuário. //
            table.timestamps()

            // Fks
            table.foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('cascade')
            table
            .foreign('order_id')
            .references('id')
            .inTable('orders')
            .onDelete('cascade')
            table
            .foreign('payment_method_id')
            .references('id')
            .inTable('payment_methods')
            .onDelete('cascade')
        })
    }

    down() {
        this.drop('payments')
    }
}

module.exports = PaymentSchema