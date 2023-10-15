import {
    bookAppointmentService,
    deleteAppointmentService,
    getAppointmentService, getListAppointmentService, updateStatusAppointmentService, updateStatusByStaffService
} from "../services/appointmentService.js";

export const bookAppointmentController = async (req, res) => {
    try {
        const customerId = req.params.id
        const {name, phone, email, date, time, area, city, state, country} = req.body
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
    try {
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
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
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
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const updateStatusAppointmentController = async (req, res) => {
    try {
        const id = req.params.id
        if(id) {
            const response = await updateStatusAppointmentService(id)
            return res.status(200).json(response)
        }else {
            return res.status(400).json({
                status: 'Error',
                message: 'Does not appointment'
            })
        }
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const updateStatusByStaffController = async (req, res) => {
    try {
        const id = req.params.id
        if(id) {
            const response = await updateStatusByStaffService(id)
            return res.status(200).json(response)
        }else{
            return res.status(400).json({
                status: 'Error',
                message: 'Does not appointment'
            })
        }
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const getAppointmentController = async (req, res) => {
    try {
        const response = await getListAppointmentService()
        return res.json(response)
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}