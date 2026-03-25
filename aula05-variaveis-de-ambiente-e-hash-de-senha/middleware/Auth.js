// MIDDLEWARE DE AUTENTICAÇÃO 

import jwt from 'jsonwebtoken'
import userController from '../controllers/userController.js'

// Função para verificar a autenticação  do usuário
// Verificar se ele possui um token
const Authorization = (req, res, next) => {
    // Capturar o token do usuário atráves do cabeçalho da requisição
    const authToken = req.headers['authorization']
    // Verificando se o token existe
    if (authToken != undefined) {
        // bearer => tipo token de fica armazenado no navegador(token ao portador)
        // split => corta os espaços da string (separa em vetores)
        const bearerToken = authToken.split(' ')
        const token = bearerToken[1]
        // Verificando se o token é válido
        jwt.verify(token, userController.JWTSecret, (error, data) => {
            // SE O TOKEN FOR INVÁLIDO
            if (error) {
                // cód. 401 : Não autorizado - UNAUTHORIZED
                res.status(401).json({error: "Acesso não autorizado. Token inválido."})
                // Se o token for válido
            } else {
                req.token = token
                req.loggedUser = {
                    id: data.id,
                    email: data.email
                }
                // PROSSEGUINDO COM A REQUISIÇÃO
                next()
            }
        })
        // SE O TOKEN NÃO EXISTIR
    } else {
        res.status(401).json({ error: "Acesso não autorizado, você não está autenticado."})
    }
}
export default { Authorization }