const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

apiRouter.use('/users', require('./users'));

apiRouter.use('/purchases', require('./purchases'));

apiRouter.use('/subscriptions', require('./subscriptions'));

module.exports = apiRouter;
