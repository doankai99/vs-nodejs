import  express  from "express";
import {
    confirmActiveOrderController,
    createOrderByStaff, customerCreateOrderController,
    deleteOrderController, filterOrderController,
    historyOrderController,
    inactiveOrderController, listOrderCustomerController, orderDetailController,
    orderProcessController, orderStaffCreatedController, patentedOrderController,
    updateOrderController, updateStatusOrderController
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
//delete order
router.delete('/deleteOrder/:id', deleteOrderController)
//Order detail
router.get('/orderDetail/:id', orderDetailController)
//List order customer
router.get('/listOrderCustomer/:id', listOrderCustomerController)
//update status order
router.put('/updateStatusOrder/:id', updateStatusOrderController)
//Filter Order
router.post('/filterOrder', filterOrderController)
//List order my staff create
router.get('/orderStaffCreated/:id', orderStaffCreatedController)
//update total and payment status when user patented
router.get('/:id/patentedOrder', patentedOrderController)

export default router;