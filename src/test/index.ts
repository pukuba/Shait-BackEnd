import dotenv from "dotenv"
dotenv.config()

import { ApolloServer } from "apollo-server-express"
import { readFileSync } from "fs"
import { createServer } from "http"
import DB from "config/connectDB"
import { applyMiddleware } from "graphql-middleware"
import { makeExecutableSchema } from "@graphql-tools/schema"
import express from "express"
import { bodyParserGraphQL } from "body-parser-graphql"
import resolvers from "resolvers"
import { permissions, checkToken } from "lib"
const typeDefs = readFileSync("src/typeDefs.graphql", "utf-8")

const app = express()
app.use(bodyParserGraphQL())

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: async ({ req }) => {
        const token = req.headers.authorization || ''
        const db = await DB.get()
        return {
            db,
            user: checkToken(token)
        }
    }
})
server.applyMiddleware({
    app,
    path: "/api"
})

const httpServer = createServer(app)
httpServer.timeout = 5000
export default app