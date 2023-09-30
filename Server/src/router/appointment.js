import  express  from "express";
import {
    bookAppointmentController,
    deleteAppointmentController,
    listAppointmentController
} from "../controller/appointmentController.js";

const router = express.Router()

    router.post('/bookAppointment/:id', bookAppointmentController)

    router.get('/listAppointment/:id', listAppointmentController)

    router.delete('/deleteAppointment/:id', deleteAppointmentController)

export default router;