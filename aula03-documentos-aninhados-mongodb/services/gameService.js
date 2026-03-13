// Importando o Model
import Game from "../models/Games.js";

class gameService {
    // método para buscar todos os registros do banco
    // funções assíncronas não são bloqueantes
    async getAll() { //nome da função, pode ser qualquer um
        // try -> trata o sucesso
        try {
            // .find() -> é o método do mongoose para buscar registros no banco
            const games = await Game.find() // await -> mando esperar os jogos vir
            return games

        // catch -> trata a falha
        } catch(error) {
            console.log(error)
        }
    }   
    // Método para cadastrar um game (precisa estar dentro da classe)
    async Create(title, year, price, descriptions) { //parametros que foram definidos
        try {
            const newGame = new Game({ // new -> cria instância
                // desestruturação (não repete os campos ex.: title : title)
                title,
                year,
                price,
                descriptions
            }) 
            // Gravando no banco
            await newGame.save() // .save() -> método do mongoose para cadastrar no BD
        } catch(error) {
            console.log(error) 
        }
    } 
    // MÉTODO PARA EXCLUIR UM JOGO
    async Delete(id) {
        try {
            // excluindo o jogo pela ID
            await Game.findByIdAndDelete(id)
            console.log(`Game com a id: ${id} foi deletado.`)
        } catch (error) {
            console.logo(error)
        }
    }
    // MÉTODO PARA ALTERAR UM JOGO
    async Update(id, title, year, price, descriptions) {
        try {
            const updateGame = await Game.findByIdAndUpdate(id, {
                title,
                year,
                price, 
                descriptions
            },
                { new: true }
        )
            console.log(`O jogo com a id: ${id} foi alterado.`)
            return updateGame
        } catch (error) {
            console.log(error)
        }
    }
    
    // MÉTODO PARA LISTAR UM JOGO ÚNICO
    async getOne(id) {
        try {
            const game = await Game.findOne({ _id: id })
            return game
        } catch (error) {
            console.log(error)
        }
    }
}



//exportando a classe
export default new gameService()
// preciso usar o new para exportar uma classe