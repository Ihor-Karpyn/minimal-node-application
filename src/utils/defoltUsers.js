import models from '../models';

export const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'ihor',
      messages: [
        {text: 'Published the Road to learn React'}
      ],
      email: 'igor82200@gmail.com',
      password: '1111',
      role: 'ADMIN',
    },
    {
      include: [models.Message]
    },
  );
  
  await models.User.create(
    {
      username: 'oleh',
      messages: [
        { text: 'Hello World' },
        { text: 'So difficult' }
      ],
      email: 'pes@gmail.com',
      password: '2222',
    },
    {
      include: [models.Message],
    },
  )
  
};
