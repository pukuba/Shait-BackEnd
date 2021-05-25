import { Db } from "mongodb"
export const register = async (
    parent: void, {
        email,
        id,
        age,
        gender
    }: {
        email: string,
        id: string,
        age: number,
        gender: string
    }, {
        db
    }: {
        db: Db
    }
) => {

}

export const login = async (

) => {

}