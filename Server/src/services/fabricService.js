import Fabric from "../model/fabric.js";
import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';

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
            const allFabric = await Fabric.find().populate('companyId').sort({ createdAt: -1 }).exec()
            // const allFabric = await Fabric.find()
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

export const updateFabricService = (id, data, fileData) => {
    return new Promise (async (resolve, reject) => {
        try {
            const fabric = await Fabric.findById(id)
            const newUpdateFabric = await Fabric.findByIdAndUpdate(id, data, fileData)
            const imageUrl = fabric.image
            console.log(imageUrl)
            const updateData = { ...data };
            if(newUpdateFabric){
                if(fileData) {
                    if(imageUrl){
                        const publicId = imageUrl.split("/").slice(-2).join("/").split(".").slice(0, -1).join(".");
                        await cloudinaryV2.uploader.destroy(publicId)
                    }
                    updateData.image = fileData.path;
                }
                const updateFabric = await Fabric.findByIdAndUpdate(id, data)
                if(updateFabric){
                    resolve({
                        status: "Ok",
                        data: updateFabric
                    })
                }
            }else{
                reject({
                    Status: 'Error',
                    message: 'The fabric not defined'
                })
            }
        }catch (e) {
            reject({
                message: e,
                status: 'err'
            })
        }
    })
}

export const deleteFabricService = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fabric = await Fabric.findById(_id)
            const deleteFabric = await Fabric.findByIdAndDelete(_id)
            const imageUrl = fabric.image
            if(deleteFabric){
                if(imageUrl){
                    const publicId = imageUrl.split("/").slice(-2).join("/").split(".").slice(0, -1).join(".");
                    await cloudinaryV2.uploader.destroy(publicId)
                }
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