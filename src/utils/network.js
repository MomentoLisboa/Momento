export const gnosisTestnet = {
  id: 10200,
  name: "Gnosis",
  network: "gnosis",
  nativeCurrency: {
    decimals: 18,
    name: "GNO",
    symbol: "GNO",
  },
  rpcUrls: {
    default: "https://rpc.chiadochain.net",
  },
  blockExplorers: {
    default: { name: "Gnosis Scan Explorer", url: "https://blockscout.chiadochain.net" },
  },
  testnet: true,
};

export const cronosTestnet = {
  id: 338,
  name: "Cronos Testnet",
  network: "cronos",
  nativeCurrency: {
    decimals: 18,
    name: "tCRO",
    symbol: "tCRO",
  },
  rpcUrls: {
    default: "https://evm-t3.cronos.org",
  },
  blockExplorers: {
    default: { name: "CRO testnet Explorer", url: "https://cronos.org/explorer/testnet3" },
  },
  testnet: true,
};

export const mumbaiTestnet = {
  id: 80001,
  name: "Mumbai Testnet",
  network: "matic",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://matic-mumbai.chainstacklabs.com"
  },
  blockExplorers: {
    default: { name: "MATIC testnet explorer", url: "https://mumbai.polygonscan.com" }
  },
  testnet: true
}