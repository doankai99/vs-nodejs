import express from "express";
import {
    addPriceController, deletePriceController, detailPriceController,
    getAddPriceProductController,
    updatePriceProductController
} from "../controller/priceRowController.js";

const router = express.Router()

router.post('/addPrice', addPriceController)
router.get('/getAllPriceProduct', getAddPriceProductController)
router.put('/updatePriceProduct', updatePriceProductController)
router.delete('/deletePrice/:id', deletePriceController)
router.get('/:id', detailPriceController)

export default router;