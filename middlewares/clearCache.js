const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  await next(); // wait for the route handler to finish
  clearHash(req.user.id);
};
