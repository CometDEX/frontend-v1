import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PoolFilters from "./PoolFilters";
import PoolListTable from "./PoolListTable";
import TokenIcon from "../../assets/tokens_white.svg";
import CommonDialog from "../Common/CommonDialog";
import TokenSearchFromListComponent from "./TokenSearchFromListComponent";
import { cloneObject } from "../../helpers";

const PoolComponent = () => {
  const [poolData, setPoolData] = useState([]);
  const [isOpenTokenList, setIsOpenTokenList] = useState(false);
  const [selectedTokensForFilter, setSelectedTokensForFilter] = useState([]);

  const TableData = [
    {
      columnTitle: <TokenIcon />,
      // buildCell: (item) => item,
    },
    {
      columnTitle: "Composition",
      buildCell: (item) => {
        return (
          <Box
            display="flex"
            sx={{
              "& div": {
                textTransform: "uppercase",
                backgroundColor: "#334155",
                padding: "8px 10px",
                borderRadius: ".5rem",

                "& span": {
                  fontSize: ".75rem",
                  color: "rgb(148 163 184)",
                },

                "&:not(:last-child)": {
                  marginRight: "10px",
                },
              },
            }}
          >
            {item?.composition?.map((compos, i) => {
              return (
                <div key={i}>
                  {compos.token} <span>{compos.parcent}</span>
                </div>
              );
            })}
          </Box>
        );
      },
    },
    {
      columnTitle: "Pool value",
      buildCell: (item) => `${item.currency === "USD" ? "$" : ""}${item.value}`,
      align: "right",
    },
    {
      columnTitle: "Volume (24h)",
      buildCell: (item) => `${item.currency === "USD" ? "$" : ""}${item.volume}`,
      align: "right",
    },
    {
      columnTitle: "APR",
      buildCell: (item) => `${item.apr.from}% - ${item.apr.to}%`,
      align: "right",
    },
  ];

  const poolList = [
    {
      token: ["XLM", "USDC"],
      composition: [
        {
          token: "XLM",
          parcent: "80%",
        },
        {
          token: "USDC",
          parcent: "20%",
        },
      ],
      value: 187967779,
      currency: "USD",
      volume: 335576,
      apr: {
        from: 0.33,
        to: 0.59,
      },
    },
    {
      token: ["XLM", "USDC"],
      composition: [
        {
          token: "XLM",
        },
        {
          token: "USDC",
        },
      ],
      value: 107967779,
      currency: "USD",
      volume: 145576,
      apr: {
        from: 2.33,
        to: 5.59,
      },
    },
  ];

  const filterByTokenHandler = () => {
    setIsOpenTokenList(true);
  };

  //Functionality for select token from list
  const onSelectTokenFromList = (token) => {
    console.log("handleSelectToken(PoolComponent)=>", token);
    const oldTokens = cloneObject(selectedTokensForFilter);
    setSelectedTokensForFilter([...oldTokens, token]);
    setIsOpenTokenList(false);
  };

  const removeSelectedToken = (i) => {
    const oldTokens = cloneObject(selectedTokensForFilter);
    oldTokens.splice(i, 1);
    setSelectedTokensForFilter(oldTokens);
  };

  useEffect(() => {
    setPoolData(poolList);
  }, []);

  return (
    <Box>
      <Container
        maxWidth="xl"
        fixed
        sx={(theme) => ({
          paddingTop: "2rem",

          [theme.breakpoints.down("sm")]: {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },
        })}
      >
        <Typography
          sx={{ fontSize: "1.5rem", fontFamily: "'Inter', sans-serif", color: "#FFF", fontWeight: 600 }}
          variant="h3"
          component="h3"
        >
          Comet pools
        </Typography>
        <PoolFilters
          removeSelectedToken={removeSelectedToken}
          selectedTokensForFilter={selectedTokensForFilter}
          filterByTokenHandler={filterByTokenHandler}
        />
        <PoolListTable TableData={TableData} poolData={poolData} /> {/* Pools List */}
      </Container>

      {/* Dialog/Modal component of Token List and search */}
      <CommonDialog
        header="Token search"
        content={<TokenSearchFromListComponent onSelectToken={onSelectTokenFromList} />}
        isOpen={isOpenTokenList}
        onClose={() => setIsOpenTokenList(false)}
      />
    </Box>
  );
};

export default PoolComponent;
