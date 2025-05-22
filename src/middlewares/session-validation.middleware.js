const bearerToken = require('express-bearer-token');

const ApiError = require('../classes/api.error');

const sessionValidationMiddleware = (userService) => {
  const validate = async (req, __res, next) => {
    const {token} = req;

    try {
      const userVO = await userService.getUserByAccessToken({
        accessToken: token,
      });

      req.user = userVO;
      return next();
    } catch (err) {
      return next(ApiError.UnauthorizedError(err.errors));
    }
  };

  return [bearerToken({
    headerKey: 'Bearer',
  }), validate];
};

module.exports = sessionValidationMiddleware;
