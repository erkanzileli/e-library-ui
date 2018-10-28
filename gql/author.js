import gql from 'graphql-tag'

export const AUTHORS = gql`
query authors {
    authors {
      id
      firstName
      lastName
    }
  }
  `;
