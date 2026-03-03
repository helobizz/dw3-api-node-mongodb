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
    async Create(title,platform, year, price) { //parametros que foram definidos
        try {
            const newGame = new Game({ // new -> cria instância
                // desestruturação (não repete os campos ex.: title : title)
                title,
                platform,
                year,
                price
            }) 
            // Gravando no banco
            await newGame.save() // .save() -> método do mongoose para cadastrar no BD
        } catch(error) {
            console.log(error) 
        }
    } 
}

//exportando a classe
export default new gameService()
// preciso usar o new para exportar uma classe