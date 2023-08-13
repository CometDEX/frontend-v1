import { Box, Collapse, Divider, Typography } from "@mui/material";
import React from "react";
import PoolTokenItemComponent from "./PoolTokenItemComponent";
import CommonButton from "../Common/CommonButton";

const ChooseTokenStepComponent = ({
  tokenCount,
  tokens,
  selectedToken,
  handleRemoveToken,
  inputTokenWeightHandler,
  onClickSelectToken,
  isOpenTokenList,
  setIsOpenTokenList,
  onSelectTokenFromList,
  handleAddToken,
  getTotalAllocation,
  handleNextStep,
  goNextStep,
  setIsOpenConnectWallet,
  connectedWalletInfo,
}) => {
  return (
    <Box
      margin="0 1rem 1rem"
      sx={{
        border: "1px solid rgb(15 23 42)",
        backgroundColor: "rgb(22 32 49)",
        borderRadius: ".5rem",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "1rem 1rem .25rem",
          "& h5": {
            fontSize: "1rem",
            fontWeight: "600",
          },
        }}
      >
        <Typography variant="h5" component="h5">
          Token
        </Typography>
        <Typography variant="h5" component="h5">
          Weight
        </Typography>
      </Box>
      <Box padding=".5rem">
        <Box>
          <Collapse in={true}>
            {tokenCount > 0
              ? tokens.map((item, i) => {
                  return (
                    <PoolTokenItemComponent
                      token={item}
                      indx={i}
                      selectedToken={selectedToken[i]}
                      removeHandler={handleRemoveToken}
                      onChange={inputTokenWeightHandler}
                      onClickSelectToken={() => onClickSelectToken(i)}
                      isOpenTokenList={isOpenTokenList}
                      onCloseSearchFromList={() => setIsOpenTokenList(false)}
                      onSelectTokenFromList={onSelectTokenFromList}
                      key={i}
                    />
                  );
                })
              : ""}
          </Collapse>
        </Box>
      </Box>
      <Box
        sx={{
          padding: ".75rem",
        }}
      >
        <CommonButton
          variant="outlined"
          onClick={handleAddToken}
          disabled={tokenCount >= 8}
          sx={{
            ml: "auto",
            border: "1px solid rgb(29 78 216)",
            color: "rgb(96 165 250)",
            borderRadius: ".5rem",
            "&:hover": {
              border: "1px solid rgb(29 78 216)",
              color: "#fff",
            },
          }}
        >
          Add a token
        </CommonButton>
      </Box>
      <Box display="flex" justifyContent="space-between" padding="0.75rem 0.75rem .25rem">
        <Typography component="h6" variant="h6">
          Total allocated
        </Typography>
        <Typography component="h6" variant="h6">
          {getTotalAllocation()}%
        </Typography>
      </Box>
      <Divider
        variant="middle"
        sx={{
          marginBottom: "1rem",
          backgroundColor: "rgb(51 65 85)",
          height: "4.5px",
          borderRadius: "100px",
        }}
      />
      <Box padding="0 .75rem">
        {connectedWalletInfo.connectedWallet.isConnected ? (
          <CommonButton
            onClick={handleNextStep}
            disabled={goNextStep}
            sx={{
              width: "100%",
              background: goNextStep
                ? ""
                : "linear-gradient(to top right, rgba(37,99,235,1) 0%, rgba(232,17,236,1) 100%)",
              height: "3rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            Next
          </CommonButton>
        ) : (
          <CommonButton
            onClick={() => setIsOpenConnectWallet(true)}
            sx={{
              width: "100%",
              background: "linear-gradient(to top right, rgba(37,99,235,1) 0%, rgba(232,17,236,1) 100%)",
              height: "3rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            Connect wallet
          </CommonButton>
        )}
      </Box>
    </Box>
  );
};

export default ChooseTokenStepComponent;
