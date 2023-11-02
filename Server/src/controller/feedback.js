import {deleteFeedbackService, sendFeedbackService, showFeedbackService} from "../services/feedback.js";

export const sendFeedbackController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const {product, description } = req.body;
        if(product && description) {
            const response = await sendFeedbackService(id, product, description)
            return res.status(200).json(response)
        }else{
            return res.status(403).json({
                message: 'You need login'
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const deleteFeedbackController = async (req, res) => {
    try {
        const id = req.params.id
        if(id) {
            const response = await deleteFeedbackService(id)
            return res.json(response)
        }else {
            res.status(400).json({
                message: 'Feedback not found'
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}

export const showFeedbackController = async (req, res) => {
    try {
        const id = req.params.id
        if(id){
            const response = await showFeedbackService(id)
            return res.json(response)
        }else{
            res.status(401).json({
                message: 'feedback not found'
            })
        }
    }catch (e) {
        console.log(e);
        return res.json({
            status: 'err',
            message: e,
        })
    }
}