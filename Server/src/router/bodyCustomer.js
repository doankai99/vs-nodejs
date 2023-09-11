import  express  from "express";
import { addbodyCustomerController } from "../controller/bodyCustomerController.js";

const router = express.Router()

router.post('/addbody', addbodyCustomerController)

export default router;
