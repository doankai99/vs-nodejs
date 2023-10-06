import {
    addCompanyFabricService, deleteCompanyMasterService,
    editMasterCompanyService,
    getAllCompanyMasterService
} from "../services/companyFabric.js";
import {response} from "express";

export const addCompanyFabricController = async (req, res) => {
    try {
        const { companyName,
            email,
            numberPhone,
            businessType,
            productCategories,
            logoUrl,
            street,
            ward,
            district,
            city,
            country
        } = req.body;
        console.log('req.body', req.body)
        if(companyName && email && numberPhone && businessType && productCategories && logoUrl ) {
            const response = await addCompanyFabricService(
                companyName,
                email,
                numberPhone,
                businessType,
                productCategories,
                logoUrl,
                street,
                ward,
                district,
                city,
                country)
            return res.json(response)
        }else{
            return  res.json({
                Status: "error",
                message: "Value not valid"
            })
        }
    }catch (e) {
        return res.status(500).json({
            status: 'err',
            message: e.message
        });
    }
}

export const getAllCompanyMasterController = async (req, res) => {
    try {
        const response = await getAllCompanyMasterService()
        return res.json(response)
    }catch(e)
    {
        return res.status(500).json({
            status: 'err',
            message: e.message
        });
    }
}

export const editMasterCompanyController = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if(id) {
            const response = await editMasterCompanyService(id, data)
            res.json(response)
        }else {
            return res.status(400).json({
                status: "err",
                message: "Master Company does not exist"
            })
        }
    }catch (e) {
        return res.status(500).json({
            status: 'err',
            message: e.message
        });
    }
}

export const deleteCompanyMasterController = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            const response = await deleteCompanyMasterService(id)
            return res.status(200).json(response)
        } else {
            return res.status(400).json({
                status: "err",
                message: "Master Company does not exist"
            })
        }
    }catch (e) {
        return res.status(500).json({
            status: 'err',
            message: e.message
        });
    }
}
