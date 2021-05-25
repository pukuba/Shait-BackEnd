import { Db } from "mongodb"
import { createHashedPassword, checkPassword, createToken } from "lib"
import { ApolloError } from "apollo-server-errors"
import { Gender, User } from "config/types"

export const register = async (
    parent: void, {
        email,
        password,
        age,
        gender
    }: {
        email: string,
        password: string
        age: number,
        gender: 0 | 1
    }, {
        db
    }: {
        db: Db
    }
) => {
    if (await db.collection("user").findOne({ email }) !== null) {
        return new ApolloError("email이 중복입니다.")
    }
    return await db.collection("user").insertOne({
        email,
        password: createHashedPassword(password),
        age,
        gender: Gender[gender]
    }).then(({ ops }) => ops[0])
}

export const login = async (
    parent: void, {
        email,
        password
    }: {
        email: string,
        password: string
    }, {
        db
    }: {
        db: Db
    }
) => {
    const user = await db.collection("user").findOne({ email })
    if (user === null) {
        return new ApolloError("계정이 존재하지 않습니다.")
    }
    if (checkPassword(password, user.password) === false) {
        return new ApolloError("비밀번호가 일치하지 않습니다.")
    }
    return createToken({
        email: user.email,
        age: user.age,
        gender: user.gender
    })
}