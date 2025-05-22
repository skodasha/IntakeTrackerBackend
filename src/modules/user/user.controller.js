const BaseController = require('../../classes/base.controller');
const sessionValidationMiddleware = require('../../middlewares/session-validation.middleware');
const UserService = require('./user.service');

class UserController extends BaseController {
  constructor(userService) {
    super();

    // Make sure all methods are bind to this
    this.getCurrentUser = this.getCurrentUser.bind(this);

    this.router.get(
      '/current',
      sessionValidationMiddleware(userService),
      this.getCurrentUser,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async getCurrentUser(req, res, next) {
    try {
      const {user} = req;
      const userWithoutSensitiveData = UserService.getUserWithoutSensitiveData(user);

      return res.status(200).json(userWithoutSensitiveData);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = UserController;
