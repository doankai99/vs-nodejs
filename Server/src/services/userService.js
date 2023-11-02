import { Users } from "../model/user.js";
import axios from 'axios';
import bcrypt, { hash } from 'bcrypt'
import  Jwt  from "jsonwebtoken";
import { Jwtoken } from "../model/jwt.js";
import Product from "../model/product.js";

export const createUserServices = async (image, email, password, firstname, lastname, position, street, ward, district, city, country) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
                const isPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/g.test(password);
                if (isEmail && isPassword) {
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
                if (isEmail) {
                    const useDb = await Users.find({ email: email });
                    if (useDb) {
                        const checkPassword = bcrypt.compareSync(password, useDb[0].password);
                        if (checkPassword) {
                            const access_token = Jwt.sign({ isAdmin: useDb[0].isAdmin, _id: useDb[0]._id, email: useDb[0].email }, 'access_token', { expiresIn: '1h' });

                            const refresh_token = Jwt.sign({ _id: useDb[0]._id }, 'access_token', { expiresIn: '1h' });

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
                                    image: useDb[0].image,
                                    isAdmin: useDb[0].isAdmin,
                                    email: useDb[0].email,
                                    id: useDb[0]._id,
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

export const updateUserService = (id, data, fileData) => {
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
            const user = await Users.findById(id);
            const updatedUser = await Users.findByIdAndUpdate(id, data, fileData)
            const imageUrl = user.image
            const updateData = { ...data };
            if( updatedUser ){
                if(fileData) {
                    if(imageUrl){
                        const publicId = imageUrl.split("/").slice(-2).join("/").split(".").slice(0, -1).join(".");
                        await cloudinaryV2.uploader.destroy(publicId)
                    }
                    updateData.image = fileData.path;
                }
                const updateUser = await Users.findByIdAndUpdate(id, data)
                if(updateUser) {
                    resolve({
                        status: 'Ok',
                        data: updateUser
                    })
                }
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
            const user = await Users.findById(_id);
            const deleteUser = await Users.findByIdAndDelete(_id)
            const imageUrl = user.image
            if(deleteUser){
                if(imageUrl) {
                    const publicId = imageUrl.split("/").slice(-2).join("/").split(".").slice(0, -1).join(".");
                    await cloudinaryV2.uploader.destroy(publicId)
                }
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
            const allUser = await Users.find().sort({ createdAt: -1 })
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

export const filterUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await Users.find()
            if (Array.isArray(users) && users.length > 0) {
                const filteredUsers = users.filter((user) => {
                    // Bắt đầu với tất cả sản phẩm và lọc dựa trên các trường có sẵn trong dữ liệu.
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            // Kiểm tra xem giá trị trong trường dữ liệu có tồn tại trong sản phẩm không
                            if (user[key] && user[key].toLowerCase().includes(data[key].toLowerCase())) {
                                continue;
                            } else {
                                return false;
                            }
                        }
                    }
                    return true;
                });

                resolve(filteredUsers);
            } else {
                resolve([]);
            }
        }catch (e) {
            reject(e);
        }
    })
}

export const updateStatusAdminService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Users.findOne({_id: id});
            if(user) {
                if(user.isAdmin === 0) {
                    user.isAdmin = 1;
                    await user.save();
                    resolve({
                        message:"update status account success"
                    });
                }else{
                    user.isAdmin = 0;
                    await user.save();
                    resolve({
                        message:"update status account success"
                    });
                }
            }else{
                reject({
                    message: "User not found"});
                return
            }
        }catch (e) {
            reject(e);
        }
    })
}
