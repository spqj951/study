// require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-chai-matchers");
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.9",
// };

//https://eth-rinkeby.alchemyapi.io/v2/T_WSKmK7sOGZw9joANbpIjg7_2dnW2Gt

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/T_WSKmK7sOGZw9joANbpIjg7_2dnW2Gt",
      accounts: [
        "56d3d30e3454485caddeadb2c91bbcf7eb18ba014a848e04e1b4202bf140c262",
      ],
    },
  },
};
