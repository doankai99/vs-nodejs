import Customer from '../model/customer.js'
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import {Jwtoken} from "../model/jwt.js";
import Product from "../model/product.js";
import { v2 as cloudinaryV2 } from 'cloudinary';

export const addCustomerService = async (fileData, firstName, lastName, gender, email, password, numberPhone, street, ward, district, city, country ) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
                const isPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/g.test(password);
                if (isEmail && isPassword) {
                    const isCheckEmail = await Customer.find({ email: email });
                    if (isCheckEmail.length > 0) {
                        resolve({
                            status: 'err',
                            message: 'The user name is exisr'
                        });
                    }
                    const hashPassword = bcrypt.hashSync(password, 10);
                    const newCustomer = await Customer.create({
                        image: fileData.path,
                        email,
                        password: hashPassword,
                        firstName,
                        lastName,
                        numberPhone,
                        gender,
                        street,
                        ward,
                        district,
                        city,
                        country
                    });
                    resolve({
                        status: 'OK',
                        customer: {
                            id: newCustomer._id,
                            email: newCustomer.email,
                        }
                    });
                } else {
                    resolve({
                        status: "err",
                        message: "email and password is not valid"
                    });
                }
            } catch (error) {
                reject({
                    message: error,
                    status: 'err'
                });
            }
        });
    } catch (e) {
        return e;
    }
}

export const loginCustomerServices = async ({ email, password }) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
                console.log(email);
                if (isEmail) {
                    const customerDb = await Customer.find({ email: email });

                    if (customerDb.length > 0) { // Check if a customer with that email exists
                        const customer = customerDb[0];

                        if (customer.isActive) {
                            const checkPassword = bcrypt.compareSync(password, customer.password);

                            if (checkPassword) {
                                const access_token = Jwt.sign({ _id: customer._id, email: customer.email }, 'access_token', { expiresIn: '1h' });

                                const refresh_token = Jwt.sign({ _id: customer._id }, 'access_token', { expiresIn: '2d' });

                                const jwtData = {
                                    user: customer._id,
                                    access_token: access_token,
                                    refresh_token: refresh_token,
                                    expires_at: new Date(Date.now() + 36000),
                                };

                                await Jwtoken.create(jwtData);
                                resolve({
                                    status: "OK",
                                    data: {
                                        email: customer.email,
                                        id: customer._id,
                                        image: customer.image,
                                        access_token,
                                    }
                                });
                            } else {
                                resolve({
                                    status: 'err',
                                    message: 'The username or password is wrong'
                                });
                            }
                        } else {
                            resolve({
                                status: 'err',
                                message: 'This account is not active'
                            });
                        }
                    } else {
                        resolve({
                            status: 'err',
                            message: 'User with that email does not exist'
                        });
                    }
                } else {
                    resolve({
                        status: 'err',
                        message: 'Invalid email format'
                    });
                }
            } catch (error) {
                reject({
                    message: error,
                    status: 'err'
                });
            }
        });
    } catch (e) {
        return console.log(e);
    }
}

export const detailCustomerService = async (id) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const findCustomer = await Customer.findById(id);
                if(findCustomer){
                    resolve({
                        status: 'OK',
                        message: findCustomer
                    });
                }else{
                    resolve({
                        status: "err",
                        message: "The id is required"
                    })
                }
            } catch (error) {
                reject({
                    message: error,
                    status: 'err'
                });
            }
        })
    } catch (error) {
        return error;
    }
}

export const getAllCustomerService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCustomer = await Customer.find().sort({ createdAt: -1 })
            if(allCustomer){
                resolve({
                    customer: allCustomer
                })
            }else{
                resolve({
                    status: 'err',
                    message: 'error'
                })
            }

        } catch (error) {
            console.log(error);
            reject({
                message: 'aaa',
                status: 'err'
            })
        }
    })
}

export const getAllInFormationCustomerService = async (customer_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const customerId = await Customer.findById(customer_id).populate('bodyCustomer') 
            if (!customerId) {
                return res.status(404).json({
                    status: 'err',
                    message: 'Customer not found'
                });
            }
            return res.json({
                status: 'OK',
                data: customerId
            });
        } catch (error) {
            return res.status(500).json({
                status: 'err',
                message: error.message
            });
        }
    })
}

export const updateCustomerService = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedCustomer = await Customer.findByIdAndUpdate(id, data);
            if(updatedCustomer){
                const getNewCustomer = await detailCustomerService(id);
                resolve({
                    status: "OK",
                    message: getNewCustomer
                })
            }
        } catch (error) {
            reject({
                status: 'Err',
                message: error
            })
        }
    })
}

export const deleteCustomerService = (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            const customer = await Customer.findById(id);
            const customerId = await Customer.findByIdAndDelete(id)
            const imageUrl = customer.image
            if(customerId){
                if(imageUrl) {
                    const publicId = imageUrl.split("/").slice(-2).join("/").split(".").slice(0, -1).join(".");
                    await cloudinaryV2.uploader.destroy(publicId)
                    resolve({
                        status: 'OK',
                        message: customerId
                    })
                }
            }else{
                resolve({
                    status: 'OK',
                    message: "The customer is not defined"
                })
            }
        } catch (error) {
            reject({
                status: 'Err',
                message: error
            })
        }
    })
}