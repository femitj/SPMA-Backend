import jwt from 'jsonwebtoken';
import hashHelper from '../helpers/Hash';
import Response from '../helpers/Response';
import jwtHelper from '../helpers/Token';
import User from '../database/models/users';

const { hashPassword } = hashHelper;

class Auth {
  static async create(req, res) {
    try {
      const { firstName, lastName, email, password, address, lga } = req.body;

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashPassword(password),
        address,
        lga,
        status: 'active',
        role: 'user',
      });
      const user = await newUser.save();

      if (!user) {
        const response = new Response(false, 400, 'Something went wrong');
        return res.status(response.code).json(response);
      }

      const response = new Response(true, 201, 'Registration successful', user);
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email,
      });
      if (!user) {
        const response = new Response(
          false,
          404,
          "Email doesn't exist. Please signup to join"
        );
        return res.status(response.code).json(response);
      }

      const hash = user.password;
      const result = hashHelper.comparePassword(hash, password);
      if (!result) {
        const response = new Response(
          false,
          400,
          'Incorrect password. Check password or click forgot password'
        );
        return res.status(response.code).json(response);
      }

      const { id, role, lga } = user;
      const token = jwtHelper.generateToken({
        id,
        email,
        role,
        lga,
      });

      const response = new Response(true, 200, 'logged in successfully', {
        token,
        id,
        user,
      });
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async allUsers(req, res) {
    try {
      const users = await User.find();
      if (!users.length) {
        const response = new Response(false, 404, 'No user found');
        return res.status(response.code).json(response);
      }

      const response = new Response(true, 200, 'Successfully retrieved', {
        users,
      });
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }
}

export default Auth;
