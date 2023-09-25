import  express  from "express";
import {
    addBodyCustomerController,
    allBodyMeasurements,
    bodyOfCustomerController
} from "../controller/bodyCustomerController.js";

const router = express.Router()

router.post('/addBody', addBodyCustomerController)

router.get('/bodyOfCustomer/:id', bodyOfCustomerController)

router.get('/allBodyMeasurements', allBodyMeasurements)

export default router;
