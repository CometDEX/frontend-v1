import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CommonButton from "../Common/CommonButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";

const SlippageTolerance = ({ getSelectedPoolFees, selectedSlippageTolerance, customSlippageTolerance }) => {
  const [selectedVal, setSelectedVal] = useState(selectedSlippageTolerance);

  const onClickHandleSlippageTolerance = (val) => {
    getSelectedPoolFees(val);
    setSelectedVal(val);
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
    getSelectedPoolFees(value, "text");
  };

  return (
    <Box p="0rem 1rem 1rem" display="flex" width="380px">
      <CommonButton
        sx={{
          border:
            !customSlippageTolerance && selectedVal === "0.5"
              ? "1px solid rgb(29 78 216)"
              : "1px solid rgb(226 232 240 / 50%)",
          marginRight: ".5rem",
          fontWeight: "600",
          color: !customSlippageTolerance && selectedVal === "0.1" ? "rgb(29 78 216)" : "rgb(226 232 240 / 50%)",
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => onClickHandleSlippageTolerance("0.5")}
      >
        0.5%
      </CommonButton>
      <CommonButton
        sx={{
          border:
            !customSlippageTolerance && selectedVal === "1.0"
              ? "1px solid rgb(29 78 216)"
              : "1px solid rgb(226 232 240 / 50%)",
          marginRight: ".5rem",
          fontWeight: "600",
          color: !customSlippageTolerance && selectedVal === "0.1" ? "rgb(29 78 216)" : "rgb(226 232 240 / 50%)",
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => onClickHandleSlippageTolerance("1.0")}
      >
        1.0%
      </CommonButton>
      <CommonButton
        sx={{
          border:
            !customSlippageTolerance && selectedVal === "2.0"
              ? "1px solid rgb(29 78 216)"
              : "1px solid rgb(226 232 240 / 50%)",
          marginRight: ".5rem",
          fontWeight: "600",
          color: !customSlippageTolerance && selectedVal === "0.1" ? "rgb(29 78 216)" : "rgb(226 232 240 / 50%)",
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => onClickHandleSlippageTolerance("2.0")}
      >
        2.0%
      </CommonButton>
      <FormControl
        sx={{
          "& .MuiInputBase-root": {
            "& input.MuiInputBase-input": {
              padding: "8px 14px",
            },
          },
          "& .MuiInputBase-root.MuiOutlinedInput-root": {
            borderRadius: ".5rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: customSlippageTolerance ? "rgb(29 78 216)" : "",
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
          value={customSlippageTolerance}
          id="outlined-adornment"
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          inputProps={{
            "aria-label": "input",
          }}
        />
      </FormControl>
    </Box>
  );
};

export default SlippageTolerance;
