import { Web3Button, useAccount } from '@web3modal/react'
import { useEffect } from 'react';

const WalletConnectScreen = ({ changeConnectedWallet }) => {
  const { account, isReady } = useAccount();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (account) {
      changeConnectedWallet((prev) => ({...prev, wallet_id: account, view: "create" }));
    }
  }, [account, isReady]);

  return (
    <>
      <h2 className="text-white">Momento</h2>
      <p className="text-white">Start by connecting your wallet</p>
      {!isReady && <Web3Button />}
      {!!isReady && <p className="text-white">{account.address}</p>}
    </>
  )
};

export default WalletConnectScreen