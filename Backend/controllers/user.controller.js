const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokens.model');

module.exports.registerUser = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {fullName, email, password} = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    try {
        const user = await userService.createUser({
            firstName:fullName.firstName,
            lastName:fullName.lastName,
            email,
            password: hashedPassword
        });
         const token = await user.generateAuthToken();
        return res.status(201).json({
            message: 'User created successfully',
            user , token
        });
    } catch (error) {
        return next(error);
    }

}

module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email}).select('+password');
        if(!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        const token = await user.generateAuthToken();
        res.cookie('token',token);

        return res.status(200).json({
            message: 'User logged in successfully',
            user, token
        });
    } catch (error) {
        return next(error);
    }
}

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json({
        message: 'User profile fetched successfully',
        user: req.user
    });
}

module.exports.logoutUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    try {
        await blacklistTokenModel.create({token});
        res.clearCookie('token');
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    } catch (error) {
        return next(error);
    }
}