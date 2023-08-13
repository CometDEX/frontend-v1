import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Image from "next/image";

const TokenSearchFromListComponent = (props) => {
  const [tokenList, setTokenList] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const { onSelectToken } = props;

  const tokens = [
    { tokenName: "XLM", 
      coin: "Stellar", 
      logo: "/stellar.png",
      address: "CBSNJ7YLQ4USVLMG57UOHBAOZ5HP6UDL3GGVAMKTNMUB7CUTRSXZSVD5",
    },
    {
      tokenName: "USDC",
      coin: "USD Coin",
      logo: "/usdc.png",
      address: "CDRCIAQMOCJQGVX67STYFUG4EHFW4B4IPICZBZNPE6FVCIOG2H5FHGR6",
    },
    {
      tokenName: "sBTC",
      coin: "Wrapped Soroban Bitcoin",
      logo: "/sbtc.png",
      address: "CBRIY6PXANEX5FNK22UKER3XWXDBGBC6EDEJGMIEPKO5O2RUQD7ZJQFK",

    },
    {
      tokenName: "TT2",
      coin: "Wrap",
      logo: "/tt2.png",
      address: "CB63GGFUTINHNJNOCKWCWZ3TKPFKQDB7FBZ533FCAG4JOARASQ3VJEUU",
    },
  ];

  const handleSelectToken = (token) => {
    onSelectToken(token);
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const filterData = tokens.filter((item, i) => {
      if (item.tokenName.toLowerCase().includes(value)) {
        return true;
      } else if (item.coin.toLowerCase().includes(value)) {
        return true;
      } else if (item.tokenName.toLowerCase().includes(value) && item.coin.toLowerCase().includes(value)) {
        return true;
      }
    });

    setSearchValue(value);
    setTokenList(filterData);

    console.log("handleSelectToken=>", filterData);
  };

  useEffect(() => {
    setTokenList(tokens);
  }, []);

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
      <Box
        sx={
          {
            // padding: "1rem",
            // background: "linear-gradient(0deg, rgba(22,32,49,1) 0%, rgba(15,23,42,1) 100%)",
            // borderRadius: ".5rem",
          }
        }
      >
        <Box
          sx={{
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              borderRadius: ".5rem",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
            },
            "& .Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
              },
            },
          }}
        >
          <TextField
            onChange={handleSearchInput}
            value={searchValue}
            label="Search by"
            placeholder="name, symbol or address"
            sx={{
              "& label": {
                color: "#fff",
                "&.Mui-focused": {
                  color: "#fff",
                },
              },
            }}
            fullWidth
          />
        </Box>
        <Box p="1rem 0">
          {tokenList?.map((token, i) => {
            return (
              <Box
                display="flex"
                alignItems="center"
                key={i}
                sx={{
                  padding: ".5rem 1rem",
                  borderRadius: ".5rem",
                  cursor: "pointer",

                  "&.active": {
                    backgroundColor: "rgb(30 58 138)",
                    border: "1px solid rgb(59 130 246)",
                  },

                  "&:hover": {
                    backgroundColor: "rgb(30 58 138)",
                  },

                  "&:not(:last-child)": {
                    marginBottom: ".5rem",
                  },
                }}
                className={i === 0 ? "active" : ""}
                onClick={() => handleSelectToken(token)}
              >
                <Image src={token.logo} width={34} height={34} alt={token.coin} />
                <Box ml="1rem">
                  <Typography component="h4" variant="h4" fontSize="1rem">
                    {token.tokenName}
                  </Typography>
                  <Typography component="h5" variant="h5" fontSize=".875rem">
                    {token.coin}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default TokenSearchFromListComponent;
