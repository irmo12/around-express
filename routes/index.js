const { usersRoute } = require('./users');
const { cardsRoute } = require('./cards');

const router = require('express').Router();

router.use('/users', usersRoute);
router.use('/cards', cardsRoute);

module.exports =  router;