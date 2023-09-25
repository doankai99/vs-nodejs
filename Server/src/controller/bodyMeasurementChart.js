import {addBodyService} from "../services/bodyMeasurementCharst.js";

export const  addBodyController = async (req, res) => {
    try {
        const {
            size, gender, height, weight, chestSize, waistSize, hipsSize, chestWidth, backWidth, aroundNeck
        } = req.body
        if(size && gender && height && weight && chestSize && waistSize && hipsSize && chestWidth && backWidth && aroundNeck) {
            const response = await addBodyService(size, gender, height, weight, chestSize, waistSize, hipsSize, chestWidth, backWidth, aroundNeck)
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