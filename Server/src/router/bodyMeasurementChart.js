import  express  from "express";
import {addBodyController, getBodyMeasurementController} from "../controller/bodyMeasurementChart.js";

const router = express.Router()
    router.post('/addBodyMeasurementChart', addBodyController)

    router.get('/bodyMeasurementChart', getBodyMeasurementController)
export default router;