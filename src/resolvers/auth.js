import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

//<editor-fold desc="IsAuth">
export const isAuthenticated = (parent, args, { me }) => (
  me ? skip : new ForbiddenError('Not authenticated as user.')
)
//</editor-fold>

//<editor-fold desc="MessageOwner">
export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findByPk(id, { raw: true });
  
  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  
  return skip;
}
//</editor-fold>

//<editor-fold desc="IsAdmin">
export const isAdmin = async (parent, args, context) => {
  const { role: userRole } = context.me;
  
  if (userRole !== 'ADMIN') {
    throw new ForbiddenError('Not admin')
  }
  
  return skip;
}
//</editor-fold>

