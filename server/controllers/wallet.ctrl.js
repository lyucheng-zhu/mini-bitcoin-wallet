const Wallet = require('./../models/Wallet');

module.exports = {
    addWallet: (req, res) => {
      let wallet = req.body.wallet;
      console.log(wallet);

      Wallet.addWallet(wallet, function(error, results, fields){
        if (!!error){
          console.log(error);
          res.json({err: error});
        }
        else {
          console.log("Wallet saved!");

          wallet.Id = results.insertId;
          res.json({
            sucess: true,
            err: null,
            wallet: wallet
          });
        }
      });
    },

    deleteWallet: (req, res) => {
      let walletId = req.params.id;

      Wallet.deleteWalletById(walletId, function(error, results, fields){
        if (!!error){
          res.json({err: error});
        }
        else {
          console.log("Wallet deleted!");

          res.json({
            sucess: true,
            err: null,
          });
        }
      });
    }

}
