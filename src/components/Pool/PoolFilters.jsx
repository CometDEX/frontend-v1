import { Box, Typography } from "@mui/material";
import React from "react";
import CommonButton from "../Common/CommonButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import PopulerTokens from "./PopulerTokens";
import Image from "next/image";

const PoolFilters = ({ filterByTokenHandler, removeSelectedToken, selectedTokensForFilter }) => {
  const router = useRouter();

  const handleCloseItem = (indx) => {
    removeSelectedToken(indx);
  };

  return (
    <Box display="flex" mt={2}>
      <Box display="flex">
        <CommonButton onClick={filterByTokenHandler}>
          <SearchIcon sx={{ marginRight: ".5rem" }} />
          Filter by token
        </CommonButton>
      </Box>
      {/* <PopulerTokens /> */}
      {selectedTokensForFilter.length ? (
        <Box display="flex" alignItems="center" ml="1rem">
          {selectedTokensForFilter?.map((item, i) => {
            return (
              <Box
                key={i}
                display="flex"
                alignItems="center"
                sx={{
                  "& img": {
                    marginRight: ".5rem",
                  },
                  "&:not(:last-child)": {
                    marginRight: "1rem",
                  },
                }}
              >
                <Image src={item.logo} alt={item.coin} width={24} height={24} />
                <Typography>{item.tokenName}</Typography>
                <Typography
                  sx={{
                    fontSize: ".75rem",
                    marginLeft: ".5rem",
                    color: "rgb(148 163 184)",
                    cursor: "pointer",
                  }}
                  component="p"
                  variant="p"
                  onClick={() => handleCloseItem(i)}
                >
                  X
                </Typography>
              </Box>
            );
          })}
        </Box>
      ) : (
        ""
      )}

      <CommonButton
        variant="outlined"
        sx={{
          ml: "auto",
          border: "1px solid #1D4ED8",
          color: "#1D4ED8",
          "&:hover": {
            border: "1px solid #1D4ED8",
            color: "#fff",
          },
        }}
        onClick={() => router.push("/pool/create")}
      >
        Create a pool
      </CommonButton>
    </Box>
  );
};

export default PoolFilters;
