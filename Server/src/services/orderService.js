import Order from "../model/order.js";
import {orderProcessController} from "../controller/orderController.js";
import PriceRow from "../model/priceRow.js";

const calculateTotal = async (order) => {
    // Lấy giá trị của tất cả các sản phẩm trong đơn hàng
    const productPrices = await PriceRow.find({_id: { $in: order.product }})

    // Tính tổng giá trị của đơn hàng
    let total = 0
    for (const productPrice of productPrices) {
        const startDate = new Date(productPrice.startDate)
        const endDate = new Date(productPrice.endDate)
        const now = new Date()

        if (now >= startDate && now <= endDate) {
            total += productPrice.price - (productPrice.price * productPrice.discount / 100) * order.quantity
        } else {
            total += productPrice.price * order.quantity
        }
    }

    return total
}
export const createOrderByStaffService = (user,customer, product, startTime, endTime, shippingAddress, paymentMethod) => {
    return new Promise(async (resolve, reject) => {
        try {
            const total = await calculateTotal({
                user,
                customer,
                product,
                startTime,
                endTime,
                shippingAddress,
                paymentMethod
            })
            const newOrder = await Order.create({
                user,
                customer,
                product,
                startTime,
                endTime,
                shippingAddress,
                paymentMethod,
                totalCount: total
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

export const customerCreateOrderService = (customer, quantity, product, startTime, endTime, shippingAddress, paymentMethod) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createOn = new Date()
            const estimatedDate = createOn.setDate(createOn.getDate() + 7);
            const total = await calculateTotal({
                customer,
                product,
                shippingAddress,
                paymentMethod
            })
            const newOrder = await Order.create({
                customer,
                product,
                startTime: createOn,
                endTime: estimatedDate,
                shippingAddress,
                paymentMethod,
                totalCount: total
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

export const inactiveOrderService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const inactiveOrder = await Order.find({status: 1})
                .populate('customer')
                .populate('product')
                .populate('user')
                .sort({ createdAt: -1 }).exec()

            if(inactiveOrder) {
                return resolve({
                    status: "OK",
                    inactiveOrder: inactiveOrder
                })
                return;
            }else{
                reject({
                    status: "Warning",
                    message: "Do not find order inactive"
                })
            }
        }catch (e) {
            reject({
                status: 'err',
                message: 'An error occurred while processing the appointment.',
                error: e.message
            });
        }
    })
}

export const historyOrderService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const historyOrder = await Order.find({status: 0 || 5})
                .populate('customer')
                .populate('product')
                .populate('user')
                .sort({ createdAt: -1 }).exec()
            if(historyOrder) {
                return resolve({
                    status: "OK",
                    order : historyOrder
                })
                return;
            }else{
                reject({
                    status: "Warning",
                    message: "Do not find order history"
                })
            }
        }catch (e) {
            reject({
                status: 'err',
                message: 'An error occurred while processing the appointment.',
                error: e.message
            });
        }
    })
}

export const orderProcessService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderProcess = await Order.find({status: 2 || 3 || 4})
                .populate('customer')
                .populate('product')
                .populate('user')
                .sort({ createdAt: -1 }).exec()
            if(orderProcess) {
                return resolve({
                    status: "OK",
                    order : orderProcess
                })
                return;
            }else{
                reject({
                    status: "Warning",
                    message: "Do not find order history"
                })
            }
        }catch (e) {
            reject({
                status: 'err',
                message: 'An error occurred while processing the appointment.',
                error: e.message
            });
        }
    })
}

export const updateOrderService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isCheckOrder = await Order.findByIdAndUpdate(id, data)
            if(isCheckOrder) {
                return resolve({
                    status: "OK",
                    order: isCheckOrder
                })
            }else{
                reject({
                    status: "Error",
                    message: "update order false, order does not exist"
                })
                return;
            }
        }catch (e) {
            reject({
                status: 'err',
                message: 'An error occurred while processing the appointment.',
                error: e.message
            });
        }
    })
}

export const confirmActiveOrderService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
           const isCheckOrder = await Order.findById(id);
           if(isCheckOrder) {
               const updateStatusOrder = await  Order.findByIdAndUpdate(id, {status: isCheckOrder.status === 1 ? 2 : 1},{ new: true })
               resolve({
                   status: 'OK',
                   appointment: updateStatusOrder
               });
           }else{
               reject({
                   status: 'err',
                   message: 'The Order does not exist'
               });
               return;
           }
        }catch (e) {
            reject({
                status: 'err',
                message: 'An error occurred while processing the appointment.',
                error: e.message
            });
        }
    })
}

export const deleteOrderService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isCheckOrder = await Order.findByIdAndDelete(id)
            if(isCheckOrder) {
                return resolve({
                    status: 'OK',
                    order: isCheckOrder
                })
            }else{
                reject({
                    status: 'Err',
                    message: "Delete order false"
                })
            }
        }catch (e) {
            reject({
                status: 'err',
                message: 'An error occurred while processing the appointment.',
                error: e.message
            });
        }
    })
}