import { useState } from "react";

import PostListView from "./Pages/Post-list-view";
import MapView from "./Pages/Map-view";
import WalletConnectScreen from "./Pages/Wallet-connect";
import CreateNFTView from "./Pages/Create-NFT-view";
import Home from "./Pages/Home";

import { Web3Modal } from '@web3modal/react';
import { providers } from '@web3modal/ethereum';
import { gnosisTestnet, cronosTestnet, mumbaiTestnet } from "./utils/network";

import "./App.css";

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

  const goToMap = (e) => {
    e.preventDefault();
    setAppState((prev) => ({...prev, view: "map" }));
  }
  const goToCreate = (e) => {
    e.preventDefault();
    setAppState((prev) => ({...prev, view: "create" }));
  }
  const goToList = (e) => {
    e.preventDefault();
    setAppState((prev) => ({...prev, view: "list" }));
  }

  const componentToRender = () => {
    switch(appState.view) {
      case "home":
        return <Home goToNext={goToMap}/>;
      case "start":
        return <WalletConnectScreen changeConnectedWallet={setAppState}/>;
      case "map":
        return <MapView goToCreate={goToCreate} goToList={goToList}/>;
      case "create":
        return <CreateNFTView appState={appState} goToMap={goToMap} goToList={goToList}/>;
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
        {componentToRender()}
      </div>
    </>
  );
}

export default App;
