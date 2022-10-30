import { useState } from "react";

import PostListView from "./Pages/Post-list-view";
import OurMap from "./Pages/test-map";
import MapView from "./Pages/Map-view";
import WalletConnectScreen from "./Pages/Wallet-connect";
import CreateNFTView from "./Pages/Create-NFT-view";



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
        return <CreateNFTView appState={appState} />;
      case "list":
        return <PostListView />
      default:
        return <WalletConnectScreen changeConnectedWallet={setAppState}/>;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <PostListView /> */}
        {/* <OurMap/> */}
      </header>
      {componentToRender()}
    </div>
  );
}

export default App;
