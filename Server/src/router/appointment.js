import  express  from "express";
import {
    bookAppointmentController,
    deleteAppointmentController,
    listAppointmentController, updateStatusAppointmentController
} from "../controller/appointmentController.js";

const router = express.Router()

    router.post('/bookAppointment/:id', bookAppointmentController)

    router.get('/listAppointment/:id', listAppointmentController)

    router.delete('/deleteAppointment/:id', deleteAppointmentController)

    router.put('/updateStatusAppointment/:id', updateStatusAppointmentController)

export default router;