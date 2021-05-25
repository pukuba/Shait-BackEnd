import { Mutation as upload } from "resolvers/app/upload"
import { Mutation as user } from "resolvers/app/user"
export default {
    ...upload,
    ...user
}