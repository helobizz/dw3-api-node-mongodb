// Importando o Service
import gameService from "../services/gameService.js";

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

export default { getAllGames, createGame }