// Importando o Service
import gameService from "../services/gameService.js";

//  importando o object id do pacote do mongodb
import { ObjectId } from "mongodb";

// Função para tratar a requisição de LISTAR os jogos
const getAllGames = async (req, res) => {
    try {
        const games = await gameService.getAll() // estou chamando e pedindo para ele executar a função getAll()
        res.status(200).json({games : games})
        // cód 200 (OK) : Requisição feita com sucesso
    } catch(error) {
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor. Não foi possível listar os jogos.'})
    }
}

// Função para tratar a requisição de CADASTRAR um jogo
const createGame = async(req, res) => {
    try {
        // DESESTRUTURAÇÃO
        // const title = req.body.title
        // const platform
        // COLETANDO OS DADOS DO CORPO DA REQUISIÇÃO
        const {title, platform, year, price} = req.body 
        await gameService.Create(title, platform, year, price) // usa await quando o método usa o banco
        res.status(201).json({message: 'O jogo foi cadastrado com sucesso!'})
        // Cod. 201 - CREATED -> um novo recurso foi criado no servidor
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor. Não foi possível cadastrar o jogo.'})
    }
}
// FUNÇÃO PARA DELETAR UM JOGO
const deleteGame = async (req, res) => {
    try {
        // VALIDAÇÃO DO ID
        // COLETANDO A ID
        const id = req.params.id
        if (ObjectId.isValid(id)) {
            await gameService.Delete(id)
            res.status(204).json({ message: "O jogo foi excluído com sucesso!" })
            // cod. 204 (NO CONTENT) -> não tenho recurso para retornar porque foi apagado
        } else {
            res.status(400).json({ error: 'Ocorreu um erro na validação da ID.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}
// FUNÇÃO PARA ALTERAR UM JOGO

export default { getAllGames, createGame, deleteGame }