//acionando as duas bibliotecas
const express = require('express');
const axios = require('axios');

const app = express(); // Define qual é o servidor
const PORT = 3000; // Porta do servidor

//Comando de busca de Endpoint
//Endpoint para buscar o endereço pelo CEP

app.get('/cep/:cep', async (req, res) => {

    const { cep } = req.params;

    try {
        //fazendo requisição para a API ViaCep
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = response.data;


        //Se o CEP não for encontrado
        if (endereco.erro) {
            return res.status(404).json({ mensagem: 'CEP não encontrado' });
        }

        //Retorna o endereço formatado
        res.json({
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf
        });

    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao consultar o CEP' })
    }
});


//Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});