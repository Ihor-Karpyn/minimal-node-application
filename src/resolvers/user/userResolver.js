import jwt from 'jsonwebtoken';
import {UserInputError} from 'apollo-server';

const createToken = async (user, secret, expiresIn) => {
  const {id, email, username, role} = user;
  
  return await jwt.sign({id, email, username, role}, secret, {expiresIn});
};

export const getUsers = async (per, args, {models}) => (
  await models.User.findAll()
);

export const getUser = async (parent, {id}, {models}) => (
  await models.User.findByPk(id)
);

export const getMe = async (parent, args, {
  models,
  me,
}) => await models.User.findByPk(me.id);

//<editor-fold desc="SignUp">
export const signUp = async (parent, args, {models, secret}) => {
  const {username, email, password} = args;
  const user = await models.User.create({
    username, email, password,
  });
  
  return {token: createToken(user, secret, '30m')};
};
//</editor-fold>

//<editor-fold desc="SignIn">
export const signIn = async (parent, {login, password}, {models, secret}) => {
  const user = await models.User.findByLogin(login);
  
  if (!user) {
    throw  new UserInputError('No user found with this login');
  }
  
  const isValid = await user.validatePassword(password);
  
  if (!isValid) {
    throw new UserInputError('Invalid password');
  }
  
  return {token: createToken(user, secret, '30m')};
};
//</editor-fold>

export const deleteUser = async (parent, { id }, { models, me }) => {
  return await models.User.destroy({ where: { id } })
}
