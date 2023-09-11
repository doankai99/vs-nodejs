import express from "express";
import {
    addNewProductController,
    deleteProductController, detailProductController,
    getAllProductController, updateProductController
} from "../controller/productController.js";
import uploadProduct from "../middleware/uploadProduct.js";

const router = express.Router()

router.post('/addNewProduct',uploadProduct.single('image'), addNewProductController)

router.get('/getAllProduct', getAllProductController)

router.delete('/delete/:id', deleteProductController)

router.put('/update/:id',uploadProduct.single('image'), updateProductController)

router.get('/:id', detailProductController)

export default router;