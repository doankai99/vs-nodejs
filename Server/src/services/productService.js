import Fabric from "../model/fabric.js";
import Product from "../model/product.js";
import { v2 as cloudinaryV2 } from 'cloudinary';
import multer from 'multer';

export const addNewProductService = async (image, name , product_type, summary, fabricId) => {
    return await new Promise(async (resolve, reject) => {
        try {
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
        } catch (error) {
            reject({
                status: 'err',
                message: 'Error while adding product: ' + error.message
            });
        }
    });
}

export const getAllProductService = async () => {
    return new Promise(async (resolve, reject) => {
        try{
            const allProducts = await Product.find().populate('fabricId').sort({ createdAt: -1 }).exec()
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

export const filterProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await Product.find().populate({
                path: 'fabricId',
                select: 'name color'
            }).exec();;
            if (Array.isArray(products) && products.length > 0) {
                // Thực hiện việc lọc dựa trên dữ liệu bạn nhận được
                const filteredProducts = products.filter((product) => {
                    // Bắt đầu với tất cả sản phẩm và lọc dựa trên các trường có sẵn trong dữ liệu.
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            // Kiểm tra xem giá trị trong trường dữ liệu có tồn tại trong sản phẩm không
                            if (product[key] && product[key].toLowerCase().includes(data[key].toLowerCase())) {
                                continue;
                            } else {
                                return false;
                            }
                        }
                    }
                    return true;
                });

                resolve(filteredProducts);
            } else {
                resolve([]);
            }
        }catch (e) {
            reject(e);
        }
    })
}