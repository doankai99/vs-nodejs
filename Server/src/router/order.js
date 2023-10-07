import  express  from "express";
import {
    confirmActiveOrderController,
    createOrderByStaff, customerCreateOrderController,
    deleteOrderController,
    historyOrderController,
    inactiveOrderController, orderDetailController,
    orderProcessController,
    updateOrderController
} from "../controller/orderController.js";

const router = express.Router()

//tạo order by staff
router.post('/createOrder/:id', createOrderByStaff)

//tạo order by customer
router.post('/customerOrder/:id', customerCreateOrderController)
//Get order inactive
router.get('/inactiveOrder', inactiveOrderController)
//Get order done and Close
router.get('/historyOrder', historyOrderController)
//get order Active
router.get('/orderProcess', orderProcessController)

//Update status order
router.put('/updateOrderController', updateOrderController)
//confirm order
router.put('/confirmActiveOrder/:id', confirmActiveOrderController)

router.delete('/deleteOrder/:id', deleteOrderController)

//Order detail
router.get('/orderDetail/:id', orderDetailController)

export default router;