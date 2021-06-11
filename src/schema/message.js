import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    messages: [Message]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    user: User!
    userId: ID!
    text: String!
  }
`;
