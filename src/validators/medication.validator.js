const {checkSchema} = require('express-validator');

const medicationSchema = checkSchema({
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'Name must be a string',
      bail: true,
    },
    trim: true,
    notEmpty: {
      errorMessage: 'Name is required',
    },
    isLength: {
      options: {max: 250},
      errorMessage: 'Name must be less than or equal to 250 characters',
    },
  },
  description: {
    in: ['body'],
    isString: {
      errorMessage: 'Description must be a string',
      bail: true,
    },
    trim: true,
    notEmpty: {
      errorMessage: 'Description is required',
    },
    isLength: {
      options: {max: 500},
      errorMessage: 'Description must be less than or equal to 500 characters',
    },
  },
  initialAmount: {
    in: ['body'],
    isInt: {
      options: {min: 0},
      errorMessage: 'Initial amount must be a non-negative integer',
    },
    toInt: true,
  },
  targetAmount: {
    in: ['body'],
    isInt: {
      options: {min: 1},
      errorMessage: 'Target amount must be a positive integer',
    },
    toInt: true,
    custom: {
      options: (value, {req}) => {
        const initial = req.body.initialAmount;
        if (initial !== undefined && value < initial) {
          throw new Error('Target amount must be greater than or equal to initial amount');
        }
        return true;
      },
    },
  },
});

module.exports = {
  medicationSchema,
};
