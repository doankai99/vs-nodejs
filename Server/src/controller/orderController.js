import {
    confirmActiveOrderService,
    createOrderByStaffService, customerCreateOrderService,
    deleteOrderService, historyOrderService,
    inactiveOrderService, orderProcessService, updateOrderService
} from "../services/orderService.js";

export const createOrderByStaff = async (req, res) => {
    try {
        const user = req.params.id
        const {customer, product, startTime, endTime, shippingAddress, paymentMethod} = req.body
        if(customer && product && startTime && endTime && shippingAddress && paymentMethod) {
            const response = await createOrderByStaffService(user,customer, product, startTime, endTime, shippingAddress, paymentMethod)
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
    const {product, quantity, startTime, endTime, shippingAddress, paymentMethod} = req.body
    if(product && startTime && endTime && shippingAddress && paymentMethod) {
        const response = await customerCreateOrderService(customer, quantity, product, startTime, endTime, shippingAddress, paymentMethod)
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