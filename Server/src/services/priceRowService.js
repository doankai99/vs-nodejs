import PriceRow from "../model/priceRow.js";
import Product from "../model/product.js";

export const addPriceService = async (productId, fabricId, price, discount, startDate, endDate, priceGroup, promotionDescription) => {
    try {
            return await new Promise (async (resolve, reject) => {
                try {
                    // productId = await Product.find({productId: productId})
                    const newPrice = await PriceRow.create({
                        productId,
                        fabricId,
                        price,
                        discount,
                        startDate,
                        endDate,
                        priceGroup,
                        promotionDescription
                    })
                    resolve({
                        status: 'OK',
                        message: newPrice
                    })
                } catch (error) {
                    reject({
                        status: 'err',
                        message: error
                    })
                }
            }) 
    } catch (error) {
        return {
            status: 'Err',
            message: error
        };
    }
}

export const getAllPriceProductService = () => {
    return new Promise(async  (resolve, reject) => {
        try {
            const priceProducts = await PriceRow.aggregate([
                {
                    $lookup: {
                        from: "fabrics",
                        localField: "fabricId",
                        foreignField: "_id",
                        as: "fabric"
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "products"
                    }
                }
            ]).exec();
            //const priceProducts = await PriceRow.find().populate('productId').exec()
            if(priceProducts){
                resolve({
                    priceOfProducts : priceProducts
                })
            }else{
                resolve({
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

export const updatePriceProductService = (id, data) => {
    return new Promise( async (resolve, reject) => {
        const newPriceOfProduct = await PriceRow.findByIdAndUpdate(id, data);
        if(newPriceOfProduct) {
            resolve({
                status: "Ok",
                data: newPriceOfProduct
            })
        }else {
            reject({
                Status: 'Error',
                message: 'The Price of Product does not exist'
            })
        }
    })
}
export const deletePriceService = (_id) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const deletePrice = await PriceRow.findByIdAndDelete(_id)
                if(deletePrice) {
                    resolve({
                        status: "Ok",
                        data: deletePrice
                    })
                }else{
                    reject({
                        status: "Error",
                        message: "delete Price false"
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
    }catch (e) {
        // console.log(e);
        // res.json({
        //     message: e,
        //     status: 'err'
        // })
    }
}

export const detailPriceService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findPriceOfProduct = await PriceRow.findById(id)
            if(findPriceOfProduct){
                resolve({
                    status: 'OK',
                    data: findPriceOfProduct
                })
            }else{
                resolve({
                    status: 'err',
                    message: 'The id is required'
                });
            }
        }catch (e) {
            reject({
                message: e,
                status: 'err'
            });
        }
    })
}