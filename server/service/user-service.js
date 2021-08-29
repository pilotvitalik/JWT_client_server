const UserModel = require('../controllers/');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');

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
	}
}

module.exports = UserService();