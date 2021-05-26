import app from "test"
import request from "supertest"

describe(`Server Init Test`, () => {

    it(`Server Running Test-1`, async () => {
        const query = `
            query{
                test
            }
        `
        await request(app)
            .get(`/api?query=${query}`)
            .expect(200)
    })
    it(`Server Running Test-2`, async () => {
        const query = `
            query{
                test1
            }
        `
        await request(app)
            .get(`/api?query=${query}`)
            .expect(400)
    })
})