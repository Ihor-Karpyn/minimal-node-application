import {combineResolvers} from 'graphql-resolvers';
import {isAuthenticated, isMessageOwner} from '../auth';
import {createMessage, removeMessage} from './messageResolvers';
import {getUser} from '../user/userResolver';

export default {
  Query: {
    messages: async (per, args, { models }) => await models.Message.findAll(),
    message: async (parent, { id }, { models }) => await models.Message.findByPk(id),
  },
  Mutation: {
    createMessage: combineResolvers(isAuthenticated, createMessage),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      removeMessage
    ),
  },
  
  Message: {
    user: getUser,
  },
};
