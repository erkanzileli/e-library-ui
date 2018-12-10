import { getToken } from "../storage";

jwt_decode = require('jwt-decode')

export const JWT_SECRET = "kudur"

export const getUserRole = async () => {
    const token = await getToken()
    return jwt_decode(token, JWT_SECRET).role
}

export const getUserName = async () => {
    const token = await getToken()
    return jwt_decode(token, JWT_SECRET).sub
} 