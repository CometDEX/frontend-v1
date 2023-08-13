import { createContext, useState } from "react";

const ConnectWalletContext = createContext();

const ConnectWalletContextProvider = ({ children }) => {
  const [connectedWallet, setConnectedWallet] = useState({
    isConnected: false,
    walletId: "",
  });

  return (
    <ConnectWalletContext.Provider value={{ connectedWallet, setConnectedWallet }}>
      {children}
    </ConnectWalletContext.Provider>
  );
};

export { ConnectWalletContextProvider, ConnectWalletContext };
