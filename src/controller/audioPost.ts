import mongoose from 'mongoose';
import { Request, Response } from 'express';
import {
  validateInputCharLength,
} from '../utils/mySimpleValidator';
import AudioPosts from '../models/audioPost';
import verifyOwner from '../middleware/validateUser';
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
  /**
   * @description - Modify Audio Post
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} The Promise Object
   *
   * @memberof AudioPost
   */
  public async modifyAudioPost(req: Request, res: Response): Promise<object> {
    const userReq = req as IGetUserAuthInfoRequest;
    const userId = userReq.user.id;
    const {
      postId,
    } = req.params;
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
        const verifyUser = await verifyOwner(userId,postId,AudioPosts);
        if (verifyUser[0]) {
        const postData = {
          title: title || verifyUser[1].title,
          tag: tag || verifyUser[1].tag,
          featureImageUrl: featureImageUrl || verifyUser[1].featureImageUrl,
          content: content || verifyUser[1].content,
          audioUrl: audioUrl || verifyUser[1].audioUrl,
          excerpt: excerpt || verifyUser[1].excerpt,
          modified: Date(),
        };
        const modifiedPost = await AudioPosts.updateMany({
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
        
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error Modifying Post',
        error,
      });
    }
  }

  /**
   * @description - Fetches All Audio Post
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} The Promise Object
   *
   * @memberof AudioPost
   */
  public async fetchAllAudioPost(req: Request, res: Response): Promise<object> {
    try {
      const allAudioPosts = await AudioPosts.find({});
      if (allAudioPosts) {
        return res.status(200).json({
          success: true,
          message: 'Audio Post Found!',
          allAudioPosts,
        });
      }
      return res.status(204).json({
        success: true,
        message: 'No Audio Post Found!',
        allAudioPosts: [],
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error Fetching Post',
        error,
      });
    }
  }
  
  /**
   * @description - Fetch Audio Post Details
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} The Promise Object
   *
   * @memberof AudioPost
   */
  public async fetchPostDetails(req: Request, res: Response): Promise<object> {
    const {
      postId,
    } = req.params;
    try {
      if (mongoose.Types.ObjectId.isValid(postId)) {
        const postDetails = await AudioPosts.findOne({ _id: postId });
        if (postDetails) {
          return res.status(200).json({
            success: true,
            message: 'Post Found!',
            postDetails,
          });
        }
        return res.status(404).json({
          success: false,
          message: 'No Audio Post Found!',
          postDetails: [],
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Invalid Post Id',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error Fetching Post',
        error,
      });
    }
  }

  /**
   * @description - Delete Post
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} The Promise Object
   *
   * @memberof AudioPost
   */
  public async deleteAudioPost (req: Request, res: Response): Promise<object> {
    const userReq = req as IGetUserAuthInfoRequest;
    const userId = userReq.user.id;
    const {
      postId,
    } = req.params;
    const verifyUser = await verifyOwner(userId,postId,AudioPosts);
    if(!verifyUser[0]){
      return res.status(verifyUser[1].errorCode).json({
        success: false,
        message: verifyUser[1].message,
        postFound: verifyUser[1].postFound,
      });
    }
    try {
      if (mongoose.Types.ObjectId.isValid(postId)) {
        const removedPost = await AudioPosts.findOneAndRemove({ _id: postId });
        if (removedPost) {
          return res.status(200).json({
            success: true,
            message: 'Post Removed!',
            removedPost,
          });
        }
        return res.status(204).json({
          success: true,
          message: 'Post does not exist',
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Invalid Post Id',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error Fetching Post',
        error,
      });
    }
  }
}
