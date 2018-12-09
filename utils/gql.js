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

export const CREATE_BOOK = gql`
mutation createBook(
    $name:String!
    $title: String!
    $description: String!
    $pageCount:Int!
    $userId:Long!
    $authorId:Long!
    $categoryId: Long!
  
  ) {
    createBook(
      name: $name
      title: $title
      description: $description
      pageCount: $pageCount
      userId: $userId
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
query book($id:Long!){
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