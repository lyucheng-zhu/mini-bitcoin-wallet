const walletController = require('./../controllers/wallet.ctrl')

module.exports = (router) => {
  /**
   * add a wallet
   */
  router
      .route('/wallet')
      .post(walletController.addWallet),

  /**
   * delete a wallet
   */
  router
      .route('/wallet/:id')
      .delete(walletController.deleteWallet)
}
