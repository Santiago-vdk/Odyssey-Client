function login() {
    var request = require('request');

    var user = $('#lg_username').val();
    var pass = $('#lg_password').val();

    var passHashed;
    var salt = "$2a$08$b0MHMsT3ErLoTRjpjzsCie";
    var bcrypt = new bCrypt();

    function result(newhash) {
        passHashed = newhash;
        request({
            method: 'POST',
            url: localStorage.server + 'api/v1/login',
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
            console.log("Access granted, this is your token: " + info);
            localStorage["username"] = user;
            localStorage["token"] = info.token;
            try {

                connecting(); //Inicializa la base de datos local
                initializeLocal(); //Inicializa las carpetas locales
                localStorage["localSync"] = false;
                window.location.href = "dashboard.html";
                return false;
            } catch (err) {
                console.log(err);
                logout();
            }


        } else if (!error && response.statusCode == 401) {
            console.log("Invalid Credentials!");
            swal("Error", "Invalid credentials.", "error");
        } else if (!error && response.statusCode == 403) {
            console.log("Theres already a session active.");
            swal("Error", "Please logout your account first.", "error");
        } else if (error) {
            console.log("Server unavailable!");
            swal("Error", "Our fault :(", "error");
        }
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
                    url: localStorage.server + 'api/v1/users',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: user,
                        password: confirm_passHashed
                    })
                }, callback);
            } else {
                console.log("Password mismatch!");
            }
        }
        bcrypt.hashpw(confirm_pass, salt, result_compare, function () {});
    }
    bcrypt.hashpw(pass, salt, result, function () {});

    function callback(error, response, body) {
        if (!error && response.statusCode == 201) {
            /*var info = JSON.parse(body);
            console.log(info);*/
            console.log("User created!");
            window.location.href = "index.html";
        } else if (!error && response.statusCode == 202) {
            console.log("Error while creating new user");
            swal("Error", "Invalid username or password.", "error");
        } else if (error) {
            console.log("Server unavailable!");
        }
    }
}

function logout() {
    var request = require('request');

    var user = localStorage.username;
    var token = localStorage.token;

    request({
        method: 'POST',
        url: localStorage.server + 'api/v1/logout',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: user,
            token: token
        })

    }, callback);


    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Disconected!");
            try {
                clear();
                localStorage.clear();

                $.ajax({
                    url: "\config.json",
                    success: function (data) {
                        var obj = JSON.parse(data);
                        localStorage["server"] = obj.server;
                    }
                });

                window.location.href = "index.html";
            } catch (err) {


                localStorage.clear();

                $.ajax({
                    url: "\config.json",
                    success: function (data) {
                        var obj = JSON.parse(data);
                        localStorage["server"] = obj.server;
                    }
                });

                window.location.href = "index.html";

            }
        } else if (!error && response.statusCode == 403) {
            console.log("Cannot disconnecting user...");
        } else if (error) {
            console.log("Server unavailable!");
        }

    }
}


function changePassword(username, old_password, new_password) {
    var request = require('request');

    var passHashed;
    var confirm_passHashed;
    var salt = "$2a$08$b0MHMsT3ErLoTRjpjzsCie";
    var bcrypt = new bCrypt();

    function result(oldPassHash) {
        function result_compare(newPassHash) {
            request({
                method: 'PUT',
                url: localStorage.server + 'api/v1/users/' + username + "/?type=password",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    old_password: oldPassHash,
                    new_password: newPassHash
                })
            }, callback);
        }
        bcrypt.hashpw(new_password, salt, result_compare, function () {});
    }
    bcrypt.hashpw(old_password, salt, result, function () {});

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            /*var info = JSON.parse(body);
            console.log(info);*/
            console.log("Password updated!");
        } else if (!error && response.statusCode == 401) {
            console.log("Forbidden access");
        } else if (!error && response.statusCode == 404) {
            console.log("Server unavailable!");
        }
    }
}

function deleteAccount(username, password) {
    var request = require('request');

    var salt = "$2a$08$b0MHMsT3ErLoTRjpjzsCie";
    var bcrypt = new bCrypt();

    function result(hashedPassword) {
        request({
            method: 'DELETE',
            url: localStorage.server + 'api/v1/users/' + username + '?type=account',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: hashedPassword,
                token: localStorage.token
            })
        }, callback);
    }
    bcrypt.hashpw(password, salt, result, function () {});

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Account erased!");
            window.location.href = "index.html";
        } else if (!error && response.statusCode == 401) {
            console.log("Forbidden request!");
        } else if (!error && response.statusCode == 403) {
            console.log("Access denied!");
        } else if (error) {
            console.log("Server unavailable!");
        }
    }
}