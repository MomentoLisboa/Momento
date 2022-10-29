import Web3 from 'web3';

const MaticTestnetRPC = "https://matic-mumbai.chainstacklabs.com";
const web3 = new Web3(MaticTestnetRPC);

export const useWeb3 = () => web3;