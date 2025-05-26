const ApiError = require('../../classes/api.error');
const {generateUUID} = require('../../utils/generators');
const SessionService = require('../session/session.service');

class UserService {
  constructor(userRepository, sessionService) {
    this.userRepository = userRepository;
    this.sessionService = sessionService;
  }

  async createUserWithCredentials({email, password}) {
    const existingUserTO = await this.userRepository.findUserByEmail(email);
    if (existingUserTO) {
      throw ApiError.BadRequest(`User with email ${email} already exist`);
    }

    const userId = generateUUID();
    const now = Date.now();

    const userTO = {
      id: userId,
      email,
      password,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now,
    };

    await this.userRepository.createUser(userTO);

    const userVO = {...userTO};
    return userVO;
  }

  async getUserByEmail({email}) {
    const userTO = await this.userRepository.findUserByEmail(email);
    if (!userTO) {
      throw ApiError.NotFound(`User with email ${email} not found`);
    }

    const userVO = {...userTO};
    return userVO;
  }

  async getUserByAccessToken({accessToken}) {
    const sessionVO = await this.sessionService.getSessionByAccessToken({accessToken});
    const isSessionValid = SessionService.validateSession(sessionVO);

    if (!isSessionValid) {
      throw ApiError.BadRequest('Session is not valid');
    }

    const userTO = await this.userRepository.findUserById(sessionVO.userId);
    if (!userTO) {
      throw ApiError.NotFound(`User with id ${sessionVO.userId} not found`);
    }

    const userVO = {...userTO};
    return userVO;
  }

  static getUserWithoutSensitiveData(userVO) {
    return {...userVO, password: undefined};
  }
}

module.exports = UserService;
