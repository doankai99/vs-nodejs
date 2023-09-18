import express from "express";
import {
    addCompanyFabricController, deleteCompanyMasterController,
    editMasterCompanyController,
    getAllCompanyMasterController
} from "../controller/companyFabric.js";

const router = express.Router()

router.post('/addCompany', addCompanyFabricController)

router.get('/getAllCompany', getAllCompanyMasterController)

router.put('/editMasterCompany/:id', editMasterCompanyController)

router.delete('/deleteCompanyMaster/:id', deleteCompanyMasterController)

export default router;