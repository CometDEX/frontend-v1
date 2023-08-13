import React from "react";
import { Button, SvgIcon } from "@mui/material";

const CommonButton = ({ icon, sx, title, children, variant = "contained", onClick, ...rest }) => {
  return (
    <Button
      variant={variant}
      sx={{
        color: "#fff",
        ...(variant !== "outlined" && { backgroundColor: "#1E2933" }),
        textTransform: "initial",
        ...(variant === "outlined" && { border: "1px solid #fff" }),
        "&:hover": {
          ...(variant !== "outlined" && { backgroundColor: "#1E2933" }),
          ...(variant === "outlined" && { border: "1px solid #fff" }),
        },

        "&.Mui-disabled": {
          color: "rgb(51 65 85)",
          borderColor: "rgb(51 65 85)",
          cursor: "pointer !important",
          "&:hover": {
            cursor: "pointer !important",
          },
        },
        ...sx,
      }}
      onClick={onClick}
      {...rest}
    >
      {icon ? (
        <SvgIcon
          sx={{
            fontSize: "1.2rem",
            marginRight: ".5rem",
          }}
        >
          {icon}
        </SvgIcon>
      ) : (
        ""
      )}
      {title || children}
    </Button>
  );
};

export default CommonButton;
