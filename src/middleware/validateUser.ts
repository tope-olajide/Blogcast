import StandardPosts from '../models/standardPost';
import AudioPosts from '../models/standardPost';
/**
   * @description - Verifies Post Owner
   *
   * @param {integer} userId - User Id
   *
   * @param {integer} postId - Post ID
   *
   * @param {object} postModel - Model of the post; AudioPosts or StandardPosts
   * 
   * @return {object} Promise Object
   */
const verifyOwner:any = async (userId:any, postId:any, postModel:any): Promise<object> => {
  try {
    const postFound:any = await postModel.findById({ _id: postId });
    if (!postFound) {
      return [false, {
        errorCode: 404,
        message:'The post with the given ID does not exist.',

      }];
    }
    if (userId != postFound.userId) {
      return [
        false, {
          errorCode: 401,
          message: 'You cannot delete or modify a post that does not belong to you',
          postFound:{},
        },
      ];
    }
    return [
      true, { postFound },
    ];
  } catch (error) {
    return [false, {
      errorCode: 500,
      message: error,
    }];
  }
};

export default verifyOwner;
