//испортируем пакет для работы с почтой
const nodemailer = require('nodemailer');

class MailService{

	// создаем поле для отправки писем на почту
	constructor(){
		// внутри метода указываем авторизационные данные
		// данные брать из настроек почтового сервера
		this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true, // можно менять значение, читать документацию
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
	}

	async sendActivationMail(email, link){
		console.log(email)
		await this.transporter.sendMail({
            from: 'itvkip@yandex.ru',
            to: email,
            subject: 'Активация аккаунта на ' + process.env.API_URL, // API_URL - url сайта
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
	};
}

module.exports = new MailService();