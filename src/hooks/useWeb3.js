import Web3 from 'web3';

const MaticTestnetRPC = "https://matic-mumbai.chainstacklabs.com";
const web3PolygonTestnet = new Web3(MaticTestnetRPC);

const MaticRPC = "https://polygon-rpc.com/";
const web3Polygon = new Web3(MaticRPC);

const useWeb3PolygonTestnet = () => web3PolygonTestnet;
const useWeb3Polygon = () => web3Polygon;

export { useWeb3Polygon, useWeb3PolygonTestnet }
