const blacklistTokensModel = require('../models/blacklistTokens.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async(req, res, next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {fullName, email, password, vehicle} = req.body;
    const hashedPassword = await captainModel.hashPassword(password);

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist) {
        return res.status(400).json({
            message: 'Captain already exists'
        });
    }
    try {
        const captain = await captainService.createCaptain({
            firstName:fullName.firstName,
            lastName:fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = await captain.generateAuthToken();
        return res.status(201).json({
            message: 'Captain created successfully',
            captain , token
        });
    } catch (error) {
        return next(error);
    }
}


module.exports.loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {email, password} = req.body;
    try {
        const captain = await captainModel.findOne({email}).select('+password');
        if(!captain) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        const isMatch = await captain.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        const token = await captain.generateAuthToken();
        return res.status(200).json({
            message: 'Captain logged in successfully',
            captain , token
        });
    } catch (error) {
        return next(error);
    }
}

module.exports.getCaptainProfile = async(req,res,next)=>{
    try {
        const captain = await captainModel.findById(req.captain._id).select('-password');
        return res.status(200).json({
            message: 'Captain profile fetched successfully',
            captain
        });
    } catch (error) {
        return next(error);
    }
}

module.exports.logoutCaptain = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        const blacklistedToken = await blacklistTokensModel.create({ token });
        res.clearCookie('token');
        return res.status(200).json({
            message: 'Captain logged out successfully',
        });
    } catch (error) {
        return next(error);
    }
}