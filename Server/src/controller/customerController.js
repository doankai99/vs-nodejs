import Customer from "../model/customer.js";
import BodyCustomer from "../model/bodyCustomer.js"
import {
    addCustomerService,
    deleteCustomerService,
    detailCustomerService,
    getAllCustomerService, getAllInFormationCustomerService, loginCustomerServices,
    updateCustomerService
} from "../services/customerService.js";
import { v2 as cloudinaryV2 } from 'cloudinary';

export const addCustomerController = async (req, res) => {
    const fileData = req.file
    const { firstName, lastName, gender, email, password, numberPhone, street, ward, district, city, country} = req.body;
    console.log(fileData)
    console.log("req.body", req.body)
    if (fileData && lastName && gender && email && password && numberPhone && street && ward && district && city && country) {
        try {
            const response = await addCustomerService(fileData, firstName, lastName, gender, email, password, numberPhone, street, ward, district, city, country );
            return res.json(response);
        } catch (error) {
            return res.status(500).json({
                status: 'err',
                message: error.message
            });
        }
    } else{
        if(fileData){
            await cloudinaryV2.uploader.destroy(fileData.filename)
        }
        return res.json({
            status: 'err',
            message: 'The email, password and name is required'
        })
    }
}

export const detailCustomerController = async (req, res) => {
    try {
        const { customerId } = req.params
        console.log('customerId', customerId);
        if(customerId){
            const response = await detailCustomerService(customerId);
            return res.json(response)
        }else{
            return res.json({
                status: "err",
                message: "The id is required"
            })
        }
        
    } catch (error) {
        return res.json({
            status: 'err',
            message: error
        })
    }
}

export const getAllCustomerController = async (req, res) => {
    try {
        const response = await getAllCustomerService();
        return res.status(200).json(response);
    } catch (error) {
        console.error('Lỗi xảy ra khi xử lý yêu cầu:', error);
        return res.status(400).json({
            status: 'err',
            message: 'Lỗi xảy ra khi xử lý yêu cầu'
        });
    }
}

export const getAllInformationCustomerController = async (req, res) => {
    try {
        const { customerId } = req.params
        if(customerId){
            const response = await getAllInFormationCustomerService(customerId);
            return res.json()
        }
    } catch (error) {

    }
}

export const loginCustomerController = async (req, res) => {
    const { email, password } = req.body;
    console.log("req.body", req.body)
    try{
        if(email && password){
            const response = await loginCustomerServices({email, password})
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
            message: 'err',
        })
    }
}

export const updateCustomerController = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body
        if(id){
            try {
                const response = await updateCustomerService(id, data)
                return res.json(response)
            } catch (error) {
                return res.status(500).json({
                    status: 'err',
                    message: error.message
                });    
            }
        }else{
            return res.status(400).json({
                status: "err",
                message: "Customer does not exist"
            })
        }
    }catch (error) {
        return res.json({
            message: error,
            status: 'err'
        })
    }
}

export const deleteCustomerController = async (req, res) => {
   try {
     const _id = req.params.id
     if(_id){
        const response = await deleteCustomerService(_id);
        return res.json(response)
     }
   } catch (error) {
        return res.json({
            message: error,
            status: 'err'
        })
   }

}