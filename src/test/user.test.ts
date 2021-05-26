import assert from "assert"
import DB from "config/connectDB"
import app from "test"
import request from "supertest"

describe(`User Services Test`, () => {
    after(async () => {
        const db = await DB.get()
        await db.collection("user").deleteMany({})
    })
    describe("Register Test", () => {
        describe("Success Case", () => {
            it("Register mock user - 1", async () => {
                const query = `
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
                await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
            })

            it("Register mock user - 2", async () => {
                const query = `
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
                await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
            })
        })
        describe("Failure Case", () => {
            it("Duplicate Email Error", async () => {
                const query = `
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
                const { body } = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
                assert.strictEqual(body.errors[0].message, "email이 중복입니다.")
            })
            it("Email format error", async () => {
                const query = `
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
                const { body } = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
                assert.strictEqual(body.errors[0].message, "올바른 이메일 형식이 아닙니다.")
            })
        })
    })
    describe("Login Test", () => {
        describe("Success Case", () => {
            it("Mock user - 1 Login", async () => {
                const query = `
                    mutation{
                        login(
                            email:"20sunrin041@sunrint.hs.kr",
                            password:"testtest"
                        )
                    }
                `
                await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
            })

            it("Mock user - 2 Login", async () => {
                const query = `
                    mutation{
                        login(
                            email:"namjs1540@naver.com",
                            password:"testtest"
                        )
                    }
                `
                await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
            })
        })
        describe("Failure Case", () => {
            it("can't found account", async () => {
                const query = `
                    mutation{
                        login(
                            email:"app@app.kr",
                            password:"testtest"
                        )
                    }
                `
                const { body } = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
                assert(body.errors[0].message, "계정을 찾을수 없습니다.")
            })
            it("Invalid password", async () => {
                const query = `
                    mutation{
                        login(
                            email:"20sunrin041@sunrint.hs.kr",
                            password:"testtesT"
                        )
                    }
                `
                const { body } = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
                assert.strictEqual(body.errors[0].message, "비밀번호가 일치하지 않습니다.")
            })
        })
    })
})