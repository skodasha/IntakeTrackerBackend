const BaseController = require('../../classes/base.controller');

const {userRegistrationSchema, userLoginSchema} = require('../../validators/auth.validator');
const requestValidationMiddleware = require('../../middlewares/request-validation.middleware');
const sessionValidationMiddleware = require('../../middlewares/session-validation.middleware');

class AuthController extends BaseController {
  constructor(authService, userService) {
    super();

    this.authService = authService;

    // Make sure all methods are bind to this
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.router.post(
      '/register',
      requestValidationMiddleware([userRegistrationSchema]),
      this.register,
    );

    this.router.post(
      '/login',
      requestValidationMiddleware(userLoginSchema),
      this.login,
    );

    this.router.post(
      '/logout',
      sessionValidationMiddleware(userService),
      this.logout,
    );
  }

  async register(req, res, next) {
    try {
      const userRegistrationDataVO = {
        email: req.body.email,
        password: req.body.password,
      };

      const tokensVO = await this.authService.register(userRegistrationDataVO);
      return res.status(200).json(tokensVO);
    } catch (e) {
      return next(e);
    }
  }

  async login(req, res, next) {
    try {
      const userLoginDataVO = {
        email: req.body.email,
        password: req.body.password,
      };

      const tokensVO = await this.authService.login(userLoginDataVO);
      return res.status(200).json(tokensVO);
    } catch (e) {
      return next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const {token, user} = req;

      await this.authService.logout({
        accessToken: token,
        userId: user.id,
      });

      return res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = AuthController;
