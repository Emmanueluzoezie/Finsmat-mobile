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
    $username: String
    $isAdminUser: Boolean
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
        username: $username
        isAdminUser: $isAdminUser
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
        username
        isAdminUser
    }
 }
`

export const UPDATE_POINTS = gql`
 mutation MyMutation(
    $id: ID!
    $coins: Float
    ){
        updateUserCoins(
            id: $id
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

export const ADD_USER_HISTORY = gql`
 mutation MyMutation(
    $created_at: DateTime
    $title: String
    $user_id: ID
    $amount: Float
    $descriptions: String
 ){
    insertHistory(
        title: $title
        user_id: $user_id
        created_at: $created_at
        amount: $amount
        descriptions: $descriptions
    ){
        id,
        created_at
        title
        user_id
        amount
        descriptions
    }
 }
`

export const ADD_QUIZ_WITH_FRIEND = gql`
    mutation MyMutation(
    $has_friend_played: Boolean
    $friend_name: String
    $created_at: DateTime
    $user_name: String
    ){
        insertChellenge_quiz(
            has_friend_played: $has_friend_played
            friend_name: $friend_name
            created_at: $created_at
            user_name: $user_name
        ){
            id
            has_friend_played
            friend_name
            created_at
            user_name
        }
    }
`


export const UPDATE_QUIZ_WITH_FRIEND = gql`
 mutation MyMutation(
    $id: ID!
    $has_friend_played: Boolean
    ){
        updateChellenge_quiz(
            id: $id
            has_friend_played: $has_friend_played
            ){
                id
                has_friend_played
                friend_name
                created_at
                user_name
            }
    }
`