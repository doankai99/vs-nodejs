import  express  from "express";
import {addBodyCustomerController, bodyOfCustomerController} from "../controller/bodyCustomerController.js";

const router = express.Router()

router.post('/addBody', addBodyCustomerController)

router.get('/bodyOfCustomer/:id', bodyOfCustomerController)

export default router;
