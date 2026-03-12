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
}
export default new gameService()
// preciso usar o new para exportar uma classe