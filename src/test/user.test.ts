import assert from "assert"
import client from "test"
import { parse } from "lib"
import DB from "config/connectDB"

describe(`User Services Test`, () => {
    after(async () => {
        const db = await DB.get()
        await db.collection("user").deleteMany({})
    })
    describe("Register Test", () => {
        describe("Success Case", () => {
            it("Register mock user - 1", async () => {
                const mutation = `
                    mutation{ 
                        register(
                            email:"20sunrin041@sunrint.hs.kr", 
                            password:"testtest",
                            age:18,
                            gender:1,
                        ){
                            email,
                            age,
                            gender
                        }
                    }
                `
                const result = await client.mutate({ mutation })
                const { data } = parse(result)
                assert.strictEqual(data.register.email, "20sunrin041@sunrint.hs.kr")
                assert.strictEqual(data.register.age, 18)
                assert.strictEqual(data.register.gender, "Male")
            })

            it("Register mock user - 2", async () => {
                const mutation = `
                    mutation{ 
                        register(
                            email:"namjs1540@naver.com", 
                            password:"testtest",
                            age:17,
                            gender:0,
                        ){
                            email,
                            age,
                            gender
                        }
                    }
                `
                const result = await client.mutate({ mutation })
                const { data } = parse(result)
                assert.strictEqual(data.register.email, "namjs1540@naver.com")
                assert.strictEqual(data.register.age, 17)
                assert.strictEqual(data.register.gender, "Female")
            })
        })
        describe("Failure Case", () => {
            it("Duplicate Email Error", async () => {
                const mutation = `
                    mutation{ 
                        register(
                            email:"20sunrin041@sunrint.hs.kr", 
                            password:"testtest",
                            age:18,
                            gender:1,
                        ){
                            email,
                            age,
                            gender
                        }
                    }
            `
                const result = await client.mutate({ mutation })
                const { errors } = parse(result)
                assert.strictEqual(errors[0].message, "email이 중복입니다.")
            })
            it("Email format error", async () => {
                const mutation = `
                    mutation{ 
                        register(
                            email:"kkzk@.kkkz.com", 
                            password:"testtest",
                            age:10,
                            gender:0,
                        ){
                            email,
                            age,
                            gender
                        }
                    }
            `
                const result = await client.mutate({ mutation })
                const { errors } = parse(result)
                assert.strictEqual(errors[0].message, "올바른 이메일 형식이 아닙니다.")
            })
        })
    })
    describe("Login Test", () => {
        describe("Success Case", () => {
            it("Mock user - 1 Login", async () => {
                const mutation = `
                    mutation{
                        login(
                            email:"20sunrin041@sunrint.hs.kr",
                            password:"testtest"
                        )
                    }
                `
                const result = await client.mutate({ mutation })
                const { data } = parse(result)
                assert(data.login)
            })

            it("Mock user - 2 Login", async () => {
                const mutation = `
                    mutation{
                        login(
                            email:"namjs1540@naver.com",
                            password:"testtest"
                        )
                    }
                `
                const result = await client.mutate({ mutation })
                const { data } = parse(result)
                assert(data.login)
            })
        })
        describe("Failure Case", () => {
            it("can't found account", async () => {
                const mutation = `
                    mutation{
                        login(
                            email:"app@app.kr",
                            password:"testtest"
                        )
                    }
                `
                const result = await client.mutate({ mutation })
                const { errors } = parse(result)
                assert.strictEqual(errors[0].message, "계정이 존재하지 않습니다.")
            })
            it("Invalid password", async () => {
                const mutation = `
                    mutation{
                        login(
                            email:"20sunrin041@sunrint.hs.kr",
                            password:"testtesT"
                        )
                    }
                `
                const result = await client.mutate({ mutation })
                const { errors } = parse(result)
                assert.strictEqual(errors[0].message, "비밀번호가 일치하지 않습니다.")
            })
        })
    })
})