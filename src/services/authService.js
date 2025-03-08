import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: '', // process.env.USER_POOL_ID,
  ClientId: '', // process.env.CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const getCognitoUser = (email) => {
  let userData = {
    Username: email,
    Pool: userPool,
  };
  return new AmazonCognitoIdentity.CognitoUser(userData);
};

const getAuthDetails = (email, password) => {
  let userData = {
    Username: email,
    Password: password,
  };
  return new AmazonCognitoIdentity.AuthenticationDetails(userData);
};

export const loginService = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    try {
      getCognitoUser(email).authenticateUser(getAuthDetails(email, password), {
        onSuccess: (result) => {
          const token = {
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          };
          resolve(token);
        },
        onFailure: function (err) {
          reject(err);
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

// Логаут користувача
export const logoutService = async () => {
  return new Promise((resolve, reject) => {
    try {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.signOut();
        resolve({ message: 'Logged out successfully' });
      } else {
        reject(new Error('No user logged in'));
      }
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

// Запит на скидання пароля (відправка листа)
export const requestResetEmailService = async (email) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);
    cognitoUser.forgotPassword({
      onSuccess: function () {
        resolve({ message: 'Password reset email sent' });
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
};

// Скидання пароля з кодом підтвердження
export const resetPasswordService = async ({ email, code, newPassword }) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: function () {
        resolve({ message: 'Password successfully reset' });
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
};
