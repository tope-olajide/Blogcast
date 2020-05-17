import mongoose from 'mongoose';
import Users from '../models/user';
import * as bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { Request, Response } from 'express';
import {
  validateOnlyStringChars,
  validateEmailAddress,
  validateInputCharLength,
} from '../utils/mySimpleValidator';
/**
 * @description - Class Definition for the User Object
 *
 * @class User
 */
export default class User {
  /**
* @description - Sign Up user (Create new user)
*
* @param {object} req - HTTP Request
*
* @param {object} res - HTTP Response
*
* @return {object} The Promise Object
*
* @memberof Users
*/
  public async signUp({ body }: Request, res: Response): Promise<object> {
    const {
      email, username, firstname, lastname, password,
    } = body;
    const validateUser = () => {
      const verifyEmail = validateEmailAddress(email);
      if (verifyEmail[0] === false) {
        return [false, verifyEmail[1]];
      }
      const verifyUsername = validateInputCharLength(username,'username', 3, 12);
      if (verifyUsername[0] === false) {
        return [false, verifyUsername[1]];
      }
      const verifyPassword = validateInputCharLength(password,'password', 5, 20);
      if (verifyPassword[0] === false) {
        return [false, verifyPassword[1]];
      }
      const verifyFirstName = validateOnlyStringChars(firstname,'firstname', 2, 50);
      if (verifyFirstName[0] === false) {
        return [false, verifyFirstName[1]];
      }
      const verifyLastName = validateOnlyStringChars(lastname,'lastname', 2, 50);
      if (verifyLastName[0] === false) {
        return [false, verifyLastName[1]];
      }
      return [true];
    };
    const validateUserDetails = validateUser();
    if (validateUserDetails[0] === false) {
      return res.status(400).json({
        success: false,
        message: validateUserDetails[1],
      });
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const userData = {
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      firstname,
      lastname,
      password: encryptedPassword,
    };
    try {
      const createdUser: any = await Users.create(userData);
      console.log(createdUser);
      const token = jsonwebtoken.sign(
        {
          id: createdUser._id,
          username: createdUser.username,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
        'process.env.JWT_SECRET',
      );
      return res.status(201).json({
        success: true,
        message: 'New user created successfully!',
        user: createdUser,
        token,
      });
    }
    catch (err) {
      if (
        err.name === 'MongoError'
        && err.code === 11000
        && err.errmsg.includes('email')
      ) {
        return res.status(400).json({
          success: false,
          message: 'User with this email address exist already',
        });
      } if (
        err.name === 'MongoError'
        && err.code === 11000
        && err.errmsg.includes('username')
      ) {
        return res.status(400).json({
          success: false,
          message: 'User with this username exists already',
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Unable to Register user',
        error: err,
      });
    }
  }

  /**
   * @description - Sign in User
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} The Promise Object
   *
   * @memberof User
   */
  public async signIn({ body }: Request, res: Response): Promise<object> {
    const { usernameOrEmail, password } = body;
    if(!usernameOrEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'invalid details!'
      });
    }
    try {
      const userFound:any = await Users.findOne({
        $or: [{ email: usernameOrEmail.toLowerCase() },
          { username: usernameOrEmail.toLowerCase() }],
      }).exec();
      if(!userFound) {
        return res.status(400).json({
          success: false,
          message: 'user not found!'
        });}
      if (bcrypt.compareSync(password, userFound.password)) {
        const { username } = userFound;
        const id = userFound._id;
        const token = jsonwebtoken.sign({
          id,
          username,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        }, 'process.env.JWT_SECRET');
        return res.status(200).json({
          success: true,
          message: 'User Signed In!',
          token,
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid login Details!'  /* 'Invalid pasword!' */
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: 'Invalid login Details!' /* 'User not found!' */,
        error: err,
      });
    }
  }
}