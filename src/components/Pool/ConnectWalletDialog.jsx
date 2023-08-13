import { useState, useContext } from "react";
import { Box, Radio, Checkbox, Typography } from "@mui/material";
import CommonButton from "../Common/CommonButton";
import MetaMaskIcon from "../../assets/metamask.svg";
import WalletConnectIcon from "../../assets/walletconnect.svg";
import CoinbaseWalletIcon from "../../assets/walletlink.svg";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Image from "next/image";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";

const ConnectWalletDialog = (props) => {
  const { handleConnectWallet } = props;
  const [isAcceptTermsConditions, setIsAcceptTermsConditions] = useState(false);
  const connectedWalletInfo = useContext(ConnectWalletContext);

  const connectWaletHandler = (wallet) => {
    connectedWalletInfo.setConnectedWallet({
      walletId: wallet,
      isConnected: true,
    });

    handleConnectWallet(wallet);
  };

  const handleTermsConditionRadio = (e) => {
    console.log(e, isAcceptTermsConditions);
    setIsAcceptTermsConditions(!isAcceptTermsConditions);
  };

  return (
    <Box
      sx={{
        color: "#fff",
        width: "450px",
        padding: "0 1.5rem 1.5rem",

        "& .MuiRadio-root": {
          color: "#fff",
          "&.Mui-checked": {
            color: "blue",
          },
        },
      }}
    >
      <Box mb="1.5rem" display="flex" alignItems="flex-start">
        <Checkbox
          sx={{ padding: "0", mr: ".5rem" }}
          id="termCondition"
          icon={<RadioButtonUncheckedIcon sx={{ color: "#fff" }} />}
          checkedIcon={<RadioButtonCheckedIcon sx={{ color: "#1976d2" }} />}
          onChange={handleTermsConditionRadio}
          checked={isAcceptTermsConditions}
        />
        <label htmlFor="termCondition" style={{ cursor: "pointer" }}>
          By connecting a wallet, I agree to Comet&apos;s Terms of Use, Risks, Cookies Policy, use of 3rd party
          services and Privacy Policy.
        </label>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: ".75rem",

          "&.grayscale": {
            filter: "grayscale(100%)",
            opacity: "0.2",

            "& .MuiButton-root.Mui-disabled": {
              color: "#fff",
            },
          },

          "& button": {
            fontSize: "1rem",
            lineHeight: "1.5rem",
            backgroundColor: "rgb(15 23 42)",
            border: "1px solid rgb(15 23 42)",
            padding: "7px 1rem",
            justifyContent: "flex-start",

            "&:hover": {
              backgroundColor: "rgb(30 41 59)",
            },
            "&:not(:last-child)": {
              marginBottom: ".75rem",
            },
          },
        }}
        className={isAcceptTermsConditions ? "" : "grayscale"}
      >
        <CommonButton
          sx={{
            "& img": {
              marginRight: "1rem",
            },
          }}
          disabled={!isAcceptTermsConditions}
          onClick={() => connectWaletHandler("_FREIGHTER_")}
        >
          <Image src="/freighter-logo.png" width={40} height={40} alt="freighter" />
          Freighter
        </CommonButton>
      </Box>
      {/* <Box
        sx={{
          padding: "1rem",
          background: "linear-gradient(0deg, rgba(22,32,49,1) 0%, rgba(15,23,42,1) 100%)",
          borderRadius: ".5rem",
        }}
      >
        <Typography component="h6" variant="h6" sx={{}}>
          New to Freighter?
        </Typography>
        <Typography component="p" variant="p" sx={{}}>
          Comet is a DeFi app on Freighter. Set up an Freighter Wallet to swap and provide liquidity here. Learn more
        </Typography>
      </Box> */}
    </Box>
  );
};

export default ConnectWalletDialog;
