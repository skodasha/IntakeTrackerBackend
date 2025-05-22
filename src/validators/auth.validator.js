const {checkSchema} = require('express-validator');

const emailAndPasswordSchema = {
  email: {
    in: ['body'],
    isEmail: true,
    normalizeEmail: true,
    isString: {
      bail: true,
      errorMessage: 'Email must be string',
    },
    isLength: {
      options: {
        max: 250,
      },
      bail: true,
      errorMessage: 'Email must be less than 250 symbols',
    },
  },
  password: {
    in: ['body'],
    isString: {
      bail: true,
      errorMessage: 'Password must be string',
    },
    isLength: {
      options: {
        min: 6,
        max: 250,
      },
      bail: true,
      errorMessage: 'Password must be greater than 6 and less than 250 symbols',
    },
  },
};

const userRegistrationSchema = checkSchema({
  ...emailAndPasswordSchema,
});

const userLoginSchema = checkSchema({
  ...emailAndPasswordSchema,
});

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
};
