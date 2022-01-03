
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks : {
    ropsten : {
      url : "https://eth-ropsten.alchemyapi.io/v2/5ZTGNg-maznSp6JFNTZ0kT8Ej-vMkl6V",
      accounts : ["e09b04b02f25f5675790a11e0cc3cd36591418c7526f288c97489e3dc840b01e"]
    }
  }
}