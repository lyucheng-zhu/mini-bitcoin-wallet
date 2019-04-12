# Mini Bitcoin Wallet

**At present, it is only used for the bitcoin _testnet_.**

**The unit of bitcoin is Satoshi(0.00000001 BTC)**

It is a project for the coding challenge (https://github.com/MarkdaleMGMT/transaction-methods/wiki/Coding-Challenge).

## Version

Alpha

I kept the node_modules folder for this version.

## Basic running environment

Node.js + MySQL

### Recommended Version

Node.js 10.15.3 or above

MySQL: 8.0 or above

## How to run it locally

1. Clone the project into your folder.

2. Run wallet.sql in your MySQL Command Line Client.

3. Set the environment variable MYSQL_LOCAL_PASSWORD to the password of your local MySQL root account.

4. On your Node.js Command Line Client, cd into the project folder and run "npm start". Make sure the port 3306 is open for MySQL, the port 3000 is open for the client and the port 5000 is open for the server.

5. You can have a try on this web application now.

## Basci function

1. The home page. You can search a bitcoin wallet address or transaction here.

![Alt text](/screenshots/home.jpg?raw=true "Home page")

![Alt text](/screenshots/addressDetail.jpg?raw=true "Wallet Address Detail")

![Alt text](/screenshots/transaction.jpg?raw=true "Transaction Detail")

2. At the right top corner of the home page, you can click the button to sign in or sign up to use a payment function.

![Alt text](/screenshots/signin.jpg?raw=true "Sign in or Sign up")

3. Once you signed in, you would find the header of the home page changes. Now you can either make a payment directly by clicking the "pay" button on the left top corner, or click the "welcome" button on the right top corner to choose a saved wallet address to pay.

![Alt text](/screenshots/signedin.jpg?raw=true "Signed in")

4. My wallet page.

![Alt text](/screenshots/mywallet.jpg?raw=true "My Wallet")

5. Payment page.

![Alt text](/screenshots/payment.jpg?raw=true "Payment")
