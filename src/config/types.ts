import { ReadStream } from "fs"

export interface File {
    filename: string
    mimetype: string
    encoding: string
    createReadStream: () => ReadStream
}

export interface User {
    email: string
    age: number
    gender: Gender
}

export enum Gender {
    Female,
    Male
}