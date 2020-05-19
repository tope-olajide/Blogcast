import mongoose from 'mongoose'
import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces'
import {
  validateInputCharLength,
} from '../utils/mySimpleValidator';
import StandardPosts from '../models/standardPost';
import verifyOwner from '../middleware/validateUser';


/**
export default class StandardPost {
 * @description - Class Definition for the StandardPost Object
 *
 * @class StandardPost
 */
export default class StandardPost {
  /**
   * @description - Create new Standard Post
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} The Promise Object
   *
   * @memberof StandardPost
   */
  public async createPost(req: Request, res: Response): Promise<object> {
    const userReq = req as IGetUserAuthInfoRequest;
    const userId = userReq.user.id;
    console.log(userReq.user)
    const {
      title, tag, featureImageUrl, content, excerpt,
    } = req.body;
    const validatePost = () => {
      const verifyPostTitle = validateInputCharLength(title, 'title', 5, 1000);
      if (verifyPostTitle[0] === false) {
        return [false, verifyPostTitle[1]];
      }
      const verifyPostContent = validateInputCharLength(content, 'content', 5, 50000);
      if (verifyPostTitle[0] === false) {
        return [false, verifyPostContent[1]];
      }
      return [true];
    };
    const validatePostDetails = validatePost();
    if (validatePostDetails[0] === false) {
      return res.status(400).json({
        success: false,
        message: validatePostDetails[1],
      });
    }
    const postData = {
      title,
      excerpt,
      tag,
      featureImageUrl,
      content,
      created: Date(),
      modified: Date(),
      userId,
    };

    try {
      const createdPost = await StandardPosts.create(postData);
      return res.status(201).json({
        success: true,
        message: 'New Entry created',
        createdPost,
      });
    } catch (error) {
      if(error.code === 11000){
        return res.status(400).json({
          success: false,
          message: 'Duplicate Post',
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Error creating Post',
        error,
      });
    }
  }
  public async modifyPost(req: Request, res: Response): Promise<object> {
    const userReq = req as IGetUserAuthInfoRequest;
    const userId = userReq.user.id;
    console.log(userId)
    const {
      postId,
    } = req.params;
    const {
      title, tag, featureImageUrl, content, excerpt,
    } = req.body;
    const validatePost = () => {
      const verifyPostTitle = validateInputCharLength(title,'title', 5, 1000);
      if (verifyPostTitle[0] === false) {
        return [false, verifyPostTitle[1]];
      }
      const verifyPostContent = validateInputCharLength(content,'content', 5, 50000);
      if (verifyPostTitle[0] === false) {
        return [false, verifyPostContent[1]];
      }
      return [true];
    };
    const validatePostDetails = validatePost();
    if (validatePostDetails[0] === false) {
      return res.status(400).json({
        success: false,
        message: validatePostDetails[1],
      });
    }
    try {
      const verifyUser = await verifyOwner(userId,postId);
      if (verifyUser[0]) {
        const postData = {
          title: title || verifyUser[1].title,
          tag: tag || verifyUser[1].tag,
          featureImageUrl: featureImageUrl || verifyUser[1].featureImageUrl,
          excerpt: excerpt || verifyUser[1].excerpt,
          content: content || verifyUser[1].content,
          modified: Date(),
        };
        const modifiedPost = await StandardPosts.updateMany({
          _id: postId,
        },
          {
            $set: postData,
          });
        return res.status(201).json({
          success: true,
          message: ' Entry Modified',
          modifiedPost,
        });
      }
      return res.status(verifyUser[1].errorCode).json({
        success: false,
        message: verifyUser[1].message,
        postFound: verifyUser[1].postFound,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error Modifying Post',
        error,
      });
    }
  }
}

