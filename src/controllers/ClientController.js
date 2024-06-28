const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'LabCommerce'
})


class ClientController {


    async criar(request, response) {

        try {
            const dados = request.body

            if (!dados.name || !dados.email || !dados.contact || !dados.cpf) {
                return response.status(400).json({
                    mensagem: 'O nome, email, cpf e contato são obrigatórios'
                })
            }

            // Verifica se o Email já existe
            const emailExistente = await conexao.query("SELECT * FROM clients WHERE email = $1", [dados.email]);

            if (emailExistente.rows.length > 0) {
                return response.status(400).json({ mensagem: 'Esse Email já está cadastrado' });
            }


            // Verifica se o CPF já existe
            const cpfExistente = await conexao.query("SELECT * FROM clients WHERE cpf = $1", [dados.cpf]);

            if (cpfExistente.rows.length > 0) {
                return response.status(400).json({ mensagem: 'Esse CPF já está cadastrado' });
            }



            const servico = await conexao.query(`
            INSERT INTO clients
             (name,email,cpf,contact)
             values
             ($1,$2,$3,$4)
             returning *
        `, [dados.name, dados.email, dados.cpf, dados.contact])


            response.status(201).json({ mensagem: 'Criado com sucesso' })


        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao cadastrar o cliente'
            })
        }
    }


}

module.exports = new ClientController()