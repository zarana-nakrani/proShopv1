import express from 'express'
const router = express.Router();
import { authUsers,
    getUserProfile,
    logoutUser,
    registerUser,
    getUsersById,
    getUsers,
    updateUsers,
    deleteUser,
    updateUserProfile} from '../controllers/userController.js'
import { protect, admin } from '../middlewares/authMiddleware.js';


router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/login',authUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUsersById).put(protect, admin, updateUsers)


export default router