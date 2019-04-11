var db = require('../mysqldb.js');

var User = {
  getUserByUsername : function(username, callback){
    return db.query("Select id, username, password from user where username=?", [username], callback);
   },

   addUser : function(user, callback){
     return db.query("Insert into user set username=?, password=?", [user.username, user.password], callback);
   },

   deleteUserById : function(userId, callback){
     return db.query("delete from user where Id=?", [userId], callback);
   }

};

module.exports= User;
