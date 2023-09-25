import  express  from "express";
import {addBodyController} from "../controller/bodyMeasurementChart.js";

const router = express.Router()

router.post('addBodyMeasurementChart', addBodyController)
export default router;