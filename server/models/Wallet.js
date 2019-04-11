var db = require('../mysqldb.js');

var Wallet = {
  getWalletByUserId : function(userId, callback){
    return db.query("Select id, address, publickey, privatekey, userid from wallet where userid=?", [userId], callback);
   },

  addWallet : function(wallet, callback){
    return db.query("Insert into wallet set address=?, publickey=?, privatekey=?, userid=?", [wallet.address, wallet.publicKey, wallet.privateKey, wallet.userId], callback);
  },

  deleteWalletById : function(walletId, callback){
    return db.query("delete from wallet where Id=?", [walletId], callback);
  },

   updateWalletById : function(wallet, callback){
     return db.query("update wallet set publickey=?,privatekey=? where id=?", [wallet.publickey, wallet.privatekey, wallet.id], callback);
   }

};

module.exports= Wallet;
