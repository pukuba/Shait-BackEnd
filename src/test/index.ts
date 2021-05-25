import { createTestClient } from "apollo-server-testing"
import { ApolloServer } from "apollo-server-express"
import { readFileSync } from "fs"
import resolvers from "resolvers"
import { permissions } from "lib/permissions"
import { applyMiddleware } from "graphql-middleware"
import { makeExecutableSchema } from "@graphql-tools/schema"
import DB from "config/connectDB"
const typeDefs = readFileSync("src/typeDefs.graphql", "utf-8")
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
const serverConfig = {
    schema: applyMiddleware(schema, permissions),
    context: async () => {
        return { db: await DB.get() }
    }
}

const testServer = new ApolloServer({
    ...serverConfig
})

const client = createTestClient(testServer)
export default client