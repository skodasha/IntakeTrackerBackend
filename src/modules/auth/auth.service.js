const bcrypt = require('bcryptjs');

const ApiError = require('../../classes/api.error');
const config = require('../../config/config');

class AuthService {
  constructor(userService, sessionService) {
    this.userService = userService;
    this.sessionService = sessionService;
  }

  async register(userRegistrationDataVO) {
    try {
      const hashedPassword = await bcrypt.hash(
        userRegistrationDataVO.password,
        parseInt(config.hashSalt, 10),
      );
      
      const userVO = await this.userService.createUserWithCredentials({
        email: userRegistrationDataVO.email,
        password: hashedPassword,
      });
      
      const sessionVO = await this.sessionService.createUserSession({
        userId: userVO.id,
      });

      return {
        accessToken: sessionVO.accessToken,
      };
    } catch (err) {
      if (err) {
        throw err;
      }
      throw ApiError.BadRequest('Error processing registration request');
    }
  }

  async login(userLoginDataVO) {
    try {
      const userVO = await this.userService.getUserByEmail({
        email: userLoginDataVO.email,
      });


      const isPasswordValid = await bcrypt.compare(
        userLoginDataVO.password,
        userVO.password,
      );

      if (!isPasswordValid) {
        throw ApiError.BadRequest('Password validation failed');
      }

      const sessionVO = await this.sessionService.createUserSession({
        userId: userVO.id,
      });

      return {
        accessToken: sessionVO.accessToken,
      };
    } catch (error) {
      if (err) {
        throw err;
      }
      throw ApiError.BadRequest('Error processing login request');
    }
  }

  async logout({
    accessToken,
    userId,
  }) {
    try {
      await this.sessionService.deleteSessionByAccessTokenAndUserId({
        accessToken, userId,
      });
    } catch {
      throw ApiError.BadRequest('Error processing logout request');
    }
  }
}

module.exports = AuthService;
