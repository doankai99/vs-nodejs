import  express  from "express";
import {
    bookAppointmentController,
    deleteAppointmentController, getAppointmentController,
    listAppointmentController, updateStatusAppointmentController
} from "../controller/appointmentController.js";

const router = express.Router()

//Customer book an appointment
    router.post('/bookAppointment/:id', bookAppointmentController)
//Display appointment of customer
    router.get('/listAppointment/:id', listAppointmentController)

    router.delete('/deleteAppointment/:id', deleteAppointmentController)

    router.put('/updateStatusAppointment/:id', updateStatusAppointmentController)
// Get list appointment active
    router.get('/getListAppointment', getAppointmentController)

export default router;