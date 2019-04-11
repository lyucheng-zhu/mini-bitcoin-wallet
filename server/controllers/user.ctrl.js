const User = require('./../models/User');
const Wallet = require('./../models/Wallet');

var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    signUp: (req, res) => {
      let user = req.body.user;
      const saltRounds = 10;
      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (!!err){
          res.json({err: err});
        }
        else {
          user.password = hash;
          User.addUser(user, function(error, results, fields){
            if (!!error){
              res.json({err: error});
            }
            else {
              console.log("User created!");

              let token = jwt.sign(
                {
                  username: user.username
                },
                'super secret',
                { expiresIn: 129600 });
              user.Id = results.insertId;
              user.password = "";
              user.token = token;
              user.wallets = [];

              res.json({
                sucess: true,
                err: null,
                user: user
              });
            }
          });
        }
      });
    },

    logIn: (req, res, next) => {
      //console.log(req);
      let user = req.body.user;
      User.getUserByUsername(user.username, function(error, results, fields){
        if (!!error)
          res.json({"err": error});
        else {
          let userFound = results[0];
          console.log("User Found: ", userFound);
          if (!userFound) {
            res.status(401).json({
              sucess: false,
              token: null,
              err: 'Invalid Credentials'
            });
          } else {
            bcrypt.compare(user.password, userFound.password, function (err, result){
              if (result === true) {
                console.log("Valid!");

                Wallet.getWalletByUserId(userFound.id, function(error, results, fields){
                  if (!!error){
                    console.log(error);
                    res.json({err: error});
                  }
                  else {
                    console.log(results);
                    user.wallets = [];
                    results.forEach(function(result){
                      let _wallet = {};
                      _wallet.Id = result.id;
                      _wallet.address = result.address;
                      _wallet.publicKey = result.publickey;
                      _wallet.privateKey = result.privatekey;
                      _wallet.userId = result.userid;
                      user.wallets.push(_wallet);
                    });
                    if (!results) user.wallets = [];
                    let token = jwt.sign(
                      {
                        username: user.username
                      },
                      'super secret',
                      { expiresIn: 129600 });
                    user.Id = userFound.id;
                    user.password = "";
                    user.token = token;

                    res.json({
                      sucess: true,
                      err: null,
                      user: user
                    });
                  }
                });
              }
              else {
                console.log("Entered Password and Hash do not match!");
                res.status(401).json({
                  sucess: false,
                  token: null,
                  err: 'Entered Password and Hash do not match!'
                });
              }
            });
          }
        }
      });
    },

}
