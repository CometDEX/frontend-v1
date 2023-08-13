import { ConnectWalletContextProvider } from "../context/ConnectWalletContext";
import DefaultLayout from "../layouts/DefaultLayout";

export default function App({ Component, pageProps }) {
  return (
    <ConnectWalletContextProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ConnectWalletContextProvider>
  );
}
