import gql from 'graphql-tag'


export const AUTHORS = gql`
query authors {
    authors {
      id
      firstName
      lastName
    }
  }
`
export const BOOK_CATEGORIES = gql`
query bookCategories {
    bookCategories {
      id
      name
    }
  }`

export const UPDATE_USER = gql`
mutation updateUser($id: Long!, $firstName: String!, $lastName:String!, $email:String!){
  updateUser(id: $id, firstName:$firstName, lastName: $lastName, email: $email){
    id
    firstName
    lastName
    email
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook(
    $name:String!
    $title: String!
    $description: String!
    $pageCount:Int!
    $username:String!
    $authorId:Long!
    $categoryId: Long!
  ) {
    createBook(
      name: $name
      title: $title
      description: $description
      pageCount: $pageCount
      username: $username
      authorId: $authorId
        categoryId: $categoryId
    ) {
      id
      name
      title
      description
      pageCount
      status
      author {
        id
        firstName
        lastName
      }
      downloadCount
      likeCount
      user {
        id
        firstName
        lastName
        username
        email
      }
      category {
        id
        name
      }
    }
  }
  `
export const GET_BOOK = gql`
query book($id: Long!){
    book(id: $id) {
      id
      name
      title
      description
      pageCount
      downloadCount
      likeCount
      status
      author {
        id
        firstName
        lastName
      }
      downloadCount
      likeCount
      user {
        id
        firstName
        lastName
        username
        email
      }
      category {
        id
        name
      }   
      
    }
  }
  `

export const GET_USER = gql`
  query user($username: String!){
    user(username: $username){
      id
      firstName
      lastName
      username
      email
      isRequested
      type
    }
  }
`

export const DELETE_BOOK = gql `
mutation deleteBook($id:Long!, $token: String!){
  deleteBook(id: $id, token: $token)
}
`

export const REQUEST_USER = gql`
  mutation requestUser($username: String!){
    requestUser(username: $username)
  }
`

export const GET_BOOKS = gql`
query books{
    books{
      id
      name
      title
      description
      pageCount
      status
      author {
        id
        firstName
        lastName
      }
      downloadCount
      likeCount
      user {
        id
        firstName
        lastName
        username
        email
      }
      category {
        id
        name
      }
    }
  }
  `