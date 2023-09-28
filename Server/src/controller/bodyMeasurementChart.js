import {addBodyService, getBodyMeasurementService} from "../services/bodyMeasurementCharst.js";

export const  addBodyController = async (req, res) => {
    try {
        const {
            size, gender, heightFrom, heightTo, weightFrom, weightTo, chestSize, waistSize, hipsSize
        } = req.body
        console.log('req.body', req.body)
        if(size && gender && heightFrom && heightTo && weightFrom && weightTo && chestSize && waistSize && hipsSize) {
            const response = await addBodyService(size, gender, heightFrom, heightTo, weightFrom, weightTo, chestSize, waistSize, hipsSize)
            return res.status(200).json(response);
        }else{
            return res.status(400).json({
                status: "err",
                message: "lỗi r"
            })
        }
    }catch (e) {
        return res.status(500).json({
            status: 'err',
            message: e.message
        });
    }
}

export const getBodyMeasurementController = async (req, res) => {
    try {
        const response = await getBodyMeasurementService()
        return res.status(200).json(response)
    }catch (e) {
        return res.status(500).json({
            status: 'err',
            message: e.message
        });
    }
}