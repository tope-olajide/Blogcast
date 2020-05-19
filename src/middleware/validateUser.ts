import StandardPosts from '../models/standardPost';
/**
   * @description - Verifies Post Owner
   *
   * @param {integer} userId - HTTP Request
   *
   * @param {integer} postId - HTTP Response
   *
   * @return {object} Promise Object
   */
const verifyOwner:any = async (userId:any, postId:any): Promise<object> => {
  try {
    const postFound:any = await StandardPosts.findById({ _id: postId });
    if (!postFound) {
      return [false, {
        errorCode: 404,
        errorMessage: 'Error! The post with the given ID does not exist.',

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
