import  express  from "express";
import {
    addBodyCustomerController,
    allBodyMeasurements,
    bodyOfCustomerController, createBodyMeasurementCustomer
} from "../controller/bodyCustomerController.js";

const router = express.Router()

//Add body of staff
router.post('/addBody', addBodyCustomerController)

//Get body of Customer
router.get('/bodyOfCustomer/:id', bodyOfCustomerController)

//get All body Customer
router.get('/allBodyMeasurements', allBodyMeasurements)

//Add body by customer
router.post('/createBodyMeasurementCustomer/:id', createBodyMeasurementCustomer)

export default router;
