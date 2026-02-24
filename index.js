import express from "express";
const app = express();

// Importando o mongoose
import mongoose from 'mongoose';

// Importando o model
import Game from "./models/Games.js"

// Configurações do Express
app.use(express.json()); // permite o uso de json na aplicação

// Iniciando a conexão com o banco de dados MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/api-the-games") //porta local padrão 
// depois do endereço do banco, eu coloco o nome do banco que vai criar

//criando rota principal
app.get("/", (req, res) => {
    const games = [
      {
        title: "Game 1",
        year: "2020",
        platform: "PC",
        price: 20,
      },
      {
        title: "Game 2",
        year: "2024",
        platform: "Xbox",
        price: 30,
      },
    ];
    res.status(200).json(games)
  });

// Rodando a API na porta 4000
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`API rodando na porta http://localhost:${port}`);
  }
});