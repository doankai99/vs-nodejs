import express from "express";
import {
    createUserController,
    deleteAllUserController,
    deleteUserController,
    detailsUserController,
    filterUserController,
    getAllUserController,
    loginUserController,
    searchUserController,
    updateUserController,
    userController
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadUserCloud from "../middleware/uploadUser.js";

const router = express.Router()

router.get('/', userController)

router.get('/search', searchUserController)

router.get('/getAll', getAllUserController)

router.put('/update/:id', uploadUserCloud.single('image'), updateUserController)

router.delete('/delete/:id', deleteUserController)

router.delete('/deleteAll', deleteAllUserController)

router.get('/:userId', detailsUserController)

router.post('/createUser',uploadUserCloud.single('image'), createUserController)

router.post('/login', loginUserController)

router.post('/filterUser', filterUserController)

export default router;
// export default axios;