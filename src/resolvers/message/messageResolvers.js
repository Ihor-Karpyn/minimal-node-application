export const createMessage = async (parent, { text }, { models, me }) => {
  return await models.Message.create({
    text,
    userId: me.id,
  });
};

export const removeMessage = async (parent, {id}, { models }) => (
  await models.Message.destroy({ where: { id } })
);

export const getMessagesById = async (user, args, {models}) => (
  await models.Message.findAll({
    where: {
      userId: user.id,
    },
  })
);
