const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/dtos');

class UserService{
	async registartion(email, password){
		const candidate = await UserModel.findOne({email});
		if (candidate){
			throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
		}
		const hashPasswd = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await UserModel.create({email, password: hashPasswd, activationLink})
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {...tokens, user: userDto}
	}

	async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();