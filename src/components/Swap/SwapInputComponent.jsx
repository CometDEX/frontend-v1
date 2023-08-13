import React, { useState,useEffect } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CommonButton from "../Common/CommonButton";
import Image from "next/image";
import CommonDialog from "../Common/CommonDialog";
import TokenSearchFromListComponent from "../Pool/TokenSearchFromListComponent";
import * as sorobanTokenContract from "soroban_token_contract"
import freighter from "@stellar/freighter-api";

const {
  getUserInfo,
} = freighter;



const SwapInputComponent = ({ onSelectToken, swapType, token, onChange, value }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpenTokenList, setIsOpenTokenList] = useState(false);
  const [balance, setBalance] = useState(0);

  const fetchBalance = async (token) => {

     Promise.all([
          getUserInfo()
      ]).then(fetched => {
          console.log(token.address);
          console.log(fetched[0].publicKey);
          Promise.all([
            sorobanTokenContract.balance({id: fetched[0].publicKey}, { deployed: token.address }),
          ]).then(fetched2 => {
            setBalance(fetched2[0])
            // var a = new BigDecimal(fetched2[0].toString());
            // var b = new BigDecimal( "10000000");
            // setBalance(a.divide(b).toString());

          })
      })
  };

  useEffect(() => {
    // Fetch the balance when the token changes
    if (token) {
      fetchBalance(token)
        .then(() => console.log("Updated"))
        .catch((error) => console.error("Error fetching balance:", error));
    }
  }, [token]);

  const handleFocusedItem = (state) => {
    setIsFocused(state);
  };

  const onClickSelectToken = () => {
    setIsOpenTokenList(true);
  };

  const onSelectTokenFromList = (token) => {
    onSelectToken(token, swapType);
    setIsOpenTokenList(false);
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    onChange(value, swapType);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(30 41 59)",
        borderRadius: "0.5rem",
        border: isFocused ? "1px solid rgb(96 165 250)" : "1px solid rgb(30 41 59)",

        "&:hover": {
          border: isFocused ? "1px solid rgb(96 165 250)" : "1px solid rgb(51 65 85)",
        },
      }}
      display="flex"
      flexDirection="column"
      padding=".5rem"
    >
      <Box display="flex" alignItems="center">
        <CommonButton
          onClick={onClickSelectToken}
          sx={{
            backgroundColor: "rgb(96 165 250)",
            borderRadius: ".5rem",
            boxShadow: "none",
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
            padding: "6px",
            width: {
              sm: "auto",
              xs: "-webkit-fill-available",
            },

            "&:hover": {
              backgroundColor: "rgb(96 165 250)",
              boxShadow: "none",
            },
          }}
        >
          {token ? (
            <Box
              display="flex"
              alignItems="center"
              sx={{
                "& img": {
                  marginRight: ".5rem",
                },
              }}
            >
              <Image src={token.logo} width={24} height={24} alt={token.coin} />
              <Typography>{token.tokenName}</Typography>
              <KeyboardArrowDownIcon />
            </Box>
          ) : (
            ""
          )}
        </CommonButton>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            marginRight: ".5rem",
            marginLeft: "auto",

            "& span": {
              display: "block",
              color: "rgb(71 85 105)",
              userSelect: "none",
            },
            "& input": {
              border: 0,
              width: "90%",
              outline: 0,
              fontSize: "1.3rem",
              color: "#fff",
              padding: "7px 0",
              background: "transparent",
              marginLeft: "auto",
              textAlign: "right",

              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
              },
            },
          }}
        >
          <input
            type="number"
            value={value}
            onFocus={() => handleFocusedItem(true)}
            onBlur={() => handleFocusedItem(false)}
            onChange={onChangeHandler}
          />
        </Box>
      </Box>
      <Typography
        sx={{
          color: "rgb(148 163 184)",
          fontSize: ".875rem",
          mt: ".5rem",
        }}
        component="h5"
        variant="h5"
      >
        Balance: {(parseFloat(balance.toString()) / 1e7).toFixed(2)}

      </Typography>

      <CommonDialog
        header="Token search"
        content={<TokenSearchFromListComponent onSelectToken={onSelectTokenFromList} />}
        isOpen={isOpenTokenList}
        onClose={() => setIsOpenTokenList(false)}
      />
    </Box>
  );
};

export default SwapInputComponent;
