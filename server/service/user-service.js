const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/dtos');

class UserService{
	async registartion(email, password){
		email = 'test@mail.ru';
		const candidate = await new UserModel(email).find();
		console.log(candidate)
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

module.exports = new UserService();