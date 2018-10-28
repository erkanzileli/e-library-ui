import gql from 'graphql-tag'

export const BOOKS = gql`
query books {
    books {
      books {
        name
        author {
          id
          name
          surname
        }
      } 
      totalCount
    }
  }  
`
