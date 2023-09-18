import {Users} from "../model/user.js";
import {CompanyMaster} from "../model/3rd-party.js";
import CompanyFabric from "../router/companyFabric.js";

export const addCompanyFabricService = (companyName, email, numberPhone, businessType, productCategories, logoUrl, street, ward, district, city, country) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
                if (isEmail) {
                    const isCheckEmail = await CompanyMaster.find({ email: email });
                    if (isCheckEmail.length > 0) {
                        resolve({
                            status: 'err',
                            message: 'The email is exisr'
                        });
                    }
                    const masterCompany = await CompanyMaster.create({
                        companyName,
                        email,
                        numberPhone,
                        businessType,
                        productCategories,
                        logoUrl,
                        street,
                        ward,
                        district,
                        city,
                        country
                    })
                    resolve({
                        status: 'OK',
                        masterCompany : masterCompany
                    });
                }
            }catch (error) {
                reject({
                    message: error,
                    status: 'err'
                });
            }
        })
    }catch (e) {
        return e;
    }
}

export const getAllCompanyMasterService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const masterCompany = await CompanyMaster.find()
            if(masterCompany){
                resolve({
                    masterCompany: masterCompany
                })
            }else{
                resolve({
                    status: 'err',
                    message: 'error'
                })
            }
        }catch (e) {
            console.log(e);
            reject({
                message: 'aaa',
                status: 'err'
            })
        }
    })
}

export const editMasterCompanyService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateCompany = await CompanyMaster.findByIdAndUpdate(id, data)
            if(updateCompany){
                resolve({
                    status: "OK",
                    message: updateCompany
                })
            }
        }catch (e) {
            reject({
                status: 'Err',
                message: e
            })
        }
    })
}

export const deleteCompanyMasterService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const companyMaster = await CompanyMaster.findByIdAndDelete(id)
            if(companyMaster) {
                resolve({
                    status: "OK",
                    company: companyMaster
                })
            }else{
                resolve({
                    status: 'OK',
                    message: "The company master is not defined"
                })
            }
        }catch (e) {
            reject({
                status: 'Err',
                message: e
            })
        }
    })
}