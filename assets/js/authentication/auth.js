function login() {
    var request = require('request');

    var user = $('#lg_username').val();
    var pass = $('#lg_password').val();

    console.log(user);
    console.log(pass);

    var passHashed;
    var salt = "$2a$08$b0MHMsT3ErLoTRjpjzsCie";
    var bcrypt = new bCrypt();

    function result(newhash) {
        passHashed = newhash;

        request({
            method: 'POST',
            url: 'http://localhost:9080/OdysseyCloud/api/v1/login',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: passHashed
            })

        }, callback);


    }
    bcrypt.hashpw(pass, salt, result, function () {});

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);
        }
        window.location.href = "dashboard.html";
        return false;
    }
}

function register() {
    var request = require('request');

    var user = $('#reg_username').val();
    var pass = $('#reg_password').val();
    var confirm_pass = $('#reg_password_confirm').val();

    var passHashed;
    var confirm_passHashed;
    var salt = "$2a$08$b0MHMsT3ErLoTRjpjzsCie";
    var bcrypt = new bCrypt();

    function result(newhash) {
        passHashed = newhash;

        function result_compare(confirm_hash) {
            confirm_passHashed = confirm_hash;

            if (confirm_passHashed = passHashed) {
                request({
                    method: 'POST',
                    url: 'http://localhost:9080/OdysseyCloud/api/v1/users',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: user,
                        password: confirm_passHashed
                    })
                }, callback);
            }
            else {
             console.log("Password mismatch!");   
                
            }
        }
        bcrypt.hashpw(confirm_pass, salt, result_compare, function () {});

    }
    bcrypt.hashpw(pass, salt, result, function () {});





    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);
        }
    }
}