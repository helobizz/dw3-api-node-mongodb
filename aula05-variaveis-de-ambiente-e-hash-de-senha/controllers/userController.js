// Importando o service
import userService from "../services/userService.js";

// Importando o JWT (criação de token)
import jwt from 'jsonwebtoken';

// IMPORTANDO AS VARIÁVEIS DE AMBIENTE
import dotenv from "dotenv";
// Configurando o dotenv
dotenv.config();

// Segredo para gerar o token da API
// const JWTSecret = 'thegames-secret' // pode ser qualquer coisa

// ACESSANDO A VARIÁVEL ARMAZENADA NO .env
const JWTSecret = process.env.JWTSECRET

// Função para cadastrar um usuário 
const createUser = async(req, res) => {
    try {
        // coletantando dados
        const {name, email, password} = req.body
        // enviando para cadastrar 
        await userService.Create(name, email, password)
        // retornando uma resposta
        res.status(201).json({ message: "Usuário cadastrado com sucesso!"})
        // cód. 201 = created
    } catch(error) {
        console.log(error)
        res.status(500).json({error: "Não foi possível cadastrar o usuário. Erro interno do servidor."})
    }
}

// Função para AUTENTICAR um usuário (Função de login)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Se o e-mail existe
        if (email != undefined) {
            // Buscando o usuário no banco
            const user = await userService.getOne(email) // esse getOne foi criado no userService
            // Se o usuário for encontrado
            if (user != undefined) {
                // Verificando se a senha está correta
                if (user.password == password) { // verificando se a senha do banco bate com o que foi digitado
                    // CRIAR O TOKEN
                    jwt.sign({id: user._id, email: user.email}, JWTSecret, {
                        expiresIn: '48h'}, (error, token) => { // tempo que o token leva para expirar
                            // FALHA
                            if (error) {
                                res.status(400).json({error: "Não foi possível gerar o token de autenticação."})
                                // SUCESSO
                            } else {
                                res.status(200).json({ message: "Login realizado com sucesso", token: token })
                            }
                        }) 
                    // Senha incorreta
                    } else {
                        // cód 401 - unauthorizes - não autorizado
                        res.status(401).json({ error: "Suas credenciais são inválidas. Acesso negado. Tente novamente."})
                    }
            // usuário não encontrado        
            } else {
                res.status(404).json({ error: "O usuário não foi encontrado."})
            }
        // email inválido ou vazio    
        } else {
            res.status(404).json({ error: "E-mail inválido ou não informado."})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Não foi possível realizar o login. Erro ingterno do servidor"})
    }
}

export default { createUser, loginUser, JWTSecret }