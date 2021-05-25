import { genSaltSync, hashSync, compareSync } from "bcrypt"
import jwt from "jsonwebtoken"
import env from "config/env"
import { User } from "config/types"

export const createHashedPassword = (password: string) => {
    const saltRounds = 10
    const salt = genSaltSync(saltRounds)
    const hashedPassword = hashSync(password, salt)
    return hashedPassword
}

export const checkPassword = (password: string, hashedPassword: string) => {
    const isPasswordCorrect = compareSync(password, hashedPassword)
    return isPasswordCorrect
}

export const checkToken = (token: string) => {
    try {
        return jwt.verify(
            token,
            env.JWT_PW
        )
    } catch {
        return null
    }
}

export const createToken = (user: User) => jwt.sign(user, env.JWT_PW)