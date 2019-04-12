'use strict'

const User = use('App/Models/User')
const Role = use('Role')

class AuthController {

    async register({
        request,
        response
    }) {
        const {
            name,
            surname,
            nick,
            email,
            password
        } = request.all() // Request.body

        const user = await User.create({
            name,
            surname,
            nick,
            email,
            password
        })

        const userRole = await Role.findBy('slug', 'client')

        //Associar o userRole ao User
        await user.roles().attach([userRole.id])


        return response.status(201).send({
            data: user
        })
    }

    async login({
        request,
        response,
        auth
    }) {

        const {
            email,
            password
        } = request.all()

        const user = await auth.withRefreshToken().attempt(email, password)

        return response.send({
            data: user
        })
    }

    async refresh({
        request,
        response,
        auth
    }) {
        const refresh_token = request.input('refresh_token')

        if (!refresh_token) {
            refresh_token = request.header('refresh_token')
        }

        const user = await auth.newRefreshToken().generateForRefreshToken(refresh_token)

        return response.send({
            data: user
        })
    }

    async logout({
        request,
        response,
        auth
    }) {
        const refresh_token = request.input('refresh_token')

        if (!refresh_token) {
            refresh_token = request.header('refresh_token')
        }

        const loggedOut = await auth.authenticator('jwt').revokeTokens([refresh_token], true)

        return response.send({
            message: 'User Logged Out!'
        })
    }

}

module.exports = AuthController
