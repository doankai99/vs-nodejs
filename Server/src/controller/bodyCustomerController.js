import {addBodyCustomerService, allBodyMeasurementsService, bodyOfCustomerService} from "../services/bodyCustomer.js";

export const addBodyCustomerController = async (req, res) => {
    try {
        const {
            customerId,
            gender,
            chest,
            waist,
            hips,
            height,
            weight
        } = req.body
        if(customerId && chest && waist && hips && height && weight) {
            const response = await addBodyCustomerService(
                customerId,
                gender,
                chest,
                waist,
                hips,
                height,
                weight,
            )
            return res.status(200).json(response)
        }
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const bodyOfCustomerController = async (req, res) => {
    try {
        const id = req.params.id
        if(id) {
            const response = await bodyOfCustomerService(id)
            return res.status(200).json(response)
        }else{
            return res.status(400).json({
                status: "Error",
                message: "Customer does not exist"
            })
        }
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const allBodyMeasurements = async (req, res) => {
    try {
        const response = await allBodyMeasurementsService();
        return res.status(200).json(response);
    }catch (error) {
        return res.json({
            status: 'err',
            message: error
        })
    }
}