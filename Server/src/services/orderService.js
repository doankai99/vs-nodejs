import Order from "../model/order.js";

export const createOrderByStaffService = (id,customer, product, status, startTime, endTime, shippingAddress, paymentMethod) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newOrder = await Order.create({
                id,
                customer,
                product,
                status,
                startTime,
                endTime,
                shippingAddress,
                paymentMethod
            })
            resolve({
                status: 'OK',
                order: newOrder
            })
        }catch (e) {
            reject({
                message: e,
                status: 'err'
            });
        }
    })
}