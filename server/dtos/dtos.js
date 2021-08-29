module.exports = class UserDto{
	// список полей
	email;
	id;
	isActivated;

	// конструктор для извлечения необходимых полей
	constructor(model){
		this.email = modal.email;
		this.id = modal.id;
		this.isActivated = model.isActivated;
	}
}