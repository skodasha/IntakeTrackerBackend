const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error.middleware');
const {createDatabaseClient} = require('./utils/db-client');

const config = require('./config/config');

const UserRepository = require('./modules/user/user.repository');
const SessionRepository = require('./modules/session/session.repository');

const AuthService = require('./modules/auth/auth.service');
const UserService = require('./modules/user/user.service');

const AuthController = require('./modules/auth/auth.controller');
const UserController = require('./modules/user/user.controller');
const SessionService = require('./modules/session/session.service');

const expressApp = express();

const startServer = (app) => {
  const dbClient = createDatabaseClient({connectionString: config.connectionString});

  app.use(cors());
  app.use(express.json());

  const userRepository = new UserRepository(dbClient);
  const sessionRepository = new SessionRepository(dbClient);

  const sessionService = new SessionService(sessionRepository);
  const userService = new UserService(userRepository, sessionService);
  const authService = new AuthService(userService, sessionService);

  const rootRouter = express.Router();

  // Register controllers
  rootRouter.use('/auth', new AuthController(authService, userService).getRouter());
  rootRouter.use('/users', new UserController(userService).getRouter());

  app.use(rootRouter);
  app.use(errorMiddleware);

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Medication Intake Tracker API is listening on port ${config.port}`);
  });
};

startServer(expressApp);
