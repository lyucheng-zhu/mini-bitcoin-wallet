const Wallet = require('./../models/Wallet');
var decode = require("jwt-decode");

function isTokenExpired(token){
  try {
    const decoded = decode(token);
    return (decoded.exp < Date.now() / 1000);
  } catch (err) {
    console.log("expired check failed!");
    return true;
  }
}

module.exports = {
    addWallet: (req, res) => {
      let authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(401).json({ err: 'Unauthorized' });
      }
      let type = authorization.split(' ')[0];
      let token = authorization.split(' ')[1];
      if (type !== "Bearer" || isTokenExpired(token)) {
        return res.status(401).json({ err: 'Unauthorized' });
      }

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
      let authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(401).json({ err: 'Unauthorized' });
      }
      let type = authorization.split(' ')[0];
      let token = authorization.split(' ')[1];
      if (type !== "Bearer" || isTokenExpired(token)) {
        return res.status(401).json({ err: 'Unauthorized' });
      }

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
