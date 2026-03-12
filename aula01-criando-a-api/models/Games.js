import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: String,
    platform: String,
    year: Number,
    price: Number
});

const Game = mongoose.model('Game', gameSchema) //vai criar uma coleção chamada "Game" com a estrutura de gameSchema

export default Game;