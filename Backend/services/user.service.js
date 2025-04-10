const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstName,
    lastName,
    email,
    password
}) => {
    try {
        if(!firstName || !email || !password) {
            throw new Error('All fields are required');
        }
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userModel.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password: hashedPassword
        });
        return user;
    } catch (error) {
        throw error;
    }
}