module.exports = class UserDto{
	// список полей
	email;
	id;
	isActivated;

	// конструктор для извлечения необходимых полей
	constructor(model){
		this.email = model.email;
		this.id = model.id;
		this.isActivated = model.isActivated;
	}
}