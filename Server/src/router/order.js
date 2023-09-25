import  express  from "express";
import {createOrderByStaff} from "../controller/orderController.js";

const router = express.Router()

//tạo order by staff
router.post('/createOrder/:id', createOrderByStaff)

export default router;