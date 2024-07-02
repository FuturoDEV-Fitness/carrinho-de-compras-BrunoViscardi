const express = require('express');

const clientsRoutes = require('./routes/clients.routes');
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes')

const app = express();
const port = 4000;

app.use(express.json()); // Fala para servidor que vai receber json como contéudo

app.use('/clients', clientsRoutes)
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})