import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CommonButton from "../Common/CommonButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";

const SetPoolFeesStepComponent = (props) => {
  const {
    connectedWalletInfo,
    selectedPoolFees,
    customPoolFees,
    handleNextStep,
    setIsOpenConnectWallet,
    getSelectedPoolFees,
  } = props;
  const [selectedVal, setSelectedVal] = useState(selectedPoolFees);

  const onClickHandlePoolFees = (val) => {
    getSelectedPoolFees(val);
    setSelectedVal(val);
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
    getSelectedPoolFees(value, "text");
  };

  return (
    <Box p="0 1rem 1rem">
      <Typography component="h6" variant="h6" fontSize="1rem" fontWeight="600">
        Initial swap fee
      </Typography>
      <Typography
        sx={{ padding: "0" }}
        component="p"
        variant="p"
        fontSize="1rem"
        color="rgb(71 85 105)"
        fontWeight="normal"
      >
        0.30% is best for most weighted pools with established tokens. Go higher for more exotic tokens.
      </Typography>

      <Box
        mt=".5rem"
        display="flex"
        sx={{
          "& .MuiButtonBase-root.MuiButton-root": {
            padding: "6px 12px",
            minWidth: "50px",
          },
        }}
      >
        <CommonButton
          sx={{
            border:
              !customPoolFees && selectedVal === "0.1"
                ? "1px solid rgb(29 78 216)"
                : "1px solid rgb(226 232 240 / 50%)",
            borderRadius: ".5rem",
            marginRight: ".5rem",
            fontWeight: "600",
            color: !customPoolFees && selectedVal === "0.1" ? "rgb(29 78 216)" : "rgb(226 232 240 / 50%)",
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={() => onClickHandlePoolFees("0.1")}
        >
          0.1%
        </CommonButton>
        <CommonButton
          onClick={() => onClickHandlePoolFees("0.3")}
          sx={{
            marginRight: ".5rem",
            fontWeight: "600",
            borderRadius: ".5rem",
            border:
              !customPoolFees && selectedVal === "0.3"
                ? "1px solid rgb(29 78 216)"
                : "1px solid rgb(226 232 240 / 50%)",
            color: !customPoolFees && selectedVal === "0.3" ? "rgb(29 78 216)" : "rgb(226 232 240 / 50%)",
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          0.3%
        </CommonButton>
        <CommonButton
          onClick={() => onClickHandlePoolFees("1.0")}
          sx={{
            marginRight: ".5rem",
            fontWeight: "600",
            borderRadius: ".5rem",
            border:
              !customPoolFees && selectedVal === "1.0"
                ? "1px solid rgb(29 78 216)"
                : "1px solid rgb(226 232 240 / 50%)",
            color: !customPoolFees && selectedVal === "1.0" ? "rgb(29 78 216)" : "rgb(226 232 240 / 50%)",
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          1.0%
        </CommonButton>
        <FormControl
          sx={{
            width: "100px",
            "& .MuiInputBase-root": {
              "& input.MuiInputBase-input": {
                padding: "8px 0px 8px 14px",
                textAlign: "right",
              },
            },
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              borderRadius: ".5rem",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: customPoolFees ? "rgb(29 78 216)" : "",
              },
            },
            "& .Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
              },
            },
            "& .MuiInputAdornment-root": {
              "& p.MuiTypography-root": {
                color: "#fff",
              },
            },
          }}
          variant="outlined"
        >
          <OutlinedInput
            onChange={onChangeInput}
            value={customPoolFees ? customPoolFees : ""}
            id="outlined-adornment"
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            inputProps={{
              "aria-label": "input",
            }}
          />
        </FormControl>
      </Box>

      <Box mt="0.75rem">
        {connectedWalletInfo?.connectedWallet.isConnected ? (
          <CommonButton
            onClick={handleNextStep}
            sx={{
              width: "100%",
              background: "linear-gradient(to top right, rgba(37,99,235,1) 0%, rgba(232,17,236,1) 100%)",
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

export default SetPoolFeesStepComponent;
