import React, { useState, useEffect  } from "react";
import { Box, Typography } from "@mui/material";
import InitialLiquidityInputComponent from "./InitialLiquidityInputComponent";
import CommonButton from "../Common/CommonButton";
import freighter from "@stellar/freighter-api";
import * as sorobanTokenContract from "soroban_token_contract"


const {
  getUserInfo,
} = freighter;



const SetLiquidityStepComponent = (props) => {
  const { tokens, weights, handleNextStep, initialLiquidity, onChangeInput } = props;
  const [isReadyForPreview, setReadyForPreview] = useState(false);
  const [tokenBalances, setTokenBalances] = useState([]); // State to store token balances
  const [poolActiveStep, setPoolActiveState] = useState("tooken_choose");

  // const handleNextStep = () => {
  //   console.log("coming here")
  //   setPoolActiveState("confirm_pool");
  // };

  const handleOnChange = (val, i) => {
    onChangeInput(val, i);
  };

  useEffect(() => {
    
  
    const fetchBalances = async () => {
      const ddd = await getUserInfo();
      const dscc = ddd.publicKey;
      const balances = [];
      
      console.log(tokens.length);
      for (const token of tokens) {
        
        await Promise.all([
          sorobanTokenContract.balance(
            { id: dscc },
            { deployed: token.address }
          ),
        ]).then(fetched => {
          
          balances.push((parseFloat(fetched[0].toString()) / 1e7).toFixed(2));
        });

      }
      
      setTokenBalances(balances);
    };

    fetchBalances();
    
  }, [tokens]);

  return (
    <Box p="0 1rem 1rem">
      <Box>
        {tokens?.map((item, i) => {
          return (
            <InitialLiquidityInputComponent
              key={i}
              token={item}
              val={initialLiquidity[i]}
              onChange={(event) => handleOnChange(event, i)}
              weight={weights[i]}
              balance= {tokenBalances[i]}
            />
          );
        })}
      </Box>
      
      <Box mt="1rem">
        <CommonButton
          onClick={handleNextStep}
          disabled={false}
          sx={{
            width: "100%",
            background: isReadyForPreview
              ? ""
              : "linear-gradient(to top right, rgba(37,99,235,1) 0%, rgba(232,17,236,1) 100%)",
            height: "3rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          Preview
        </CommonButton>
      </Box>
    </Box>
  );
};

export default SetLiquidityStepComponent;
