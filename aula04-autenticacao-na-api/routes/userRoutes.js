// Importando o express
import express from "express";
// Carregar o express.Router()
const userRoutes = express.Router();

// Importando o controller
import userController from "../controllers/userController.js";

// endpoint para cadastrar usuário 
userRoutes.post("/users", userController.createUser)

export default userRoutes;