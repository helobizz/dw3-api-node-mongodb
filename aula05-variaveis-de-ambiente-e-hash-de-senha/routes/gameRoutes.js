// Poder pegar o express do routes
import express from 'express';
import gameController from '../controllers/gameController.js';

const gameRoutes = express.Router()

// Importando Middleware de autenticação
import Auth from '../middleware/Auth.js';

// Na camada de routes é armazenada os endpoints, as urls da API

// endpoint para listar todos os games 
gameRoutes.get("/games", Auth.Authorization, gameController.getAllGames);

// Endpoint para cadastrar um game
gameRoutes.post("/games", Auth.Authorization, gameController.createGame)

// Endpoint para excluir um game
gameRoutes.delete("/games/:id", Auth.Authorization, gameController.deleteGame)

// Endpoint para alterar um game 
gameRoutes.put("/games/:id", Auth.Authorization, gameController.updateGame)

// Endpoint para listar um jogo único
gameRoutes.get("/games/:id", Auth.Authorization, gameController.getOneGame)

export default gameRoutes;