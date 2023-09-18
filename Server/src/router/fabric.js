import express from "express";
import uploadCloud from "../middleware/uploadFabric.js"
import {
    deleteFabricController,
    fabricController,
    getAllFabricController,
    getDetailFabricController,
    updateFabricController
} from "../controller/fabricController.js";

const router = express.Router()

// Thêm mới một fabric
router.post('/addFabric',uploadCloud.single('image'), fabricController)

router.get('/allFabric', getAllFabricController)

router.get('/getDetailFabric', getDetailFabricController)

router.put('/update/:id', updateFabricController)

router.delete('/delete/:id', deleteFabricController)



export default router;