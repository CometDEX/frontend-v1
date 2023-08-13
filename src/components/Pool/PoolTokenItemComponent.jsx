import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommonButton from "../Common/CommonButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Image from "next/image";
import CommonDialog from "../Common/CommonDialog";
import TokenSearchFromListComponent from "./TokenSearchFromListComponent";

const PoolTokenItemComponent = ({
  token,
  selectedToken,
  isOpenTokenList,
  onCloseSearchFromList,
  indx,
  onChange,
  removeHandler,
  onClickSelectToken,
  onSelectTokenFromList,
}) => {
  const handleOnSelectTokenFromList = (token) => {
    onSelectTokenFromList(token);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: "rgb(30 41 59)",
        padding: ".75rem",
      }}
    >
      <CommonButton
        onClick={onClickSelectToken}
        sx={{
          backgroundColor: "rgb(96 165 250)",
          borderRadius: ".5rem",
          boxShadow: "none",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          color: "#fff !important",
          "&:hover": {
            backgroundColor: "rgb(96 165 250)",
            boxShadow: "none",
          },
        }}
      >
        {selectedToken && selectedToken.logo ? (
          <Box
            display="flex"
            alignItems="center"
            sx={{
              "& img": {
                marginRight: ".5rem",
              },
            }}
          >
            <Image src={selectedToken.logo} width={24} height={24} alt={selectedToken.coin} />
            <span>{selectedToken.tokenName}</span>
            <KeyboardArrowDownIcon />
          </Box>
        ) : (
          <>
            Select token <KeyboardArrowDownIcon />
          </>
        )}
      </CommonButton>
      <Box display="flex" alignItems="center" width="50%" ml="auto">
        <Box
          display="flex"
          alignItems="center"
          sx={{
            marginRight: ".5rem",

            "& span": {
              display: "block",
              color: "rgb(71 85 105)",
              userSelect: "none",
            },
            "& input": {
              border: 0,
              width: "50%",
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
          <input type="text" value={token?.value} onChange={(e) => onChange(e, indx)} />
          <span>%</span>
        </Box>
        <Box display="flex" ml="auto">
          <CommonButton
            variant="outlined"
            sx={{
              border: "none",
              padding: ".3rem",
              borderRadius: "100%",
              minWidth: "max-content",
              marginRight: ".2rem",
              backgroundColor: "rgb(22 32 49)",

              "& svg": {
                transition: "0.2s color ease-in-out",
              },
              "&:hover": {
                border: "none",
                backgroundColor: "rgb(22 32 49)",
                "& svg": {
                  color: "rgb(30 64 175)",
                },
              },
            }}
          >
            <LockOpenOutlinedIcon sx={{ fontSize: "1rem" }} />
          </CommonButton>
          <CommonButton
            variant="outlined"
            onClick={() => removeHandler(indx)}
            sx={{
              border: "none",
              minWidth: "max-content",
              padding: ".3rem",
              borderRadius: "100%",
              backgroundColor: "rgb(22 32 49)",
              "& svg": {
                transition: "0.2s color ease-in-out",
              },
              "&:hover": {
                border: "none",
                backgroundColor: "rgb(22 32 49)",
                "& svg": {
                  color: "rgb(239 68 68)",
                },
              },
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "1.1rem" }} />
          </CommonButton>
        </Box>
      </Box>
      {/* Dialog/Modal component of Token List and search */}
      <CommonDialog
        header="Token search"
        content={<TokenSearchFromListComponent onSelectToken={(tkn) => handleOnSelectTokenFromList(tkn)} />}
        isOpen={isOpenTokenList}
        onClose={onCloseSearchFromList}
      />
    </Box>
  );
};

export default PoolTokenItemComponent;
