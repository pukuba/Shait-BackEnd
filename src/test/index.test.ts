import assert from "assert"
import client from "test"
import { join } from "path"
import { createReadStream } from "fs"
import { parse } from "lib"

describe(`Server Init Test`, () => {

    it(`Server Running Test-1`, async () => {
        const query = `
            query{
                test
            }
        `
        const res = await client.query({
            query
        })
        const data = parse(res)
        assert.strictEqual(data.data.test, "Server On")
    })
    it(`Server Running Test-2`, async () => {
        const query = `
            query{
                test1
            }
        `
        const res = await client.query({
            query
        })
        const data = parse(res)
        assert.strictEqual(data.errors[0].message, 'Cannot query field "test1" on type "Query". Did you mean "test"?')
    })
    it(`file Upload Test`, async () => {

        const path = join(__dirname, "file", "github_profile.jpeg")
        const file = createReadStream(path)
        const query = `
            mutation imgUpload($file: FileUpload) {
                imgUpload(file: $file)
            }
        `
        const res = await client.mutate({
            mutation: query,
            variables: {
                file: {
                    createReadStream: () => file,
                    filename: "github_profile.jpeg",
                    mimetype: "image/jpeg",
                    encoding: "7bit"
                }
            }
        })
        const data = parse(res)
        assert.strictEqual(data.data.imgUpload, true)
    }).timeout(5000)
})