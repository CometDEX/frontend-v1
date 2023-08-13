import Head from "next/head";
import HomeComponent from "../components/Home/HomeComponent";

export default function Home() {
  return (
    <>
      <Head>
        <title>DeFi Liquidity Pools on Comet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeComponent />
    </>
  );
}
