import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secret = '8fbgj396378t3h53t893';
const saltRounds = 10;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });
    const matchPassword = userDoc
      ? bcrypt.compareSync(password, userDoc.password)
      : false;

    if (matchPassword) {
      const user = {
        _id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
        isAdmin: userDoc.isAdmin,
      };

      jwt.sign(user, secret, {}, (error, token) => {
        if (error) throw error;
        res.status(201).cookie('token', token).json({
          user,
          errors: null,
        });
      });
    } else {
      res.status(418).json({
        user: null,
        errors: {
          usernameError: 'Usuário não existe ou senha incorreta',
          passwordError: 'Usuário não existe ou senha incorreta',
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(418).json({
      user: null,
      errors: {
        usernameError: 'Erro no servidor',
        passwordError: 'Erro no servidor',
      },
    });
  }
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(418).json({
        user: null,
        errors: {
          usernameError: 'Nome de usuário já existe',
          passwordError: '',
          emailError: '',
        },
      });
    } else {
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const userDoc = await User.create({
        username,
        password: passwordHash,
        email,
      });
      const user = {
        _id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
        isAdmin: userDoc.isAdmin,
      };

      jwt.sign(user, secret, {}, (error, token) => {
        if (error) throw error;
        res.status(201).cookie('token', token).json({
          user: user,
          errors: null,
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(418).json({
      user: null,
      errors: {
        usernameError: 'Erro no servidor',
        passwordError: 'Erro no servidor',
        emailError: 'Erro no servidor',
      },
    });
  }
};

export { login, register };
