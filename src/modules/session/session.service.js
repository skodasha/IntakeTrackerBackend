const jwt = require('jsonwebtoken');
const {millisecondsInHour} = require('date-fns/constants');

const config = require('../../config/config');
const {generateUUID} = require('../../utils/generators');
const ApiError = require('../../classes/api.error');

class SessionService {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async createUserSession({userId}) {
    const {
      accessToken,
      accessTokenExpires,
    } = SessionService.jwtSignData(userId);

    const now = Date.now();

    const sessionTO = {
      id: generateUUID(),
      userId,
      accessToken,
      accessTokenExpires,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now,
    };

    await this.sessionRepository.createSession(sessionTO);

    const sessionVO = {...sessionTO};
    return sessionVO;
  }

  async getSessionByAccessToken({accessToken}) {
    const sessionTO = await this.sessionRepository.findSessionByAccessToken(accessToken);
    if (!sessionTO) {
      throw ApiError.NotFound('Session not found by accessToken');
    }

    const sessionVO = {...sessionTO};
    return sessionVO;
  }

  async deleteSessionByAccessTokenAndUserId({accessToken, userId}) {
    await this.sessionRepository.deleteSessionByAccessTokenAndUserId({accessToken, userId});
  }

  static validateSession(sessionVO) {
    const now = Date.now();
    const isSessionValid = Number(sessionVO.accessTokenExpires) > now;

    return isSessionValid;
  }

  static jwtSignData(userId) {
    const now = Date.now();
    const payload = {id: userId};

    return {
      accessToken: jwt.sign(payload, config.accessTokenSecret),
      accessTokenExpires: now + (millisecondsInHour * 8),
    };
  }
}

module.exports = SessionService;
