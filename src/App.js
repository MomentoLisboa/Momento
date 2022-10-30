import { useState } from "react";

import PostListView from "./Pages/Post-list-view";
import MapView from "./Pages/Map-view";
import WalletConnectScreen from "./Pages/Wallet-connect";
import CreateNFTView from "./Pages/Create-NFT-view";
import Home from "./Pages/Home";

import "./App.css";

function App() {
  const [appState, setAppState] = useState({
    view: "create",
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
    <div className="App">
      {componentToRender()}
    </div>
  );
}

export default App;
