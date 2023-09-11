import Fabric from "../model/fabric.js";
import Product from "../model/product.js";
import { v2 as cloudinaryV2 } from 'cloudinary';
import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/') // Thư mục lưu trữ tạm thời ảnh tải lên
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname) // Đặt tên file mới
//     }
// });

// const upload = multer({ storage: storage });

export const addNewProductService = async (image, name , product_type, summary, fabricId) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                const  fabric = await Fabric.findById(fabricId);
                if (!fabric) {
                    reject({
                        status: 'err',
                        message: 'Không tìm thấy vật liệu với ID đã cung cấp.'
                    });
                    return;
                }else {
                    const addNewProduct = await Product.create({
                        image: image.path,
                        name,
                        product_type,
                        summary,
                        fabricId
                    });

                    resolve({
                        status: 'OK',
                        message: addNewProduct
                    });
                }
            } catch (error) {
                reject({
                    status: 'err',
                    message: 'Lỗi khi thêm sản phẩm: ' + error.message
                });
            }
        });
    } catch (error) {
        return error;
    }
}

export const getAllProductService = async () => {
    return new Promise(async (resolve, reject) => {
        try{
            const allProducts = await Product.find().populate('fabricId').exec()
            if(allProducts){
                resolve({
                    products : allProducts
                })
            }else{
                resolve({
                    status: 'err',
                    message: 'error'
                })
            }
        }catch (error) {
            console.log(error);
            reject({
                message: error,
                status: 'err'
            })
        }
    })
}

export const deleteProductService = (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            const product = await Product.findById(id);
            const productId = await Product.findByIdAndDelete(id)
            const imageUrl = product.image
            if(productId) {
                if(imageUrl) {
                    const publicId = imageUrl.split("/").slice(-2).join("/").split(".").slice(0, -1).join(".");
                    await cloudinaryV2.uploader.destroy(publicId)
                }
                resolve({
                    status: 'OK',
                    data: productId
                })
            }
        }catch (error) {
            console.log(error);
            reject({
                message: error,
                status: 'err'
            })
        }
    })
}
export const updateProductService = (id, data, fileData) => {
    return new Promise( async (resolve, reject) => {
        try {
            const product = await Product.findById(id)
            const updateProduct = await Product.findByIdAndUpdate(id, data, fileData)
            const imageUrl = product.image;
            const updateData = { ...data };
            if(updateProduct) {
                if (fileData) {
                    if (imageUrl) {
                        const publicId = imageUrl.split("/").slice(-2).join("/").split(".").slice(0, -1).join(".");
                        await cloudinaryV2.uploader.destroy(publicId)
                    }
                    updateData.image = fileData.path;
                }
                const updateProduct = await Product.findByIdAndUpdate(id, updateData);

                if (updateProduct) {
                    resolve({
                        status: 'OK',
                        data: updateProduct
                    });
                } else {
                    resolve({
                        status: 'err',
                        message: 'The Product not defined'
                    })
                }
            }
        }catch (error) {
            console.log(error);
            reject({
                message: error,
                status: 'err'
            })
        }
    })
}

export const detailProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findProduct = await Product.findById(id);
            if(findProduct) {
                resolve({
                    status: 'OK',
                    product: findProduct
                })

            }else {
                resolve({
                    status: 'err',
                    message: 'The id is required'
                });
            }
        }catch (error) {
            reject({
                message: error,
                status: 'err'
            });
        }
    })
}