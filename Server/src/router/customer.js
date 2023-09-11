import express from "express";
import {
    addCustomerController,
    deleteCustomerController,
    detailCustomerController, getAllCustomerController,
    getAllInformationCustomerController, loginCustomerController,
    updateCustomerController
} from "../controller/customerController.js";
import uploadUserCloud from "../middleware/uploadUser.js";
import uploadCustomerCloud from "../middleware/uploadCustomer.js";

const router = express.Router()

router.post('/createCustomer',uploadCustomerCloud.single('image'), addCustomerController)

router.post( '/login', loginCustomerController)

router.get('/:customerId', detailCustomerController)

router.get('/getAll/getCustomer', getAllCustomerController)

router.get('/allInformationCustomer/:customerId', getAllInformationCustomerController)

router.patch('/updateCustomer/:id', updateCustomerController)

router.delete('/delete/:id', deleteCustomerController)

export default router;