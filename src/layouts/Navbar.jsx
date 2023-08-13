import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Logo from "../assets/Logo.svg";
import SvgIcon from "@mui/material/SvgIcon";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import WalletIcon from "../assets/icon_wallet.svg";
import CommonDialog from "../components/Common/CommonDialog";
import ConnectWalletDialog from "../components/Pool/ConnectWalletDialog";
import { ConnectWalletContext } from "../context/ConnectWalletContext";
import { translateEnumToText } from "../helpers";

const Navbar = () => {
  const router = useRouter();
  const [isOpenConnectWallet, setIsOpenConnectWallet] = useState(false);
  const connectedWalletInfo = useContext(ConnectWalletContext);

  const handleIsActiveLink = (path) => {
    switch (path) {
      case "pool":
        return router.pathname.includes(path) ? "active" : "";
      case "swap":
        return router.pathname.includes(path) ? "active" : "";
    }
    return "";
  };

  //Handler for connect wallet butto
  const handleConnectWallet = (wallet) => {
    console.log("handleConnectWallet=>", wallet);
    setIsOpenConnectWallet(false);
  };

  return (
    <AppBar position="static" sx={{ padding: "0 1.5rem" }}>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          "& p": {
            margin: "0",
            padding: "0",
          },
          "& a": {
            display: "flex",
          },
        }}
      >
        <Link href="/pool">
          <SvgIcon>
            <Logo />
          </SvgIcon>
        </Link>

        <Box
          display="flex"
          ml="2rem"
          sx={{
            "& a": {
              position: "relative",
              textDecoration: "none",
              color: "#FFF",
              padding: "1rem .3rem",
              "&:hover": {
                color: "secondary.main",
                "&:after": {
                  content: `""`,
                  position: "absolute",
                  width: "100%",
                  height: "2.5px",
                  backgroundColor: "secondary.main",
                  top: 0,
                  left: 0,
                },
              },
              "&:not(:last-child)": {
                marginRight: "1.5rem",
              },

              "&.active": {
                "&:after": {
                  content: `""`,
                  position: "absolute",
                  width: "100%",
                  height: "2.5px",
                  backgroundColor: "#60A5FA",
                  top: 0,
                  left: 0,
                },
              },
            },
          }}
        >
          <Link className={handleIsActiveLink("pool")} href="/pool">
            Pool
          </Link>
          <Link className={handleIsActiveLink("swap")} href="/swap">
            Swap
          </Link>
          
        </Box>
        <Box ml="auto">
          {connectedWalletInfo.connectedWallet.isConnected ? (
            <Button
              variant="contained"
              sx={{
                color: "#fff",
                backgroundColor: "#1E2933",
                "&:hover": {
                  backgroundColor: "#1E2933",
                },
              }}
            >
              <SvgIcon
                sx={{
                  fontSize: "1.2rem",
                  marginRight: ".5rem",
                }}
              >
                <WalletIcon />
              </SvgIcon>
              {translateEnumToText(connectedWalletInfo.connectedWallet.walletId)}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => setIsOpenConnectWallet(true)}
              sx={{
                color: "#fff",
                backgroundColor: "#1E2933",
                "&:hover": {
                  backgroundColor: "#1E2933",
                },
              }}
            >
              <SvgIcon
                sx={{
                  fontSize: "1.2rem",
                  marginRight: ".5rem",
                }}
              >
                <WalletIcon />
              </SvgIcon>
              Connect wallet
            </Button>
          )}
        </Box>
      </Box>
      {/* Dialog/Modal component of Connect Wallet */}
      <CommonDialog
        header="Connect to a wallet"
        content={<ConnectWalletDialog handleConnectWallet={handleConnectWallet} />}
        isOpen={isOpenConnectWallet}
        onClose={() => setIsOpenConnectWallet(false)}
      />
    </AppBar>
  );
};

export default Navbar;
