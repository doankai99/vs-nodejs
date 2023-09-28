import BodyMeasurement from "../model/measurementChart.js";


export const addBodyService = (size, gender, heightFrom, heightTo, weightFrom, weightTo, chestSize, waistSize, hipsSize) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bodyMeasurement = await BodyMeasurement.create({
                size,
                gender,
                heightFrom,
                heightTo,
                weightFrom,
                weightTo,
                chestSize,
                waistSize,
                hipsSize
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

export const getBodyMeasurementService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const bodyOfMen = await BodyMeasurement.find({ gender: 0 })
            const bodyOfWomen = await BodyMeasurement.find({ gender: 1 })
            if(bodyOfMen || bodyOfWomen) {
                resolve({
                    status: 'OK',
                    bodyMen: bodyOfMen,
                    bodyWomen: bodyOfWomen
                })
            }
        }catch (e) {
            reject({
                message: e,
                status: 'err'
            });
        }
    })
}