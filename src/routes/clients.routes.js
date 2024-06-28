const { Router } = require('express')

const ClientController = require('../controllers/ClientController')

const clientRoutes = new Router()

clientRoutes.post('/', ClientController.criar)


module.exports = clientRoutes