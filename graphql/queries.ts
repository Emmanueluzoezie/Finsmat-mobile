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
            username
            isAdminUser
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
            username
            isAdminUser
        }
    }
`

export const GET_ALL_QUESTIONS = gql`
    query questionQuery{
        getQuestionsList{
            answer_a
            answer_b
            question_type
            question_level
            question
            id
            created_at
            correct_answer
            answer_c
        }
    }
`

export const GET_ALL_QUESTION_BY_TYPE = gql`
    query userQuery($question_type: String!){
        getQuestionsByType(question_type: $question_type){
            answer_a
            answer_b
            question_type
            question_level
            question
            id
            created_at
            correct_answer
            answer_c
        }
    }
`

export const GET_ALL_HISTORY_BY_ID = gql`
    query userQuery($user_id: ID!){
        getHistoryByUser_Id(user_id: $user_id){
            id,
            created_at
            title
            user_id
            amount
            descriptions
        }
    }
`