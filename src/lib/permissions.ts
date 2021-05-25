import { rule, shield } from "graphql-shield"
import { User } from "config/types"
import { ApolloError } from "apollo-server-errors"
const isValid = rule()((parent: void, args: void, { user }: { user: User | null }) => {
    if (user === null) {
        return new ApolloError("token 이 유효하지 않습니다.")
    }
    return user !== null
})

export const permissions = shield({

})