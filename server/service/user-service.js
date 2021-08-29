const UserModel = require('../controllers/');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = requie('./token-service');
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
		await mailService.sendActivationMail(email, activationLink);

		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({...userDto});
		// сохраняем refreshToken в БД
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {...tokens, user: userDto}
	}
}

module.exports = UserService();