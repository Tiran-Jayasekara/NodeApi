const express = require('express')
const router = express.Router();

const {addUser , getAllUsers , Login} = require('../controllers/userController')
router.post('/addUser',addUser);
router.post('/Login',Login);
router.get('/getAllUser',getAllUsers);


module.exports = router;