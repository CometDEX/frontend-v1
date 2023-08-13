import { Box, Collapse, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CommonButton from "../Common/CommonButton";
import CommonDialog from "../Common/CommonDialog";
import ConnectWalletDialog from "./ConnectWalletDialog";
import TokenSearchFromListComponent from "./TokenSearchFromListComponent";
import PoolTokenItemComponent from "./PoolTokenItemComponent";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";
import ChooseTokenStepComponent from "./ChooseTokenStepComponent";
import SetPoolFeesStepComponent from "./SetPoolFeesStepComponent";
import SetLiquidityStepComponent from "./SetLiquidityStepComponent";
import ConfirmationPoolStepComponent from "./ConfirmationPoolStepComponent";
import axios from 'axios';

//Create a weighted pool steps
const CreatePoolListPreEndorse = ({ count, sx, title, onClick, isActive }) => {
  return (
    <CommonButton sx={{ ...sx }} onClick={onClick}>
      <Typography
        className={isActive ? "active" : ""}
        sx={{
          "&.active": {
            background: "linear-gradient(280deg, rgba(37,99,235,1) 0%, rgba(96,165,250,1) 100%)",
            border: "none",
            color: "#fff",
          },
          marginRight: "1rem",
          width: "1.5rem",
          height: "1.5rem",
          borderRadius: "100%",
          border: "1px solid rgb(71 85 105)",
          color: "rgb(148 163 184)",
        }}
        component="span"
        variant="body1"
      >
        {count}
      </Typography>
      {title}
    </CommonButton>
  );
};

//Helper for custom number toFixed
const numberToFix = (num, length = 2) => {
  const strNum = num.toString();
  const reg = new RegExp(/^-?\d+(?:\.\d{0,2})?/);
  return Number(strNum.match(reg)[0]);
};

const CreatePoolComponent = () => {
  const connectedWalletInfo = useContext(ConnectWalletContext);
  const [poolActiveStep, setPoolActiveState] = useState("tooken_choose");
  const [tokenCount, setTokenCount] = useState(2);
  const [isOpenConnectWallet, setIsOpenConnectWallet] = useState(false);
  const [isOpenTokenList, setIsOpenTokenList] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState([
    {
      tokenName: "",
      coin: "",
      logo: "",
    },
    {
      tokenName: "",
      coin: "",
      logo: "",
    },
  ]);
  const [currentState, setCurrentState] = useState(null);
  const [goNextStep, setGoNextStep] = useState(true);
  const [selectedPoolFees, setSelectedPoolFees] = useState("0.3");
  const [customPoolFees, setCustomPoolFees] = useState("");
  const [initialLiquidity, setInitialLiquidity] = useState(["0.0", "0.0"]);

  const model = {
    tokenName: "",
    coin: "",
    logo: "",
    initialLiquidity: "",
  };

  //Calculate Token Weight Value
  const getTokenWeightValue = (i) => {
    if (tokenCount > 0) {
      let devidedVal = 100 / tokenCount;
      if (i === 0 && 100 % tokenCount) {
        devidedVal = devidedVal + 0.01;
      }
      const numStr = devidedVal.toString();
      return Number(numStr.match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    }
  };

  const tokenDetails = {
    tokenName: "",
    value: getTokenWeightValue(),
  };

  const tokenObj = {
    tokenName: "",
    coin: "",
    logo: "",
  };

  //Handler for add new token input
  const handleAddToken = () => {
    setSelectedToken([...selectedToken, tokenObj]);
    setTokenCount(tokenCount + 1);
  };

  const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get(
        'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
      );
      const bitcoinPriceUSD = response.data.data.rates.USD;
      console.log(`Bitcoin Price (USD): ${bitcoinPriceUSD}`);
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
    }
  };

  const updateValue = (tokenData, value, i) => {
    const newTokens = JSON.parse(JSON.stringify(tokenData));

    const updatedTokenObj = newTokens.map((item, indx) => {
      if (indx !== i) {
        const newItem = item;
        if (i === 0) {
          newItem.value = numberToFix((100 - value) / (tokenCount - 1));
        } else {
          newItem.value = numberToFix((100 - value) / (tokenCount - 1));
        }
        return newItem;
      } else if (indx === i) {
        return item;
      }
    });

    return updatedTokenObj;
  };

  //Token weight value input field handler
  const inputTokenWeightHandler = (e, index) => {
    e.preventDefault();
    const { value } = e.target;
    const newTokens = JSON.parse(JSON.stringify(tokens));
    newTokens[index].value = value;
    const updatedToken = updateValue(newTokens, value, index);
    console.log("updatedToken", updatedToken);
    setTokens(updatedToken);
  };

  //Token remove from list handler
  const handleRemoveToken = (i) => {
    const newTokens = JSON.parse(JSON.stringify(tokens));
    newTokens.splice(i, 1);
    if (tokenCount > -1) setTokenCount(tokenCount - 1);
    setTokens(newTokens);
  };

  //Total Allocated value calculate
  const getTotalAllocation = () => {
    const value = Number(tokens.reduce((total, item) => total + Number(item.value), 0)).toFixed(2);
    return value;
  };

  //Handler for connect wallet butto
  const handleConnectWallet = (wallet) => {
    console.log("handleConnectWallet=>", wallet);
    setIsOpenConnectWallet(false);
  };

  //Functionality for select token dropdown
  const onClickSelectToken = (i) => {
    setCurrentState(i);
    setIsOpenTokenList(true);
  };
  //Functionality for select token from list
  const onSelectTokenFromList = (token) => {
    // console.log("handleSelectToken(CreatePoolComponent)=>", currentState);
    const oldTokens = JSON.parse(JSON.stringify(selectedToken));
    oldTokens[currentState] = token;
    setSelectedToken(oldTokens);
    setIsOpenTokenList(false);
  };

  const handleNextStep = () => {
    setPoolActiveState("set_pool_fees");
  };

  const getTitleBasedOnStep = () => {
    switch (poolActiveStep) {
      case "tooken_choose":
        return "Choose tokens & weights";
      case "set_pool_fees":
        return "Set pool fees";
      case "set_liquidity":
        return "Set initial liquidity";
      case "confirm_pool":
        return "Preview new weighted pool";
    }
  };

  const getComponentBasedOnStep = () => {
    switch (poolActiveStep) {
      case "tooken_choose":
        return (
          <ChooseTokenStepComponent
            tokenCount={tokenCount}
            tokens={tokens}
            selectedToken={selectedToken}
            handleRemoveToken={handleRemoveToken}
            inputTokenWeightHandler={inputTokenWeightHandler}
            onClickSelectToken={onClickSelectToken}
            isOpenTokenList={isOpenTokenList}
            setIsOpenTokenList={setIsOpenTokenList}
            onSelectTokenFromList={onSelectTokenFromList}
            handleAddToken={handleAddToken}
            getTotalAllocation={getTotalAllocation}
            handleNextStep={handleNextStep}
            goNextStep={goNextStep}
            setIsOpenConnectWallet={setIsOpenConnectWallet}
            connectedWalletInfo={connectedWalletInfo}
          />
        );
      case "set_pool_fees":
        return (
          <SetPoolFeesStepComponent
            connectedWalletInfo={connectedWalletInfo}
            setIsOpenConnectWallet={setIsOpenConnectWallet}
            getSelectedPoolFees={getSelectedPoolFees}
            handleNextStep={onClickSelectedPoolFeeNext}
            selectedPoolFees={selectedPoolFees}
            customPoolFees={customPoolFees}
          />
        );
      case "set_liquidity":
        return (
          <SetLiquidityStepComponent
            tokens={selectedToken}
            weights={tokens}
            handleNextStep={onClickSelectedPoolConfirmPool}
            initialLiquidity={initialLiquidity}
            onChangeInput={onChangeInitialLiquidity}
          />
        );
      case "confirm_pool":
        return (
          <ConfirmationPoolStepComponent
            tokens={selectedToken}
            weights={tokens}
            swapFee={selectedPoolFees}
            initialLiquidity={initialLiquidity}
          />
        );
    }
  };

  const getSelectedPoolFees = (fee, input) => {
    console.log("PoolFees=>", fee);
    if (input === "text") {
      setCustomPoolFees(fee);
    } else {
      setCustomPoolFees("");
    }
    setSelectedPoolFees(fee);
  };

  const onChangeInitialLiquidity = (val, indx) => {
    const oldData = initialLiquidity;
    oldData[indx] = val;
    console.log("handleOnChange InitialLiquidity", val, indx, oldData);
    setInitialLiquidity(oldData);
  };

  const onClickSelectedPoolFeeNext = () => {
    if (selectedPoolFees) {
      console.log("Clicked");
      setPoolActiveState("set_liquidity");
    }
  };

  const onClickSelectedPoolConfirmPool = () => {
    if (selectedPoolFees) {
      console.log("Clicked");
      setPoolActiveState("confirm_pool");
    }
  };

  const handleStepsRoute = (steps) => {
    setPoolActiveState(steps);
  };

  useEffect(() => {
    fetchBitcoinPrice();
  }, []);


  useEffect(() => {
    if (tokenCount > 0) {
      const generateTokenObj = Array.from({ length: tokenCount }, (v, i) => i).map((item, i) =>
        JSON.parse(JSON.stringify(tokenDetails))
      );
      generateTokenObj[0].value = getTokenWeightValue(0);
      setTokens(generateTokenObj);
    }
  }, [tokenCount]);

  useEffect(() => {
    console.log("GoNext=>", selectedToken, selectedToken.length && selectedToken.every((tok) => tok.coin));
    if (selectedToken.length && selectedToken.every((tok) => tok.coin)) {
      setGoNextStep(false);
    } else {
      setGoNextStep(true);
    }
  }, [selectedToken, tokens]);

  return (
    <Box maxWidth="926px" mt="4rem" mx="auto" padding="0 1.5rem">
      <Box
        display="flex"
        gap="16px"
        justifyContent="center"
        sx={{
          flexDirection: {
            sm: "row",
            xs: "column",
          },

          "& h3": {
            fontSize: "1rem",
            fontWeight: "600",
            color: "rgb(203 213 225)",
            padding: "1rem",
          },
        }}
      >
        <Box mt="1.5rem">
          <Box
            sx={{
              maxWidth: {
                xs: "100%",
                sm: "380px",
              },

              backgroundColor: "#162031",
              borderRadius: ".5rem",
              overflow: "hidden",
            }}
          >
            <Typography
              component="h3"
              variant="h3"
              sx={{
                borderBottom: "1px solid rgb(71 85 105)",
              }}
            >
              Create a weighted pool steps
            </Typography>
            <Box
              sx={{
                ul: {
                  listStyle: "none",
                },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                sx={{
                  margin: "1rem 0",
                  "& button": {
                    justifyContent: "flex-start",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                  },
                }}
              >
                <CreatePoolListPreEndorse
                  onClick={() => handleStepsRoute("tooken_choose")}
                  title="Choose tokens & weights"
                  count="1"
                  isActive={poolActiveStep === "tooken_choose"}
                />
                <CreatePoolListPreEndorse
                  isActive={poolActiveStep === "set_pool_fees"}
                  onClick={() => handleStepsRoute("set_pool_fees")}
                  title="Set pool fees"
                  count="2"
                />
                <CreatePoolListPreEndorse
                  onClick={() => handleStepsRoute("set_liquidity")}
                  title="Set initial liquidity"
                  count="3"
                  isActive={poolActiveStep === "set_liquidity"}
                />
                <CreatePoolListPreEndorse
                  onClick={() => handleStepsRoute("confirm_pool")}
                  title="Confirm pool creation"
                  count="4"
                  isActive={poolActiveStep === "confirm_pool"}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: {
              xs: "100%",
              sm: "400px",
              lg: "530px",
            },

            backgroundColor: "#162031",
            borderRadius: ".5rem",
            overflow: "hidden",
          }}
        >
          <Typography
            component="p"
            variant="body1"
            sx={{ marginBottom: ".25rem", padding: "1rem 1rem 0", fontSize: ".75rem", color: "rgb(148 163 184)" }}
          >
            Comet Mainnet
          </Typography>
          <Typography
            component="h3"
            variant="h3"
            sx={{
              paddingTop: "0 !important",
              fontSize: "1.125rem",
            }}
          >
            {getTitleBasedOnStep()}
          </Typography>

          {getComponentBasedOnStep()}
        </Box>
      </Box>
      {/* Dialog/Modal component of Connect Wallet */}
      <CommonDialog
        header="Connect to a wallet"
        content={<ConnectWalletDialog handleConnectWallet={handleConnectWallet} />}
        isOpen={isOpenConnectWallet}
        onClose={() => setIsOpenConnectWallet(false)}
      />
    </Box>
  );
};

export default CreatePoolComponent;
