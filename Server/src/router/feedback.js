import  express  from "express";
import {deleteFeedbackController, sendFeedbackController, showFeedbackController} from "../controller/feedback.js";

const router = express.Router()
    //Send Feedback Product
    router.post('/sendFeedback/:id', sendFeedbackController)
    //Delete Feedback
    router.delete('/deleteFeedback', deleteFeedbackController)
    //get Feedback
    router.get('/showFeedback/:id', showFeedbackController)
export default router;