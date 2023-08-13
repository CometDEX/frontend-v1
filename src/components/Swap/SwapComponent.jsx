import { Box, Dialog, Divider, Paper, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import CommonDialog from "../Common/CommonDialog";
import CommonButton from "../Common/CommonButton";
import SettingsIcon from "@mui/icons-material/Settings";
import SwapInputComponent from "./SwapInputComponent";
import ConnectWalletDialog from "../Pool/ConnectWalletDialog";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SwapPreview from "./SwapPreview";
import SlippageTolerance from "./SlippageTolerance";
import { cloneObject } from "../../helpers";
import BigNumber from "bignumber.js";
import * as contracts from "contracts";
import freighter from "@stellar/freighter-api";
import { scValToJs } from "../../soroban/helper";
import * as SorobanClient from 'soroban-client';

const {
  getUserInfo,
} = freighter;

const SwapComponent = () => {
  const connectedWalletInfo = useContext(ConnectWalletContext);
  const [isOpenConnectWallet, setIsOpenConnectWallet] = useState(false);
  const [isOpenSwapPreview, setIsOpenSwapPreview] = useState(false);
  const [isOpenSlippageTolerance, setIsOpenSlippageTolerance] = useState(false);
  const [fromToken, setFromToken] = useState({ tokenName: "XLM", coin: "Stellar", logo: "/stellar.png", address: "CBSNJ7YLQ4USVLMG57UOHBAOZ5HP6UDL3GGVAMKTNMUB7CUTRSXZSVD5" });
  const [successMessage, setSuccessMessage] = useState("");
  const [toToken, setToToken] = useState({
    tokenName: "USDC",
    coin: "USD Coin",
    logo: "/usdc.png",
    address: "CDRCIAQMOCJQGVX67STYFUG4EHFW4B4IPICZBZNPE6FVCIOG2H5FHGR6",
  });
  const [selectedSlippageTolerance, setSelectedSlippageTolerance] = useState("1.0");
  const [customSlippageTolerance, setCustomSlippageTolerance] = useState("");

  const [swapInputValues, setSwapInputValue] = useState({
    from: "0.0",
    to: "0.0",
  });

  const [isReadyForPreview, setIsReadyForPreview] = useState(false);

  const onClickSwapValue = () => {

    
    const oldFrom = fromToken;
    const oldTo = toToken;
    setFromToken(oldTo);
    setToToken(oldFrom);


  };

  const onClickSwap = () => {
    
    //TODO: Clean this code up

    console.log("sdsdd",fromToken.address);
    console.log("sds", toToken.address);


    Promise.all([
      getUserInfo()
    ]).then(fetched => {

      let val = fetched[0].publicKey;
      let token_amount_in = swapInputValues.from;
      const multipliedValue = token_amount_in * 1e7;
      const truncatedValue = Math.trunc(multipliedValue);

      Promise.all([
            contracts.swapExactAmountIn({
              token_in: fromToken.address,
              token_amount_in: BigNumber(truncatedValue),
              token_out: toToken.address,
              min_amount_out: BigNumber(0),
              max_price: BigNumber(100000000000),
              user: val,
            }, {responseType: "full", deployed: "CC5PSOLDYDM7CWUA6GBWL6G4G3TYVLEVR4D6YQ7L7E54KHN36LF36UIZ"})
          ]).then(fetched => {
            setSuccessMessage("Swap completed successfully");
      })
      
    })
  };


  //Handler for connect wallet button
  const handleConnectWallet = (wallet) => {
    console.log("handleConnectWallet=>", wallet);
    setIsOpenConnectWallet(false);
  };

  const handleSlippageTolerance = () => {
    setIsOpenSlippageTolerance(!isOpenSlippageTolerance);
  };

  //Functionality for select token from list
  const selectTokenFromList = (token, swapType) => {
    if (swapType === "from") {
      setFromToken(token);
    } else if (swapType === "to") {
      setToToken(token);
    }
  };

  const getSelectedSlippageTolerance = (tolerance, inputType) => {
    console.log("PoolFees=>", tolerance);
    if (inputType === "text") {
      setCustomSlippageTolerance(tolerance);
    } else {
      setCustomSlippageTolerance("");
    }
    setSelectedSlippageTolerance(tolerance);
  };

  const handleSwapInput = async (value, swapType) => {
    const oldVal = cloneObject(swapInputValues);
    if (swapType === "from") {
      oldVal.from = value;      
      const parsedValue = parseFloat(value);
      const multipliedValue = parsedValue * 1e7;
      const truncatedValue = Math.trunc(multipliedValue);

      console.log("sda",truncatedValue);
      if (!isNaN(parsedValue)) {
        // const newToValue = (parsedValue * 100).toFixed(2); // Multiply by 100 and format to 2 decimal places
        let val = await getUserInfo();
        await Promise.all([
          contracts.swapExactAmountIn({
            token_in: fromToken.address,
            token_amount_in: BigNumber(truncatedValue),
            token_out: toToken.address,
            min_amount_out: BigNumber(0),
            max_price: BigNumber(100000000000),
            user: val.publicKey,
          }, {responseType: "simulated", deployed: "CC5PSOLDYDM7CWUA6GBWL6G4G3TYVLEVR4D6YQ7L7E54KHN36LF36UIZ"})
        ]).then(fetched => {
          
          const tuf = scValToJs(
            SorobanClient.xdr.ScVal.fromXDR(Buffer.from(fetched[0].results[0].xdr, "base64"))
          );
          
          oldVal.to = (parseFloat(tuf[0].toString()) / 1e7); 
        })
      }
      setSwapInputValue(oldVal);
    } else if (swapType === "to") {
      oldVal.to = value;
      setSwapInputValue(oldVal);
    }
  };

  useEffect(() => {
    if (
      swapInputValues.from !== "0.0" &&
      swapInputValues.from !== "" &&
      swapInputValues.from > 0 &&
      swapInputValues.to !== "0.0" &&
      swapInputValues.to !== "" &&
      swapInputValues.to > 0
    ) {
      setIsReadyForPreview(true);
    } else {
      setIsReadyForPreview(false);
    }
  }, [swapInputValues]);

  return (
    <Box maxWidth="530px" mt="4rem" mx="auto" padding="0 1.5rem">
      <Box
        sx={{
          "& h3": {
            fontWeight: "600",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#162031",
            borderRadius: ".5rem",
          }}
        >
          <Box display="flex" alignItems="center" padding="1rem 1rem 0rem" position="relative">
            <Typography component="h3" variant="h3" fontSize="1.5rem">
              Swap
            </Typography>
            <CommonButton
              onClick={handleSlippageTolerance}
              sx={{
                minWidth: "auto",
                padding: "6px",
                width: "2rem",
                height: "2rem",
                borderRadius: "500px",
                marginLeft: "auto",

                "& svg": {
                  transitionProperty: "all",
                  transitionDuration: ".2s",
                  transitionTimingFunction: "cubic-bezier(0,0,.2,1)",
                  fontSize: "1.2rem",
                },

                "&:hover": {
                  svg: {
                    transform: "scale(1.2) rotate(-45deg)",
                    color: "rgb(96 165 250)",
                  },
                },
              }}
            >
              <SettingsIcon />
            </CommonButton>
            {isOpenSlippageTolerance ? (
              <Paper
                elevation={2}
                sx={{
                  borderRadius: ".5rem",
                  zIndex: "100",
                  p: "1rem 0",
                  position: "absolute",
                  top: "66px",
                  right: "16px",
                  backgroundColor: "rgb(30 41 59)",
                }}
              >
                <Typography component="h2" variant="h2" fontSize="1.25rem" fontWeight="500" padding="16px 24px">
                  Slippage Tolerance
                </Typography>
                <SlippageTolerance
                  getSelectedPoolFees={getSelectedSlippageTolerance}
                  selectedSlippageTolerance={selectedSlippageTolerance}
                  customSlippageTolerance={customSlippageTolerance}
                />
              </Paper>
            ) : (
              ""
            )}
          </Box>
          <Box padding="1rem">
            <SwapInputComponent
              token={fromToken}
              swapType="from"
              onChange={handleSwapInput}
              onSelectToken={selectTokenFromList}
              value={swapInputValues.from}
            />

            <Box display="flex" my=".5rem" alignItems="center" justifyContent="space-between">
              <CommonButton
                onClick={onClickSwapValue}
                sx={{
                  minWidth: "auto",
                  borderRadius: "500px",
                  padding: ".4rem",
                  backgroundColor: "rgb(15 23 42)",

                  "& svg": {
                    transitionProperty: "transform",
                    transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
                    transitionDuration: ".2s",
                    transitionTimingFunction: "cubic-bezier(0,0,.2,1)",
                    fontSize: "1rem",
                  },

                  "&:hover": {
                    backgroundColor: "rgb(15 23 42)",
                    "& svg": {
                      transform: "scale(1.2)",
                    },
                  },
                }}
              >
                <SwapVertIcon />
              </CommonButton>

              <Box
                sx={{
                  margin: "0 .5rem",
                  backgroundColor: "rgb(51 65 85)",
                  width: "100%",
                  height: "1.5px",
                  display: "block",
                }}
                variant="fullWidth"
              />
            </Box>

            <SwapInputComponent
              token={toToken}
              swapType="to"
              onSelectToken={selectTokenFromList}
              onChange={handleSwapInput}
              value={swapInputValues.to}
            />
            <Box mt="1rem">
              
              <CommonButton
                onClick={() => onClickSwap()}
                // setIsOpenSwapPreview(true);
                // setIsOpenSlippageTolerance(false);

                 
                
                disabled={!isReadyForPreview}
                sx={{
                  width: "100%",
                  background: !isReadyForPreview
                    ? ""
                    : "linear-gradient(to top right, rgba(37,99,235,1) 0%, rgba(232,17,236,1) 100%)",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                Swap
              </CommonButton>
              {successMessage && (
                <Typography
                  sx={{
                    color: "rgba(0, 255, 114, 0.8)",
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {successMessage}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <CommonDialog
        header="Connect to a wallet"
        content={<ConnectWalletDialog handleConnectWallet={handleConnectWallet} />}
        isOpen={isOpenConnectWallet}
        onClose={() => setIsOpenConnectWallet(false)}
      />
      <CommonDialog
        header="Preview swap"
        content={
          <SwapPreview
            swapInputValues={swapInputValues}
            openConnectWallet={setIsOpenConnectWallet}
            tokens={{ fromToken, toToken }}
            slippageTolerance={selectedSlippageTolerance}
          />
        }
        isOpen={isOpenSwapPreview}
        onClose={() => setIsOpenSwapPreview(false)}
      />
    </Box>
  );
};

export default SwapComponent;
