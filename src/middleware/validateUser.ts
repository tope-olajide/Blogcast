import StandardPosts from '../model/standardPost';
import Users from '../model/user';
/**
   * @description - Verifies Post Owner
   *
   * @param {integer} userId - HTTP Request
   *
   * @param {integer} postId - HTTP Response
   *
   * @return {object} Post or Error
   */
const verifyOwner = async (userId, postId) => {
  try {
    const postFound = await StandardPosts.findById({ _id: postId });
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
          postFound,
        },
      ];
    }
    return [
      true, { postFound },
    ];
  } catch (error) {
    return [false, {
      errorCode: 500,
      errorMessage: 'Error! Could not retrieve the post with the given post ID.',
    }];
  }
};
/**
   * @description - Verifies Post Owner
   *
   * @param {integer} userId - HTTP Request
   *
   * @param {integer} postId - HTTP Response
   *
   * @return {object} Post or Error
   */
const verifyAuthorization = async (userId) => {
  try {
    const userFound = await Users.findById({ _id: userId });
    if (!userFound) {
      return [false, {
        errorCode: 404,
        errorMessage: 'Error! The user does not exist.',
      }];
    }
    if (userFound.role !== 'SuperAdmin') {
      return [
        false, {
          errorCode: 401,
          message: 'Access Denied!',
        },
      ];
    }
    return [
      true, { userFound },
    ];
  } catch (error) {
    return [false, {
      errorCode: 500,
      errorMessage: 'Error! Could not retrieve the user with the given user ID.',
      error
    }];
  }
};
export default verifyAuthorization;
