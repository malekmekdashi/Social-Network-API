const router = require('express').Router();
const thoughtRoutes = require('../api/ThoughtRoute');
const userRoutes = require('../api/UserRoute');

router.use('/thought', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;