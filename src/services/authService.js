import { CLIENT_ID, USER_POOL_ID } from '../helpers/constants.js';
import AWS from 'aws-sdk';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { createUser } from './userService.js';

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const cognito = new AWS.CognitoIdentityServiceProvider();

const getCognitoUser = (email) => {
  return new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool,
  });
};

const getAuthDetails = (email, password) => {
  return new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password,
  });
};

// Реєстрація користувача
export const registerUserService = async ({ email, password, group }) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        return reject(err);
      }

      const userSub = result.userSub;

      if (group) {
        cognito
          .adminAddUserToGroup({
            UserPoolId: USER_POOL_ID,
            Username: email,
            GroupName: group,
          })
          .promise()
          .then(async () => {
            await createUser({
              nickname: email,
              password,
              cognitoSub: userSub,
            });
            resolve({ message: 'User registered and added to group', userSub });
          })
          .catch((groupError) => {
            console.error('Помилка додавання до групи:', groupError);
            reject(groupError);
          });
      } else {
        resolve({ message: 'User registered successfully', userSub });
      }
    });
  });
};

// Логін користувача
export const loginService = async ({ email, password }) => {
  console.log('Login Service');
  return new Promise((resolve, reject) => {
    getCognitoUser(email).authenticateUser(getAuthDetails(email, password), {
      onSuccess: (result) => {
        console.log('Login Service result', result);
        resolve({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => {
        console.log('Login Service error', result);
        reject(err);
      },
    });
  });
};

// Вихід з акаунту
export const logoutService = async () => {
  return new Promise((resolve, reject) => {
    try {
      const currentUser = userPool.getCurrentUser();
      if (!currentUser) {
        return resolve({ message: 'User already logged out' });
      }
      currentUser.signOut();
      resolve({ message: 'Logged out successfully' });
    } catch (err) {
      reject(err);
    }
  });
};

// Оновлення токена
export const refreshService = async () => {
  return new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      return reject(new Error('No user logged in'));
    }

    currentUser.getSession((err, session) => {
      if (err || !session.isValid()) {
        return reject(new Error('Session is invalid or expired'));
      }

      currentUser.refreshSession(
        session.getRefreshToken(),
        (err, newSession) => {
          if (err) {
            return reject(err);
          }
          resolve({
            accessToken: newSession.getAccessToken().getJwtToken(),
            idToken: newSession.getIdToken().getJwtToken(),
            refreshToken: newSession.getRefreshToken().getToken(),
          });
        },
      );
    });
  });
};

// Запит на скидання пароля
export const requestResetEmailService = async (email) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);
    cognitoUser.forgotPassword({
      onSuccess: () => resolve({ message: 'Password reset email sent' }),
      onFailure: (err) => reject(err),
    });
  });
};

// Скидання пароля за кодом
export const resetPasswordService = async ({ email, code, newPassword }) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => resolve({ message: 'Password successfully reset' }),
      onFailure: (err) => reject(err),
    });
  });
};

// Підтвердження email після реєстрації
export const confirmEmailService = async ({ email, code }) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve({ message: 'Email successfully confirmed', result });
    });
  });
};

// Деактивація користувача
export const disableUserService = async (email) => {
  try {
    await cognito
      .adminDisableUser({
        UserPoolId: USER_POOL_ID,
        Username: email,
      })
      .promise();

    return { message: 'User has been disabled successfully' };
  } catch (err) {
    throw new Error(`Failed to disable user: ${err.message}`);
  }
};

// Активація користувача
export const enableUserService = async (email) => {
  try {
    await cognito
      .adminEnableUser({
        UserPoolId: USER_POOL_ID,
        Username: email,
      })
      .promise();

    return { message: 'User has been enabled successfully' };
  } catch (err) {
    throw new Error(`Failed to enable user: ${err.message}`);
  }
};
