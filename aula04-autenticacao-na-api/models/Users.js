// Model de usuário
// Importando o mongoose
import mongoose from "mongoose";

const userScherma = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userScherma)

export default User;