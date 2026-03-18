import User from "../models/Users.js";

class userService {
    // Método para cadastrar usuário
    async Create(name, email, password) {
        try {
            const newUser = new User({
                name,
                email, 
                password
            })
            await newUser.save()
            // save() -> usado para gravar um registro no banco de dados
        } catch(error){
            console.log(error)
        }
    }
}

// exportando a classe
export default new userService();