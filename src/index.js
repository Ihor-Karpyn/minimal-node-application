import express from 'express';
import {ApolloServer, AuthenticationError} from 'apollo-server-express';
import cors from 'cors';
import schema from './schema/index';
import resolvers from './resolvers/index';
import models, { sequelize } from './models/index';
import {SECRET} from './utils/env';
import jwt from 'jsonwebtoken';
import {createUsersWithMessages} from './utils/defoltUsers';

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, SECRET)
    } catch (error) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
}

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => ({
    models,
    me: await getMe(req),
    secret: SECRET,
  }),
});

server.applyMiddleware({app, path: '/graphql'});

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen( {port: 4000} , () =>
    console.log(`Example app listening on port http://localhost:4000/graphql!`),
  );
});
