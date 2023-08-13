import SouthIcon from "@mui/icons-material/South";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import CommonButton from "../Common/CommonButton";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";
import { translateEnumToText } from "../../helpers";

const SwapPreview = ({ tokens, openConnectWallet, swapInputValues,slippageTolerance }) => {
  const connectedWalletInfo = useContext(ConnectWalletContext);
  const { fromToken, toToken } = tokens;
  return (
    <Box width="400px">
      <Box p="1rem">
        <Box
          sx={{
            backgroundColor: "rgb(30 41 59)",
            padding: ".75rem",
            borderBottom: "1px solid rgb(30 41 59)",
            borderRadius: ".5rem .5rem 0 0",
          }}
        >
          <Typography fontSize=".875rem">Effective price: 1 {fromToken.tokenName} = 4.8717 {toToken.tokenName}</Typography>
        </Box>
        <Box
          position="relative"
          sx={{
            border: "1px solid rgb(15 23 42)",
            padding: ".75rem",
            display: "flex",
            alignItems: "center",
            "& img": {
              marginRight: ".4rem",
            },
          }}
        >
          <Image width={34} height={34} src={fromToken.logo} alt={fromToken.coin} />
          <Box ml=".5rem">
            <Typography
              variant="p"
              component="p"
              sx={{
                marginRight: ".5rem",
              }}
            >
              {swapInputValues.from} {fromToken.tokenName}
            </Typography>
            <Typography variant="p" component="p" sx={{ color: "rgb(148 163 184)" }}>
              $4.87
            </Typography>
          </Box>
          <Box
            display="flex"
            position="absolute"
            right="1rem"
            top="68px"
            sx={{
              backgroundColor: "rgb(30 41 59)",
              padding: "4px",
              borderRadius: "500px",
            }}
          >
            <SouthIcon sx={{ fontSize: "1.125rem" }} />
          </Box>
        </Box>

        <Box
          sx={{
            border: "1px solid rgb(15 23 42)",
            padding: ".75rem",
            display: "flex",
            alignItems: "center",
            "& img": {
              marginRight: ".4rem",
            },
          }}
        >
          <Image width={34} height={34} src={toToken.logo} alt={fromToken.coin} />
          <Box ml=".5rem">
            <Typography
              fontSize="1rem"
              fontWeight="500"
              sx={{
                marginRight: ".5rem",
              }}
            >
              {swapInputValues.to} {toToken.tokenName}
            </Typography>
            <Typography fontSize=".875rem" fontWeight="500" sx={{ color: "rgb(148 163 184)" }}>
              $4.87
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box mt="1rem" p="1rem">
        {connectedWalletInfo.connectedWallet.isConnected ? (
          <CommonButton
            variant="contained"
            sx={{
              width: "100%",
              background: "linear-gradient(to top right, rgba(37,99,235,1) 0%, rgba(232,17,236,1) 100%)",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
            }}
          >
            {/* {translateEnumToText(connectedWalletInfo.connectedWallet.walletId)} */}
            Swap
          </CommonButton>
        ) : (
          <CommonButton
            variant="contained"
            onClick={() => openConnectWallet(true)}
            sx={{
              width: "100%",
              background: "linear-gradient(to top right, rgba(37,99,235,1) 0%, rgba(232,17,236,1) 100%)",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
            }}
          >
            Connect wallet
          </CommonButton>
        )}
      </Box>
    </Box>
  );
};

export default SwapPreview;
