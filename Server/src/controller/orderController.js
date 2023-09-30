import {createOrderByStaffService} from "../services/orderService.js";

export const createOrderByStaff = async (req, res) => {
    try {
        const id = req.params.id
        const {customer, product, status, startTime, endTime, shippingAddress, paymentMethod} = req.body
        if(customer && product && status && startTime && endTime && shippingAddress && paymentMethod) {
            const response = await createOrderByStaffService(id,customer, product, status, startTime, endTime, shippingAddress, paymentMethod)
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