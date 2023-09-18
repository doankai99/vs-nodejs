import Customer from "../model/customer.js";
import BodyCustomer from "../model/bodyCustomer.js";

export const addBodyCustomerService = (customerId, chest, waist, hips, height, weight) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isCheckCustomer = await BodyCustomer.find({ customerId: customerId });

            if (isCheckCustomer.length === 0) {
                const newBodyCustomer = await BodyCustomer.create({
                    customerId,
                    chest,
                    waist,
                    hips,
                    height,
                    weight,
                });

                resolve({
                    status: 'Success',
                    bodyCustomer: newBodyCustomer,
                });
            } else {
                resolve({
                    status: 'Warning',
                    message: 'Customer has already been assigned a bodyCustomer',
                });
            }
        } catch (e) {
            reject({
                message: e,
                status: 'err',
            });
        }
    })
}

export const bodyOfCustomerService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isCheckCustomer = await Customer.findOne({_id: id})
            if (isCheckCustomer === null) {
                return resolve({
                    status: "Error",
                    message: "Customer does not exist",
                });
            }
            const body = await BodyCustomer.findOne({ customerId: id });
            return resolve({
                status: "Success",
                bodyCustomer: body,
            });
        }catch (e) {
            reject({
                message: e,
                status: 'err',
            });
        }
    })
}