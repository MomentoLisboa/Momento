import { useState } from "react";

import PostListView from "./Pages/Post-list-view";
import OurMap from "./Pages/test-map";
import MapView from "./Pages/Map-view";
import WalletConnectScreen from "./Pages/Wallet-connect";
import CreateNFTView from "./Pages/Create-NFT-view";
import { Web3Modal } from '@web3modal/react';

const config = {
  projectId: '<ENV>',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal'
  }
};

function App() {
  const [appState, setAppState] = useState({
    view: "start",
  });

  const isWalletConnected = !!appState?.wallet_id;

  const componentToRender = () => {
    switch(appState.view) {
      case "start":
        return <WalletConnectScreen changeConnectedWallet={setAppState}/>;
      case "map":
        return <MapView />;
      case "create":
        return <CreateNFTView />;
      default:
        return <WalletConnectScreen changeConnectedWallet={setAppState}/>;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <PostListView /> */}
        <OurMap/>
      </header>
      {/* {componentToRender()} */}
      <Web3Modal config={config} />
    </div>
  );
}

export default App;
