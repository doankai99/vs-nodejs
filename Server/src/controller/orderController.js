import {
    confirmActiveOrderService,
    createOrderByStaffService,
    customerCreateOrderService,
    deleteOrderService, filterOrderService,
    historyOrderService,
    inactiveOrderService,
    listOrderCustomerService,
    orderDetailService,
    orderProcessService, orderStaffCreatedService,
    updateOrderService,
    updateStatusOrderService
} from "../services/orderService.js";

export const createOrderByStaff = async (req, res) => {
    try {
        const user = req.params.id
        const {customer, product, quantity, startTime, endTime, shippingAddress, paymentMethod} = req.body
        console.log("req.body", req.body)
        if(customer && product && startTime && endTime && shippingAddress && paymentMethod) {
            const response = await createOrderByStaffService(user,customer, product, quantity, startTime, endTime, shippingAddress, paymentMethod)
            return res.status(200).json(response)
        }   else {
            return res.json({
                status: 'err',
                message: 'field validation failed'
            });
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const customerCreateOrderController = async (req, res) => {
    const customer = req.params.id
    const {user, product, quantity, shippingAddress, paymentMethod} = req.body
    console.log('req.body', req.body)
    if(product && shippingAddress && paymentMethod) {
        const response = await customerCreateOrderService(user, customer, quantity, product, shippingAddress, paymentMethod)
        return res.status(200).json(response)
    }
}

export const inactiveOrderController = async (req, res) => {
    try {
        const response = await inactiveOrderService()
        return res.status(200).json(response)
    }catch (e) {
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const historyOrderController = async (req, res) => {
    try {
        const response = await historyOrderService()
        return res.status(200).json(response)
    }catch (e) {
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const orderProcessController = async (req, res) => {
    try {
        const response = await orderProcessService()
        return res.status(200).json(response)
    }catch (e) {
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const updateOrderController = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if(id && data) {
            const response = await updateOrderService(id, data)
            return res.status(200).json(response)
        }else{

        }
    }catch (e) {

    }
}

export const confirmActiveOrderController = async (req, res) => {
    try {
        const id = req.params.id
        if(id) {
            const response = await confirmActiveOrderService(id);
            return res.status(200).json(response)
        }else{
            return res.status(500).json({
                status: 'Error',
                message: 'Order does not exist'
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const deleteOrderController = async (req, res) => {
    try {
        const id = req.params.id
        if(id){
            const response = await deleteOrderService(id)
            return res.status(200).json(response);
        }else {
            return res.status(500).json({
                status: 'Error',
                message: 'Order does not exist'
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const orderDetailController = async (req, res) => {
    try {
        const id = req.params.id
        if(id) {
            const response = await orderDetailService(id)
            return res.json(response)
        }else{
            return res.status(400).json({
                status: "ERR",
                message: "Order does not exist"
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const listOrderCustomerController = async (req, res) => {
    try {
        const id = req.params.id;
        if(id) {
            const response = await listOrderCustomerService(id);
            return res.status(200).json(response)
        }else{
            res.status(400).json({
                status: "Err",
                message: "Customer is unKnown"
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const updateStatusOrderController = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        console.log('req.body', req.body)
        if(id && data) {
            const response = await updateStatusOrderService(id, data);
            return res.status(200).json(response)
        }else{
            res.status(400).json({
                status: "Err",
                message: "Order not found"
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const filterOrderController = async (req, res) => {
    try {
        const data = req.body;
        if(data) {
            const response = await filterOrderService(data)
            return res.status(200).json(response)
        }else{
            res.status(400).json({
                status: "Err",
                message: "Order not found"
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const orderStaffCreatedController = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        if(id) {
            const response = await orderStaffCreatedService(id)
            return res.status(200).json(response)
        }else{
            res.status(403).json({
                message: "User not found"
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}