const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'LabCommerce'
})


class OrderController {


    async criar(request, response) {

        try {
            const dados = request.body;

            //Validações


            //Colunas obrigatórias
            if (!dados.client_id || !dados.address || !dados.products) {
                return response.status(400).json({
                    mensagem: 'O ID do cliente, endereço de entrega, e os produtos são obrigatórios'
                })
            }

            //Verificação se existe id de cliente cadastrado
            const clienteExistente = await conexao.query("SELECT * FROM clients WHERE id = $1", [dados.client_id]);

            if (clienteExistente.rows.length === 0) {
                return response.status(400).json({ mensagem: 'Insira um ID de cliente válido' });
            }


            //Produto_id e Amount dos produtos são obrigatórios, além de Produto_id ser válido
            for (let i = 0; i < dados.products.length; i++) {
                const item = dados.products[i];
                const produtoExistente = await conexao.query("SELECT * FROM products WHERE id = $1", [item.product_id]);
                
                if (produtoExistente.rows.length === 0 || !item.amount) {
                    return response.status(400).json({
                        mensagem: 'Um ID do produto válido e sua quantidade são obrigatórios'
                    })
                }
            }




            let total = 0;

            for (let i = 0; i < dados.products.length; i++) {
                const item = dados.products[i];
                const produtoAtual = await conexao.query(`
                    SELECT price FROM products 
                    WHERE id = $1
                `, [item.product_id]);

                total = total + (produtoAtual.rows[0].price * item.amount);
            }

            // INSERIR o pedido 
            const meuPedido = await conexao.query(`
                INSERT INTO orders (client_id, address, observations, total)
                values ($1,$2,$3,$4)
                returning *
                `, [dados.client_id, dados.address, dados.observations, total])

            // INSERIR os items
            dados.products.forEach(async item => {
                const produtoAtual = await conexao.query(`
                    SELECT price from products 
                    where id = $1
                    `, [item.product_id])

                conexao.query(`
                    INSERT INTO orders_items (order_id, product_id, amount, price)
                    values ($1,$2,$3,$4)
                    returning *
                    `, [
                    meuPedido.rows[0].id,
                    item.product_id,
                    item.amount,
                    produtoAtual.rows[0].price
                ])
            })

            response.status(201).json({ mensagem: 'Pedido Cadastrado' })




        } catch (error) {
            console.error(error);
            response.status(500).json({
                mensagem: 'Houve um erro ao cadastrar o pedido'
            })
        }
    }


}

module.exports = new OrderController()