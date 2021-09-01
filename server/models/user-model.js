var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.HOST_DB,
    user     : process.env.USER_DB,
    password : process.env.PASSWD_DB,
    database : process.env.DB
});


class UserModel{
    constructor(email){
        this.email = email;
    }

    find(){
        connection.connect();

        connection.query('SELECT * FROM user', function (error, results, fields) {
            if (error) console.log(error);
            console.log('The solution is: ', results[0].solution);
        });

        connection.end();
        console.log(this.email);
        return true;
    }
}

module.exports = UserModel;