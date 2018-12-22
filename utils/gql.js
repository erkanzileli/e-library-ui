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

export const CREATE_AUTHOR = gql`
mutation createAuthor($firstName: String!, $lastName: String!) {
  createAuthor(firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}`

export const DELETE_AUTHOR = gql`
mutation deleteAuthor($id: Long!){
  deleteAuthor(id: $id)
}`

export const BOOK_CATEGORIES = gql`
query bookCategories {
    bookCategories {
      id
      name
    }
  }`

export const CREATE_BOOK_CATEGORY = gql`
mutation createBookCategory($name: String!) {
  createBookCategory(name: $name) {
    id
    name
  }
}`

export const DELETE_BOOK_CATEGORY = gql`
mutation deleteBookCategory($id: Long!) {
  deleteBookCategory(id: $id)
}
`

export const UPDATE_USER = gql`
mutation updateUser(
  $id: Long!, 
  $firstName: String!, 
  $lastName:String!, 
  $email:String!
  ){
  updateUser(
    id: $id, 
    firstName:$firstName, 
    lastName: $lastName, 
    email: $email
    ){
    id
    username
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
      downloadCount
      likeCount
      filePath
      author {
        id
        firstName
        lastName
      }
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

export const UPDATE_BOOK = gql`
mutation updateBook(
  $id: Long!
  $token: String!
  $userId: Long!
  $authorId: Long!
  $categoryId: Long!
  $name: String!
  $title: String!
  $description: String!
  $pageCount: Int!
  ){
  updateBook(
    id: $id
    token: $token
    name: $name
    title: $title
    description: $description
    pageCount: $pageCount
    authorId: $authorId
    categoryId: $categoryId
    userId: $userId
    ){
      id
      name
      title
      description
      pageCount
      downloadCount
      likeCount
      status
      downloadCount
      likeCount
      author {
        id
        firstName
        lastName
      }
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

export const ALL_AUTHORS_AND_CATEGORIES = gql`
query authorAndBookCategories {
  authors {
    id
    firstName
    lastName
  }
  bookCategories{
    id
    name
  }
}`

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

export const IGNORE_USER = gql`
mutation($username: String!){
  ignoreUser(username: $username){
    id
    firstName
    lastName
    username
    email
    type
    isRequested
    status
  }
}
`

export const GET_USERS = gql`
query users{
  users{
    id
    firstName
    lastName
    username
    email
    type
    isRequested
    status
  }
}`

export const USER_TO_EDITOR =   gql`
mutation($id: Long!){
  userToEditor(id: $id){
    id
    firstName
    lastName
    username
    email
    type
    isRequested
    status
  }
}
`

export const DELETE_BOOK = gql`
mutation deleteBook($id:Long!, $token: String!){
  deleteBook(id: $id, token: $token)
}
`

export const REQUEST_USER = gql`
  mutation requestUser($username: String!){
    requestUser(username: $username)
  }
`

export const CHANGE_USER_TYPE = gql`
mutation changeUserType($id:Long!, $type:String!){
  changeUserType(id: $id, type: $type){
    id
    firstName
    lastName
    username
    email
    type
    isRequested
    status
  }
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
      downloadCount
      likeCount
      filePath
      author {
        id
        firstName
        lastName
      }
      category{
        id
        name
      }
    }
  }
  `