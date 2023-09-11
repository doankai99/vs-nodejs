import { Users } from "../model/user.js";
import axios from 'axios';
import bcrypt, { hash } from 'bcrypt'
import  Jwt  from "jsonwebtoken";
import { Jwtoken } from "../model/jwt.js";

export const createUserServices = async (image, email, password, firstname, lastname, position, street, ward, district, city, country) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
                if (isEmail) {
                    const isCheckEmail = await Users.find({ email: email });
                    if (isCheckEmail.length > 0) {
                        resolve({
                            status: 'err',
                            message: 'The user name is exisr'
                        });
                    }
                    const hashPassword = bcrypt.hashSync(password, 10);
                    const newUser = await Users.create({
                        image: image.path,
                        email,
                        password: hashPassword,
                        firstname,
                        lastname,
                        position,
                        street,
                        ward,
                        district,
                        city,
                        country
                    });
                    resolve({
                        status: 'OK',
                        data: {
                            email: newUser.email,
                        }
                    });
                } else {
                    resolve({
                        status: "err",
                        message: "user name is not email valid"
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

export const loginUserServices = async ({email, password}) =>{
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
                console.log(email);
                if (isEmail) {
                    const useDb = await Users.find({ email: email });

                    if (useDb) {
                        const checkPassword = bcrypt.compareSync(password, useDb[0].password);
                        if (checkPassword) {
                            const access_token = Jwt.sign({ isAdmin: useDb[0].isAdmin, _id: useDb[0]._id, email: useDb[0].email }, 'access_token', { expiresIn: '1h' });

                            const refresh_token = Jwt.sign({ _id: useDb[0]._id }, 'access_token', { expiresIn: '2d' });

                            const jwtData = {
                            user: useDb[0]._id,
                            access_token: access_token,
                            refresh_token: refresh_token,
                            expires_at: new Date(Date.now() + 36000),
                            };
                
                            await Jwtoken.create(jwtData); 
                            resolve({
                                status: "OK",
                                data: {
                                    email: useDb[0].email,
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

export const getDetailUserService = async (id) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const findUser = await Users.findById(id);
                if (findUser) {
                    resolve({
                        status: 'Ok',
                        message: findUser
                    });
                } else {
                    resolve({
                        status: 'err',
                        message: 'The id is required'
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

export const searchUserService = async (lastname) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const findName = await Users.find({ lastname });
                if (findName) {
                    resolve({
                        status: 'Ok',
                        message: findName
                    });
                } else {
                    resolve({
                        status: 'err',
                        message: 'The name is required'
                    });
                }
            } catch (error) {
                console.log(error);
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

export const updateUserService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await Users.findOne(data.email)
            console.log(checkUser);
            if(data.email){
                resolve({
                    status: 'err',
                    message: 'The info of email is duplicate'
                })
            }
            const updatedUser = await Users.findByIdAndUpdate(id, data)
            if( updatedUser ){
                const getUserNew = await getDetailUserService(id)
                resolve({
                    status: 'Ok',
                    data: getUserNew
                })
            }else{
                resolve({
                    status: 'err',
                    message: 'The user not defined'
                })
            }
        } catch (error) {
            console.log(error);
            reject({
                message: error,
                status: 'err'
            })
        }
    })
}

export const deleteUserService = (_id) => {
    return new Promise(async (resolve, reject) =>{
        try {
            const deleteUser = await Users.findByIdAndDelete(_id)
            if(deleteUser){
                resolve({
                    status: 'OK',
                    data: deleteUser
                })
            }else{
                resolve({
                    status: 'err',
                    message: 'The user is not defined'
                })
            }
        } catch (error) {
            console.log(error);
            reject({
                message: error,
                status: 'err'
            })
        }
    })
}

export const getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await Users.find()
            if(allUser){
                resolve({
                    user: allUser
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
                message: error,
                status: 'err'
            })
        }
    })
}

export const deleteAllUserService = (ids) => {
    return new Promise( async (resolve, reject) => {
        try {
            const deleteUsers = await Users.deleteMany({ _id: ids })
            console.log(deleteUsers);
            resolve({
                status: 'OK',
                message: deleteUsers
            })
        } catch (error) {
            console.log(error);
            reject({
                message: error,
                status: 'err'
            })
        }
    })
}
