import Customer from '../model/customer.js'
import BodyCustomer from '../model/bodyCustomer.js'
import customer from "../model/customer.js";
import {Users} from "../model/user.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import {Jwtoken} from "../model/jwt.js";

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
                        data: {
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

export const loginCustomerServices = async ({email, password}) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
                console.log(email);
                if (isEmail) {
                    const customerDb = await Customer.find({ email: email });

                    if (customerDb) {
                        const checkPassword = bcrypt.compareSync(password, customerDb[0].password);
                        if (checkPassword) {
                            const access_token = Jwt.sign({ _id: customerDb[0]._id, email: customerDb[0].email }, 'access_token', { expiresIn: '1h' });

                            const refresh_token = Jwt.sign({ _id: customerDb[0]._id }, 'access_token', { expiresIn: '2d' });

                            const jwtData = {
                                user: customerDb[0]._id,
                                access_token: access_token,
                                refresh_token: refresh_token,
                                expires_at: new Date(Date.now() + 36000),
                            };

                            await Jwtoken.create(jwtData);
                            resolve({
                                status: "OK",
                                data: {
                                    email: customerDb[0].email,
                                    id: customerDb[0]._id,
                                    access_token
                                }
                            });
                        }
                        resolve({
                            status: 'err',
                            message: 'The use name or password is wrong'
                        });
                    }
                } else {
                    resolve({
                        status: 'err',
                        message: 'user name is not existed'
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
            const allCustomer = await Customer.find()
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

export const deleteCustomerService = (_id) => {
    return new Promise (async (resolve, reject) => {
        try {
            const deleteCustomer = await Customer.findByIdAndDelete(_id)
            if(deleteCustomer){
                resolve({
                    status: 'OK',
                    message: deleteCustomer
                })
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