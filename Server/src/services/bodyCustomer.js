import Customer from "../model/customer.js";
import BodyCustomer from "../model/bodyCustomer.js";
import bodyCustomer from "../model/bodyCustomer.js";
import BodyMeasurement from "../model/measurementChart.js";

export const addBodyCustomerService = async (customerId, gender, chest, waist, hips, height, weight) => {
    try {
        if(!gender) {
            const customer = await Customer.findById(customerId);
            if (customer) {
                gender = customer.gender;
            }
        }
        // Tìm size tương ứng dựa trên height và weight của khách hàng
        let sizeMeasurement = await BodyMeasurement.findOne({
            gender: gender,
            heightFrom: { $lte: height }, // height phải nằm trong khoảng từ heightFrom đến heightTo
            heightTo: { $gt: height },
            weightFrom: { $lte: weight }, // weight phải nằm trong khoảng từ weightFrom đến weightTo
            weightTo: { $gt: weight },
        });

        if (!sizeMeasurement) {
            return {
                status: 'Warning',
                message: 'Không tìm thấy size phù hợp cho khách hàng.',
            };
        }
        if (!sizeMeasurement) {
            sizeMeasurement = "Fs";
        }

        const isCheckCustomer = await BodyCustomer.find({ customerId: customerId });

        if (isCheckCustomer.length === 0) {
            const newBodyCustomer = await BodyCustomer.create({
                customerId,
                chest,
                waist,
                gender,
                hips,
                height,
                weight,
                size: sizeMeasurement.size,
            });

            return {
                status: 'Success',
                bodyCustomer: newBodyCustomer,
            };
        } else {
            return {
                status: 'Warning',
                message: 'Customer has already been assigned a bodyCustomer',
            };
        }
    } catch (e) {
        return {
            message: e,
            status: 'err',
        };
    }
};

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

export const allBodyMeasurementsService = () => {
    try {
        return new Promise(async (resolve, reject) => {
            const bodyMeasurements = await bodyCustomer.find().populate('customerId').exec()
            if(bodyMeasurements) {
                resolve({
                    status: 'OK',
                    body: bodyMeasurements
                })
            }else{
                resolve({
                    status: 'err',
                    message: 'error'
                })
            }
        })
    }catch (error) {
        console.log(error);
        return ({
            message: error,
            status: 'err'
        })
    }
}

export const createBodyMeasurementCustomerService = async (customerId, gender, chest, waist, hips, height, weight) => {
    try {
        if(!gender) {
            const customer = await Customer.findById(customerId);
            if (customer) {
                gender = customer.gender;
            }
        }
        // Tìm size tương ứng dựa trên height và weight của khách hàng
        let sizeMeasurement = await BodyMeasurement.findOne({
            gender: gender,
            heightFrom: { $lte: height }, // height phải nằm trong khoảng từ heightFrom đến heightTo
            heightTo: { $gt: height },
            weightFrom: { $lte: weight }, // weight phải nằm trong khoảng từ weightFrom đến weightTo
            weightTo: { $gt: weight },
        });

        if (!sizeMeasurement) {
            return {
                status: 'Warning',
                message: 'Không tìm thấy size phù hợp cho khách hàng.',
            };
        }
        if (!sizeMeasurement) {
            sizeMeasurement = "Fs";
        }
        const isCheckCustomer = await BodyCustomer.find({ customerId: customerId });

        if (isCheckCustomer.length === 0) {
            const newBodyCustomer = await BodyCustomer.create({
                customerId,
                chest,
                waist,
                gender,
                hips,
                height,
                weight,
                size: sizeMeasurement.size,
            });

            return {
                status: 'Success',
                bodyCustomer: newBodyCustomer,
            };
        }else {
            return {
                status: 'Warning',
                message: 'Customer has already been assigned a bodyCustomer',
            };
        }
    } catch(e){
            console.log(e);
            return ({
                message: e,
                status: 'err'
            })
    }
}