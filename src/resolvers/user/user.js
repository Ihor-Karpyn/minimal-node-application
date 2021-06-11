import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server'
import {getMessagesById} from '../message/messageResolvers';
import {combineResolvers} from 'graphql-resolvers';
import {
  deleteUser,
  getMe,
  getUser,
  getUsers,
  signIn,
  signUp,
} from './userResolver';
import {isAdmin, isAuthenticated} from '../auth';

export default {
  Query: {
    users: getUsers,
    user: getUser,
    me: getMe,
  },
  
  Mutation: {
    signUp,
    signIn,
    deleteUser: combineResolvers(
      isAuthenticated,
      isAdmin,
      deleteUser,
    )
  },
  
  User: {
    messages: getMessagesById,
  },
};
