import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
    query userQuery($email: String!){
        getUserByEmail(email: $email){
            id
            email
            user_sol_address
            user_secret
            token
            badge
            full_name
            image
            created_at
            coins
        }
    }
`

export const GET_ALL_USER = gql`
    query userQuery{
        getUserList{
            id
            email
            user_sol_address
            user_secret
            token
            badge
            full_name
            image
            created_at
            coins
        }
    }
`