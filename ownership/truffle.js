module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 2000000,
      from: "0xa6171b8759a0c76cc8a29252cb071abce0c6cacc"
    }
  }
};
