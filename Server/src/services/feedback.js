import Feedback from "../model/feedback.js";

export const sendFeedbackService = (id, product, description, feedback) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newFeedback = await Feedback.create({
                customer: id,
                product,
                description,
                feedback
            })
            if(newFeedback){
                resolve({
                    newFeedback
                })
            }else{
                resolve({
                    message: "Send Feedback false"
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

export const deleteFeedbackService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const removeFeedback = await Feedback.findByIdAndDelete(id);
            if(removeFeedback) {
                resolve({
                    removeFeedback
                })
            }else{
                resolve({
                    message: 'remove feedback not success'
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

export const showFeedbackService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(id)
            const feedback = await Feedback.find({product: id})
                .populate({
                    path: 'customer',
                    select: 'image firstName lastName'
                })
                .sort({createdAt: -1}).exec()
            if(feedback) {
                resolve({feedback})
            }else{
                resolve({
                    message: "Not Found"
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