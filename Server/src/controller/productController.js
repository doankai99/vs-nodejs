import Product from '../model/product.js'
import {
    addNewProductService,
    deleteProductService, detailProductService, filterProductService,
    getAllProductService,
    updateProductService
} from '../services/productService.js';
import {getAllUserService} from "../services/userService.js";
import { v2 as cloudinaryV2 } from 'cloudinary';
import {deleteFabricService, updateFabricService} from "../services/fabricService.js";

export const addNewProductController = async (req, res) => {
    const fileData = req.file
    const { name, product_type, summary, fabricId} = req.body;
  if( fileData && name && product_type && summary && fabricId){
    const response = await addNewProductService( fileData, name , product_type, summary, fabricId);
    return res.json(response)
  }else{
      if(fileData){
          await cloudinaryV2.uploader.destroy(fileData.filename)
      }
    return res.json({
      status: 'err',
      message: 'feild valid'
    })
  }
}

export const getAllProductController = async (req, res) => {
    try {
        try {
            const response = await getAllProductService()
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

export const deleteProductController = async (req, res) => {
    try {
        const _id = req.params.id
        if(_id) {
            const response = await deleteProductService(_id)
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

export const updateProductController = async (req, res) => {
    const fileData = req.file
    console.log(fileData)
    const id = req.params.id
    const data = req.body;
    if(id && data){
        const response = await updateProductService(id, data, fileData)
        return res.status(200).json(response)
    }else{
        if(fileData){
            await cloudinaryV2.uploader.destroy(fileData.filename)
        }
        return res.json({
            status: 'err',
            message: 'field valid'
        })
    }
}

export const detailProductController = async (req, res) => {
    const id = req.params.id
    if(id){
        const response = await detailProductService(id)
        res.status(200).json(response)
    }else{
        res.status(500).json({
            status: "Error",
            message: "Product does not exist"
        })
    }
}

export const filterProductController = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        if(data) {
            const response = await filterProductService(data)
            return res.status(200).json(response)
        }
    }catch (e) {
        res.status(500).json({
            status: "Error",
            message: "Product does not exist"
        })
    }
}