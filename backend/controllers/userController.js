import asyncHandler from "../middlewares/asyncHandler.js"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
const authUsers = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // res.send('Authenticated User')

    //

    if(user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

//@desc     register user 
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Erorr('User Already exists');
    } 

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(400);
        throw new Error('Invalid User data');
    }
})

//@desc     Logout user 
//@route    POST /api/users/logout
//@access   Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully'})
})

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Public
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get profile User')
})

//@desc     Get user by id
//@route    GET /api/users/:id
//@access   Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
    res.send('get Users by Id')
})

//@desc     Upadet user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
})

//@desc     Get list of users 
//@route    GET /api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get Users')
})

//@desc     Delete users 
//@route    Delete /api/users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete Users')
})

//@desc     Update users 
//@route    PUT /api/users
//@access   Private/Admin
const updateUsers = asyncHandler(async (req, res) => {
    res.send('get Users')
})

export {
    authUsers,
    getUserProfile,
    logoutUser,
    registerUser,
    getUsersById,
    getUsers,
    updateUsers,
    deleteUser,
    updateUserProfile
}