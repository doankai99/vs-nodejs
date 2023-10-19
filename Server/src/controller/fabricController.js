import {
    addFabricService,
    deleteFabricService,
    getAllFabricService,
    getDetailFabricService,
    updateFabricService
} from "../services/fabricService.js";
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import {deleteUserService} from "../services/userService.js";

export const fabricController = async (req, res) => {
    try {
        const fileData = req.file
        console.log(fileData)
        const { companyId, name, color, size, material, price, description } = req.body;
        console.log('req.body',req.body)
        if (fileData && companyId && name && color && material && price && size && description) {
            const response = await addFabricService(fileData, companyId, name, color,size, material, price, description);
            return res.json(response);
        } else {
            if(fileData){
                await cloudinaryV2.uploader.destroy(fileData.filename)
            }
            return res.json({
                status: 'err',
                message: 'field validation failed'
            });
        }
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
};

export const getAllFabricController = async (req, res) => {
    try {
        const response = await getAllFabricService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            status: 'err',
            message: error
        })
    }
}

export const getDetailFabricController = async (req, res) => {
    try {
        const { id } = req.params
        if(id){
            const response = await getDetailFabricService(id)
            return res.json(response)
        }else{
            return res.json({
                status: "Error",
                message: "The id is required"
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'err',
            message: error
        })
    }
}

export const updateFabricController = async (req, res) => {
    try {
        const id = req.params.id
        const fileData = req.file
        const data = req.body;
        console.log(fileData)
        console.log(id)
        console.log("req.body", req.body)
        if(id && data){
            const response = await updateFabricService(id, data, fileData)
            return res.status(200).json(response)
        }else {
            return res.status(400).json({
                status: "Err",
                message: "Lỗi rồi"
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 'err',
            message: error
        })
    }
}

export const deleteFabricController = async (req, res) => {
    try {
        const _id = req.params.id
        if(_id) {
            const response = await deleteFabricService(_id)
            return res.status(200).json(response)
        }else{
            return res.status(400).json({
                status: 'err',
                message: 'The Fabric is required'
            })
        }
    }catch (error) {
        return res.json({
            status: 'err',
            message: error
        })
    }
}