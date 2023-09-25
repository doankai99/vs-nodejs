import BodyMeasurement from "../model/measurementChart.js";


export const addBodyService = (size, gender, height, weight, chestSize, waistSize, hipsSize, chestWidth, backWidth, aroundNeck) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bodyMeasurement = await BodyMeasurement.create({
                size,
                gender,
                height,
                weight,
                chestSize,
                waistSize,
                hipsSize,
                chestWidth,
                backWidth,
                aroundNeck
            })
            resolve({
                status: 'OK',
                bodyMeasurement : bodyMeasurement
            });
        }catch (e) {
            reject({
                message: e,
                status: 'err'
            });
        }
    })
}