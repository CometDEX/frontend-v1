import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommonButton from "../Common/CommonButton";
import Image from "next/image";
import CommonTextField from "../Common/CommonTextField";
import * as factory from "factory";
import freighter from "@stellar/freighter-api";
import * as SorobanClient from 'soroban-client';
import * as contracts from "contracts";
import BigNumber from "bignumber.js";
import { scValToJs } from "../../soroban/helper";

const {
  getUserInfo,
} = freighter;
import { randomBytes } from "crypto"; // Import the required module

const generateSalt = (length) => {
  const saltBytes = 32;
  const saltBuffer = randomBytes(saltBytes);
  return saltBuffer.toString("hex");
};

const ConfirmationPoolStepComponent = (props) => {
  const { tokens, weights, swapFee, initialLiquidity } = props;
  const [poolName, setPoolName] = useState("");
  const [poolSymbol, setPoolSymbol] = useState("");
  const [isEnableCreatePool, setEnableCreatePool] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreatePoolClick = async () => {


    const values2 = weights.map(item => item.value);

    const initialLiquidityArray = await Promise.all(
      initialLiquidity.map(async value => {
        const parsedValue = parseFloat(value);
        const multipliedValue = parsedValue * 1e7;
        const truncatedValue = Math.trunc(multipliedValue);
        return truncatedValue;
      })
    );

  
    Promise.all([
        getUserInfo(),
    ]).then(fetched => {
        
        let val = fetched[0].publicKey;
        const salt = Buffer.from(generateSalt(32), "hex");
        const wasm_hash = Buffer.from("867520bbb385ba668db85ea4c96543a6dcc303d733b463fa25ab344bbaa869e4", "hex");

        Promise.all([
          factory.newCPool({salt, wasm_hash, user: val}, {responseType: "full"})
        ]).then(fetched => {

          const result = SorobanClient.xdr.TransactionMeta.fromXDR(fetched[0].resultMetaXdr, "base64");
          const scval = result.v3().sorobanMeta()?.returnValue();
          let addr_string = scValToJs(scval);
          
          // CBSNJ7YLQ4USVLMG57UOHBAOZ5HP6UDL3GGVAMKTNMUB7CUTRSXZSVD5
          // CDRCIAQMOCJQGVX67STYFUG4EHFW4B4IPICZBZNPE6FVCIOG2H5FHGR6
          // CBRIY6PXANEX5FNK22UKER3XWXDBGBC6EDEJGMIEPKO5O2RUQD7ZJQFK
          // CB63GGFUTINHNJNOCKWCWZ3TKPFKQDB7FBZ533FCAG4JOARASQ3VJEUU
          
          Promise.all([
            // sorobanTokenContract.mint({to: val, amount: BigNumber(100000000)}, { responseType: "full", deployed: "CB5JZCVJGORVWGI6UNKPIWXG3BLUPF7HNDM37GND4KMCI4ZBEX6KVB6Y" }),
          ]).then(fetched => {
              Promise.all([
                // sorobanTokenContract.mint({to: val, amount: BigNumber(100000000)}, { responseType: "full", deployed: "CD6JMUS3EJBRTU3P4R43V2GX63ITO2Y65574K54PHVRXSTZ47IYRNRC5" }),
              ]).then(fetched => {
                Promise.all([
                  contracts.bind({token: tokens[0].address, balance: BigNumber(initialLiquidityArray[0]), denorm: BigNumber(50000000), admin: val}, { responseType: "full", deployed: addr_string }),
                ]).then(fetched => {          
                  Promise.all([
                    contracts.bind({token: tokens[1].address, balance: BigNumber(initialLiquidityArray[1]), denorm: BigNumber(50000000), admin: val}, { responseType: "full", deployed: addr_string }),
                  ]).then(fetched => {
                      Promise.all([
                        contracts.bind({token: tokens[2].address, balance: BigNumber(initialLiquidityArray[2]), denorm: BigNumber(50000000), admin: val}, { responseType: "full", deployed: addr_string }),
                      ]).then(fetched => {
                        Promise.all([
                            // contracts.bind({token: tokens[3].addres, balance: BigNumber(initialLiquidityArray[3]), denorm: BigNumber(50000000), admin: val}, { responseType: "full", deployed: addr_string }),
                        ]).then(fetched => {

                          Promise.all([
                            contracts.finalize({responseType: "full", deployed: addr_string }),
  
                          ]).then(fetched => {
                              setSuccessMessage("Pool creation successful!");
                          })

                        })

                      });
                  });
                })
              })

          })

        })

    })    
  }

  
  const onChangeInputHandler = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    if (name === "name") setPoolName(value);
    if (name === "symbol") setPoolSymbol(value);
  };

  const isvalidForCreate = () => {
    if (poolName && poolSymbol) {
      setEnableCreatePool(true);
    } else {
      setEnableCreatePool(false);
    }
  };

  useEffect(() => {
    isvalidForCreate();
  }, [poolName, poolSymbol]);

  return (
    <Box p="0 1rem 1rem">
      <Box>
        <Typography sx={{ backgroundColor: "rgb(51 65 85)", padding: ".5rem", borderRadius: ".5rem .5rem 0 0" }}>
          Tokens and initial seed liquidity
        </Typography>
        <Box>
          {tokens?.map((token, i) => {
            return (
              <Box
                key={i}
                display="flex"
                alignItems="center"
                sx={{
                  boxShadow: "none",
                  height: "2.5rem",
                  padding: "6px",
                  borderBottom: "1px solid rgb(51 65 85)",

                  "& img": {
                    marginRight: ".5rem",
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Image src={token.logo} width={24} height={24} alt={token.coin} />
                  <Typography sx={{ whiteSpace: "nowrap" }}>{token.tokenName}</Typography>
                  <Typography
                    sx={{ fontSize: ".75rem", marginLeft: ".25rem", marginRight: ".25rem", color: "rgb(148 163 184)" }}
                  >
                    {weights[i].value}%
                  </Typography>
                </Box>
                <Box ml="auto">
                  <Typography
                    sx={{ fontSize: ".75rem", marginLeft: ".25rem", marginRight: ".25rem", color: "rgb(148 163 184)" }}
                  >
                    {initialLiquidity[i]}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            borderRadius: "0 0 .5rem .5rem",
            backgroundColor: "rgb(22 32 49)",
            border: "1px solid rgb(15 23 42)",
            padding: ".75rem",
            marginBottom: "1rem",
          }}
        >
          
        </Box>
      </Box>

      <Box>
        <Typography sx={{ backgroundColor: "rgb(51 65 85)", padding: ".5rem", borderRadius: ".5rem .5rem 0 0" }}>
          Summary
        </Typography>
        <Box
          mb=".5rem"
          sx={{
            borderRadius: "0 0 .5rem .5rem",
            backgroundColor: "rgb(22 32 49)",
            border: "1px solid rgb(15 23 42)",
            padding: ".75rem",
            marginBottom: "1rem",

            "& p": {
              fontSize: ".875rem",
              "&:not(:last-child)": {
                marginBottom: ".5rem",
              },
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            mb=".5rem"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(51 65 85) !important",
              },
              "& input": {
                "&::placeholder": {
                  fontSize: ".75rem",
                  fontWeight: "400",
                },
              },
              "& label": {
                color: "#fff",
                "&.Mui-focused": {
                  color: "#fff",
                },
              },
            }}
          >
            <Typography sx={{ display: "flex" }} variant="p" component="p">
              Pool name:
            </Typography>

            <CommonTextField
              sx={{ marginLeft: "auto" }}
              value={poolName}
              onChange={onChangeInputHandler}
              name="name"
              placeholder="Pool Name"
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            mb=".5rem"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(51 65 85) !important",
              },
              "& input": {
                "&::placeholder": {
                  fontSize: ".75rem",
                  fontWeight: "400",
                },
              },
              "& label": {
                color: "#fff",
                "&.Mui-focused": {
                  color: "#fff",
                },
              },
            }}
          >
            <Typography sx={{ display: "flex" }} variant="p" component="p">
              Pool symbol:
            </Typography>

            <CommonTextField
              sx={{ marginLeft: "auto" }}
              value={poolSymbol}
              onChange={onChangeInputHandler}
              name="symbol"
              placeholder="Pool symbol"
            />
          </Box>

          <Typography sx={{ display: "flex" }} variant="p" component="p">
            Pool type: <span style={{ marginLeft: "auto" }}>Weighted</span>
          </Typography>
          <Typography sx={{ display: "flex" }} variant="p" component="p">
            Weighted Swap fee: <span style={{ marginLeft: "auto" }}>{swapFee}%</span>
          </Typography>
        </Box>
      </Box>
      <CommonButton
        sx={{
          ...(!isEnableCreatePool
            ? ""
            : {
                background: "linear-gradient(to top right, rgba(37,99,235,1) 0%, rgba(232,17,236,1) 100%)",
                color: "#fff",
              }),
        }}
        disabled={!isEnableCreatePool}
        fullWidth
        onClick={handleCreatePoolClick}
      >
        Create Pool
      </CommonButton>

      {successMessage && (
        <Typography sx={{ color: "rgba(0, 255, 114, 0.8)", fontSize: "1rem", marginTop: "1rem" }}>
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default ConfirmationPoolStepComponent;

