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
            total += (productPrice.price - (productPrice.price * productPrice.discount / 100)) * order.quantity;
        } else {
            total += productPrice.price * order.quantity
        }
    }
    console.log(total);
    return total
}
export const createOrderByStaffService = (user,customer, product, quantity, startTime, endTime, shippingAddress, paymentMethod) => {
    return new Promise(async (resolve, reject) => {
        try {
            const total = await calculateTotal({
                user,
                customer,
                product,
                quantity,
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

export const customerCreateOrderService = (user, customer, quantity, product, shippingAddress, paymentMethod) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createOn = new Date()
            const estimatedDate = new Date(createOn)
            estimatedDate.setDate(createOn.getDate() + 7);
            const total = await calculateTotal({
                customer,
                product,
                quantity,
                shippingAddress,
                paymentMethod
            })
            const newOrder = await Order.create({
                user,
                customer,
                product,
                quantity,
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
            const historyOrder = await Order.find({status: { $in: [0, 5] }})
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
            const orderProcess = await Order.find({status: { $in: [2, 3] }})
                .populate('customer')
                .populate('product')
                .populate('user')
                .sort({ createdAt: -1 }).exec()
            const orderDelivery = await Order.find({status:  4})
                .populate('customer')
                .populate('product')
                .populate('user')
                .sort({ createdAt: -1 }).exec()
            if(orderProcess) {
                return resolve({
                    status: "OK",
                    order : orderProcess,
                    orderDelivery: orderDelivery
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
               const updateStatusOrder = await Order.findByIdAndUpdate(id, {status: isCheckOrder.status === 1 ? 2 : 1},{ new: true })
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

export const orderDetailService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(id)
                .populate('user')
                .populate('customer')
                .populate({
                    path: 'product',
                    model: 'PriceRow',
                    select: 'price discount startDate endDate', // Chọn trường của bảng "PriceRow"
                    populate: {
                        path: 'productId',
                        model: 'Product',
                        select: 'name image'
                    }
                })
                .exec();
            if(order){
                return resolve({
                    status: "OK",
                    order: order
                })
            }else{
                reject({
                    status: "Err",
                    message: "Order does not exist"
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

export const listOrderCustomerService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({customer: id})
                .populate('user')
                .populate('customer')
                .populate({
                    path: 'product',
                    model: 'PriceRow',
                    select: 'price discount startDate endDate',
                    populate: {
                        path: 'productId',
                        model: 'Product',
                        select: 'name image summary'
                    }
                }).sort({createAt: -1})
                .exec();
            if(order) {
                return resolve({
                    status: "OK",
                    order: order
                })
            }else{
                reject({
                    status: "Err",
                    message: "Order does not exist"
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

export const updateStatusOrderService = async (id, data) => {
    try {
        const order = await Order.findById(id)
        if(order){
            return new Promise( async (resolve, reject) => {
                const updatedOrder = await Order.findByIdAndUpdate(id, data)
                if(updatedOrder){
                    return resolve({
                        status: "Ok",
                        order: await updatedOrder.populate('customer')
                    })
                }else{
                    return reject({
                        status: "Err",
                        message: "order is unKnown"
                    });
                }
            })
        }else{
            return res.status(400).json({
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