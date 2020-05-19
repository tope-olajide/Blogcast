import mongoose from 'mongoose';
import { Request, Response } from 'express';
import {
  validateInputCharLength,
} from '../utils/mySimpleValidator';
import AudioPosts from '../models/audioPost';
import verifyAuthorization from '../middleware/validateUser';
import { IGetUserAuthInfoRequest } from '../interfaces'
/**
 * @description - Class Definition for the AudioPost Object
 *
 * @class AudioPost
 */
export default class AudioPost {
  /**
   * @description - Create new Audio Post
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} The Promise Object
   *
   * @memberof AudioPost
   */
  public async createAudioPost(req: Request, res: Response): Promise<object> {
    const userReq = req as IGetUserAuthInfoRequest;
    const userId = userReq.user.id;
    const {
      title, tag, featureImageUrl, content, audioUrl, excerpt,
    } = req.body;
    const validatePost = () => {
      const verifyPostTitle = validateInputCharLength(title,'title', 5, 1000);
      if (verifyPostTitle[0] === false) {
        return [false, verifyPostTitle[1]];
      }
      const verifyPostContent = validateInputCharLength(content,'content', 5, 50000);
      if (verifyPostContent[0] === false) {
        return [false, verifyPostContent[1]];
      }
      const verifyAudioUrl = validateInputCharLength(audioUrl,'audioUrl', 3, 50000);
      if (verifyAudioUrl[0] === false) {
        return [false, verifyAudioUrl[1]];
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
      tag,
      featureImageUrl,
      content,
      audioUrl,
      excerpt,
      created: Date(),
      modified: Date(),
      userId,
    };

    try {
      const createdPost = await AudioPosts.create(postData);
      return res.status(201).json({
        success: true,
        message: 'New Entry created',
        createdPost,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error creating Post',
        error,
      });
    }
  }
}
