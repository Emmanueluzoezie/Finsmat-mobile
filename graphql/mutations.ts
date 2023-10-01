import { gql } from "@apollo/client";

export const ADD_USER = gql`
 mutation MyMutation(
    $email: String
    $user_sol_address: String
    $user_secret: String
    $token: Float
    $badge: String
    $full_name: String
    $image: String
    $created_at: DateTime!
    $coins: Float
 ){
    insertUser(
        email: $email
        user_sol_address: $user_sol_address
        user_secret: $user_secret
        token: $token
        badge: $badge
        full_name: $full_name
        image: $image
        created_at: $created_at
        coins: $coins
    ){
        id,
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