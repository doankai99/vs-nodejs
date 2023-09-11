import express from "express";
import { createUserController, deleteAllUserController, deleteUserController, detailsUserController, getAllUserController, loginUserController, searchUserController, updateUserController, userController } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import axios from "axios";
import uploadUserCloud from "../middleware/uploadUser.js";

const router = express.Router()

router.get('/', userController)

router.get('/search', searchUserController)

router.get('/getAll', getAllUserController)

router.put('/update/:id', updateUserController)

router.delete('/delete/:id', deleteUserController)

router.delete('/deleteAll', deleteAllUserController)

router.get('/:userId', detailsUserController)

router.post('/createUser',uploadUserCloud.single('image'), createUserController)

router.post('/login', loginUserController)
//     .then(response => {
//     const responseData = response.data;
//
//     if (responseData.success) {
//         const token = responseData.token;
//
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//
//         console.log('Token has been added to headers:', axios.defaults.headers.common['Authorization']);
//     } else {
//         console.log('Login was not successful. Server response:', responseData.message);
//     }
// })
//     .catch(error => {
//         console.error('Error during login:', error);
//     });


export default router;
// export default axios;