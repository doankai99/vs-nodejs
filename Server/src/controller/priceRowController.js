import Product from "../model/product.js"
import {
    addPriceService, deletePriceService, detailPriceService,
    getAllPriceProductService,
    updatePriceProductService
} from "../services/priceRowService.js"
import {getAllProductService} from "../services/productService.js";
import {response} from "express";

export const addPriceController = async (req, res) => {
    try {
            const {productId, fabricId, price, discount, startDate, endDate, priceGroup, promotionDescription} = req.body
        console.log("req.body", req.body)
            if(productId && fabricId && price && discount && startDate && endDate && priceGroup && promotionDescription){
                try {
                    const response = await addPriceService(productId, fabricId, price, discount, startDate, endDate, priceGroup, promotionDescription)
                    return res.json(response) 
                } catch (error) {
                    return res.status(500).json({
                        status: 'err',
                        message: error.message
                    });
                }
            }
    } catch (error) {
        return res.status(400).json({
            status: 'err',
            message: 'Missing required fields'
        });
    }
}

export const getAddPriceProductController = async (req, res) => {
    try {
        try {
            const response = await getAllPriceProductService()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json({
                status: 'err',
                message: error
            })
        }
    }catch (e) {
        return res.status(400).json({
            status: 'err',
            message: 'Missing required fields'
        });
    }
}

export const updatePriceProductController = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        if(id && data){
            const response = await updatePriceProductService(id, data)
            res.status(200).json(response);
        }
    }catch (error) {
        return res.status(400).json({
            status: 'err',
            message: 'Missing required fields'
        });
    }
}

export const deletePriceController = async (req, res) => {
    try {
        const _id = req.params.id
        if(_id) {
            const response = await deletePriceService(_id)
            return res.status(200).json(response)
        }else{
            return res.status(400).json({
                status: 'err',
                message: 'The Price is required'
            })
        }
    } catch (error) {
        return res.json({
            status: 'err',
            message: error
        })
    }
}

export const  detailPriceController = async (req, res) => {
    try {
        const id = req.params.id
        if(id) {
            const response = await detailPriceService(id)
            res.status(200).json(response)
        }else{
            res.status(400).json({
                status: "Error",
                message: "Price of Product does not exist"
            })
        }
    }catch (error) {

    }
}