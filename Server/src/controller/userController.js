import { Users } from '../model/user.js'
import bcrypt from 'bcrypt'
import {
    createUserServices,
    loginUserServices,
    getDetailUserService,
    searchUserService,
    updateUserService,
    deleteUserService,
    getAllUserService,
    deleteAllUserService,
    filterUserService
} from '../services/userService.js';
import { response } from 'express';
import  Jwt  from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';

export const userController = (req, res) =>{
    res.send('hello use');
}

export const detailsUserController = async (req, res) => {
    try {
        const { userId } = req.params 
        if(userId){
            const response = await getDetailUserService(userId)
            return res.json(response);
        }
        return res.json({
            status: 'err',
            message: 'The id is required'
        })
    } catch (error) {
        console.log(err);
        return res.json({
            status: 'err',
            message: "aaa"
        })
    }
}

export const searchUserController = async (req, res) => {
    try {
        const {lastname} = req.query
        if(lastname){
            const response = await searchUserService(lastname);
            return res.json(response);
        }else{
            return res.json({
                status: 'err',
                message: 'The name is required'
            })
        }
    } catch (error) {
        console.log(err);
        return res.json({
            status: 'err',
            message: error
        })
    }
}

export const createUserController = async (req, res) => {
    const fileData = req.file
    console.log(fileData)
    const { email, password, firstname, lastname, position, street, ward, district, city, country } = req.body;
    console.log('req.body', req.body)
    if(fileData && email && password && firstname && lastname && position && street && ward && district && city && country){
        const response = await createUserServices(fileData, email, password, firstname, lastname, position, street, ward, district, city, country)
        return res.json(response);
    }else{
        if(fileData){
            await cloudinaryV2.uploader.destroy(fileData.filename)
        }
        return res.json({
            status: 'err',
            message: 'The email, password and name is required'
        })
    }
}
export const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try{
        if(email && password){
            const response = await loginUserServices({email, password})
            return res.json(response);
        }else{
            return req.json({
                status: 'err',
                message: 'The email and password is required'
            })
        }
    }catch(err){
        console.log(err);
        return res.json({
            status: 'err',
            message: err,
        })
    }
}

export const updateUserController = async (req, res) => {
    try {
        const id = req.params.id
        const fileData = req.file
        const data = req.body;
        if(id){
            const response = await updateUserService(id, data, fileData);
            if(response){
                return res.json(response)
            }else{
                return res.json({
                    status: 'err',
                    message: 'The server is problem'
                })
            }
        }else{
            return req.json({
                status: 'err',
                message: 'The id of user is required'
            })
        }
    } catch (error) {
        return res.json({
            message: error,
            status: 'err'
        })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const _id = req.params.id
        if(_id){
            const response = await deleteUserService(_id)
            return res.status(200).json(response)
        }else{
            return res.status(400).json({
                status: 'err',
                message: 'The userId is required'
            })
        }
    } catch (error) {
        return res.json({
            status: 'err',
            message: error
        })
    } 
}

export const getAllUserController = async (req, res) => {
    try {
        try {
            const response = await getAllUserService()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json({
                status: 'err',
                message: error
            })
        }
    } catch (error) {
        return res.json({
            status: 'err',
            message: error
        })
    }
}
export const deleteAllUserController = async (req, res) => {
    const { id } = req.query
    console.log('id', id);
    try {
        const response = await deleteAllUserService(id)
        return res.status(200).json({
            status: 'OK',
            message: response
        })
    } catch (error) {
        return res.status(400).json({
            status: 'err',
            message: error
        })
    }
}
export const filterUserController = async (req, res) => {
    try {
        const data = req.body;
        if(data) {
            const response = await filterUserService(data)
            return res.status(200).json(response)
        }else{

        }
    }catch (e) {

    }
}
