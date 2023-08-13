import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const InitialLiquidityInputComponent = ({ balance, onChange, token, weight, val }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(val);

  const handleFocusedItem = (state) => {
    setIsFocused(state);
  };

  
  const onChangeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
    onChange(value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(30 41 59)",
        borderRadius: "0.5rem",
        border: isFocused
          ? "1px solid rgb(96 165 250)"
          : balance <= 0 && value !== "0.0"
          ? "1px solid rgb(239 68 68)"
          : "1px solid rgb(30 41 59)",
        marginBottom: "1rem",

        "&:hover": {
          border: isFocused ? "1px solid rgb(96 165 250)" : "1px solid rgb(51 65 85)",
        },
      }}
      display="flex"
      flexDirection="column"
      padding=".5rem"
    >
      <Box display="flex" alignItems="center">
        {token ? (
          <Box
            display="flex"
            alignItems="center"
            sx={{
              backgroundColor: "rgb(51 65 85)",
              borderRadius: ".5rem",
              boxShadow: "none",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              padding: "6px",
              "& img": {
                marginRight: ".5rem",
              },
            }}
          >
            <Image src={token.logo} width={24} height={24} alt={token.coin} />
            <Typography sx={{ whiteSpace: "nowrap" }}>{token.tokenName}</Typography>
            <Typography sx={{ marginLeft: ".25rem", marginRight: ".25rem", color: "rgb(148 163 184)" }}>
              {weight.value}%
            </Typography>
          </Box>
        ) : (
          ""
        )}

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
            },
          }}
        >
          <input
            type="text"
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
        Balance: {balance} 
      </Typography>
      {balance <= 0 && value !== "0.0" ? (
        <span style={{ color: "rgb(239 68 68)", fontSize: ".75rem" }}>Exceeds wallet balance</span>
      ) : (
        ""
      )}
    </Box>
  );
};

export default InitialLiquidityInputComponent;
// //(parseFloat(balance) / 1e7).toFixed(2)