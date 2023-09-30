import {
    bookAppointmentService,
    deleteAppointmentService,
    getAppointmentService
} from "../services/appointmentService.js";

export const bookAppointmentController = async (req, res) => {
    try {
        const customerId = req.params.id
        console.log('customer', customerId)
        const {name, phone, email, date, time, area, city, state, country} = req.body
        console.log('req.body', req.body)
        if(name && phone && email && date && time) {
            const response = await bookAppointmentService(customerId, name, phone, email, date, time, area, city, state, country)
            return res.status(200).json(response);
        }else{
            return res.json({
                status: 'err',
                message: 'field validation failed'
            });
        }
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const listAppointmentController = async (req,res) => {
    const id = req.params.id
    if(id) {
        const response = await getAppointmentService(id)
        return res.json(response)
    } else {
        return res.status(401).json({
            status: "Error",
            message: "b chua login"
        })
    }
}

export const deleteAppointmentController = async (req, res) => {
    try {
        const id = req.params.id;
        if(id) {
            const response = await deleteAppointmentService(id)
            return res.json(response)
        }else{
            return res.json({
                status: 'Error',
                message: 'Ko tim thay appointment'
            })
        }
    }catch (e) {

    }
}