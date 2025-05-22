const express = require('express');

class BaseController {
  constructor(mergeParams = true) {
    this.router = express.Router({mergeParams});
  }

  getRouter() {
    return this.router;
  }
}

module.exports = BaseController;
