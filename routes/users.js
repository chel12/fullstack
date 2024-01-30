const express = require('express');
const router = express.Router();
const { login, register, current } = require('../controllers/users');
/* GET users listing. */
//функции вынесены в controllers / users.js и экспортируются оттуда
// /api/user/Login
router.post('/login', login);
// /api/user/register
router.post('/register', register);
// /api/user/current
router.get('/current', current);

module.exports = router;
