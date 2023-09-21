const express = require('express')
const router = express.Router();

const {verifyAuth} = require('../middleware/authUser')

const {AddAddress , getAllAddress, updateAddress, deleteAddress} = require('../controllers/addressController')
router.post('/addAddress',verifyAuth,AddAddress);
router.get('/getAllAddress/:id',verifyAuth,getAllAddress);
router.put('/updateAddress',verifyAuth,updateAddress);
router.delete('/deleteAddress/:id',verifyAuth,deleteAddress);


module.exports = router;