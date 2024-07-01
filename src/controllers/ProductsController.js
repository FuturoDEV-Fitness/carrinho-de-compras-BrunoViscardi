const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'LabCommerce'
})


class ProductsController {


    async criar(request, response) {

        try {
            const dados = request.body

            if (!dados.name || !dados.category_id) {
                return response.status(400).json({
                    mensagem: 'O nome e a categoria(id) são obrigatórios'
                })
            }

            // Verifica se o amount já existe
            const amountExistente = await conexao.query("SELECT * FROM products WHERE amount = $1", [dados.amount]);

            if (amountExistente.rows.length > 0) {
                return response.status(400).json({ mensagem: 'Esse Amount já está cadastrado' });
            }


            //Verifica se a voltagem está no formato 110 ou 220, se existir
            const voltageENUM = dados.voltage;

            if (voltageENUM) {
                if (voltageENUM != '110' && voltageENUM != '220') {
                    return response.status(400).json({ mensagem: 'A voltagem do produto precisa ser 110 ou 220' });
                }
            }





            //Verifica se o category_id existe
            const categoryExistente = await conexao.query("SELECT * FROM category WHERE id = $1", [dados.category_id]);

            if (categoryExistente.rows.length === 0) {
                return response.status(400).json({ mensagem: 'Insira um ID de categoria válido' });
            }



            const produto = await conexao.query(`
            INSERT INTO products
             (name, amount, color, voltage, description, category_id)
             values
             ($1,$2,$3,$4,$5,$6)
             returning *
        `, [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id])


            response.status(201).json({ mensagem: 'Criado com sucesso' })


        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao cadastrar o produto'
            })
        }
    }



    async listarTodos(request, response) {

        const dados = request.query
        

        if (dados.name) {
            // verifica se os dados devem ser filtrados pelo nome
            const produtos = await conexao.query(`SELECT * FROM products
                    WHERE name ilike $1`, [`%${dados.name}%`])
            response.json(produtos.rows)
        } else {
            const produtos = await conexao.query(`SELECT * FROM products`)
            response.json(produtos.rows)
        }
    }



}

module.exports = new ProductsController()