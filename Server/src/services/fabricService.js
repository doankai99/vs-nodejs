import Fabric from "../model/fabric.js";
import multer from 'multer';

const upload = multer();

export const addFabricService = async (image, companyId, name, color,size, material, price, description) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const newFabric = await Fabric.create({
                    image: image.path,
                    name,
                    color,
                    size,
                    material,
                    price,
                    description,
                    companyId
                });
                resolve({
                    status: 'OK',
                    message: newFabric
                });
            } catch (error) {
                reject({
                    status: 'err',
                    message: error
                });
            }
        });
    } catch (error) {
        throw error; 
    }
}

export const getAllFabricService = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const allFabric = await Fabric.find()
            if(allFabric){
                resolve({
                    fabric: allFabric
                })
            }else{
                reject({
                    status: 'err',
                    message: 'error'
                })
            }
        } catch (error) {
            console.log(error);
            reject({
                message: error,
                status: 'err'
            })
        }
    })
}

export const getDetailFabricService = () => {

}

export const updateFabricService = (id, data) => {
    return new Promise (async (resolve, reject) => {
        const newUpdateFabric = await Fabric.findByIdAndUpdate(id, data)
        if(newUpdateFabric){
            resolve({
                status: "Ok",
                data: newUpdateFabric
            })
        }else{
            reject({
                Status: 'Error',
                message: 'The fabric not defined'
            })
        }
    })
}

export const deleteFabricService = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteFabric = await Fabric.findByIdAndDelete(_id)
            if(deleteFabric){
                resolve({
                    status: 'OK',
                    data: deleteFabric
                })
            }else{
                resolve({
                    status: 'err',
                    message: 'The Fabric is not defined'
                })
            }
        }catch (e) {
            console.log(e);
            reject({
                message: e,
                status: 'err'
            })
        }
    })
}