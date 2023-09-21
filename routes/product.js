const express = require('express')
const router = express.Router();

const {verifyAdmin} = require('../middleware/adminUser')
const {verifyAuth} = require('../middleware/authUser')
const {addProduct ,getAllProducts, deleteProducts, productByCatogory, productById, updateProducts}  = require('../controllers/productsController');
router.post('/addProduct',verifyAdmin,addProduct);
router.get('/getAllProducts',getAllProducts)
router.delete('/deleteProduct/:id',verifyAdmin,deleteProducts)
router.get('/productByCatogory/:catogory',productByCatogory)
router.get('/productById/:id',productById);
router.put('/updateProducts',verifyAdmin,updateProducts)

module.exports = router;