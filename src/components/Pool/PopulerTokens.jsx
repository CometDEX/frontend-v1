import React from "react";
import { Box, Typography } from "@mui/material";
import CommonButton from "../Common/CommonButton";
import Image from "next/image";

const PopulerTokens = () => {
  const imageList = ["/logo-1.png", "/logo-2.png", "/logo-3.png", "/logo-4.png", "/logo-5.png", "/logo-6.png"];

  return (
    <Box bgcolor="#162031" display="flex" alignItems="center" ml="1.5rem" px=".75rem" borderRadius=".5rem">
      <Typography color="#94A3B8" component="p" variant="body1">
        Popular
      </Typography>
      <Box
        ml=".5rem"
        sx={{
          borderLeft: "1px solid #0F172A",
          paddingLeft: "6px",
        }}
      >
        {imageList.map((url, i) => {
          return (
            <CommonButton
              key={i}
              sx={{
                backgroundColor: "transparent",
                minWidth: "24px",
                padding: "6px",

                "& img": {
                  borderRadius: "100%",
                },

                "&:hover": {
                  backgroundColor: "transparent",
                  "& img": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <Image src={url} alt={url} width="24" height="24" />
            </CommonButton>
          );
        })}
      </Box>
    </Box>
  );
};

export default PopulerTokens;
