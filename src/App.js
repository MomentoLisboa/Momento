import { useState } from "react";

import PostListView from "./Pages/Post-list-view";
import OurMap from "./Pages/test-map";
import MapView from "./Pages/Map-view";
import WalletConnectScreen from "./Pages/Wallet-connect";
import CreateNFTView from "./Pages/Create-NFT-view";
import Home from "./Pages/Home";

import { Web3Modal } from '@web3modal/react';
import { providers } from '@web3modal/ethereum';
import { gnosisTestnet, cronosTestnet, mumbaiTestnet } from "./utils/network";

const config = {
  projectId: '1bd4139fcba9da0ebb55e2d5ffa1d12d',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'Momento',
    autoConnect: true,
    chains: [
      gnosisTestnet,
      cronosTestnet,
      mumbaiTestnet,
    ],
    providers: [
      providers.walletConnectProvider({
        projectId: "1bd4139fcba9da0ebb55e2d5ffa1d12d",
      }),
    ],
  }
};





function App() {
  const [appState, setAppState] = useState({
    view: "home",
  });

  const isWalletConnected = !!appState?.wallet_id;

  const componentToRender = () => {
    switch(appState.view) {
      case "home":
        return <Home goToNext={() => setAppState((prev) => ({...prev, view: "map" }))}/>;
      case "start":
        return <WalletConnectScreen changeConnectedWallet={setAppState}/>;
      case "map":
        return <MapView />;
      case "create":
        return <CreateNFTView appState={appState} />;
      case "list":
        return <PostListView />
      default:
        return <WalletConnectScreen changeConnectedWallet={setAppState}/>;
    }
  }

  return (
    <>
      <Web3Modal config={config}/>
      <div className="App">
        <header className="App-header">
          
          {/* <PostListView /> */}
          {/* <OurMap/> */}
        </header>
        {componentToRender()}
      </div>
    </>
  );
}

export default App;
