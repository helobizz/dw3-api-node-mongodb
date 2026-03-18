// Importando o service
import userService from "../services/userService.js";

// Função para cadastrar um usuário 
const createUser = async(req, res) => {
    try {
        // coletantando dados
        const {name, email, password} = req.body
        // enviando para cadastrar 
        await userService.Create(name, email, password)
        // retornando uma resposta
        res.status(201).json({ message: "Usuário cadastrado com sucesso!"})
        // cód. 201 = created
    } catch(error) {
        console.log(error)
        res.status(500).json({error: "Não foi possível cadastrar o usuário. Erro interno do servidor."})
    }
}

export default { createUser }