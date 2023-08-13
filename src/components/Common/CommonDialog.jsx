import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CommonDialog = (props) => {
  const theme = useTheme();

  const {
    isFullScreen,
    isOpen,
    onClose,
    keepMounted,
    header,
    content,
    footerClassName,
    footer,
    removeFullScreenFromSm,
  } = props;

  const fullScreen = (useMediaQuery(theme.breakpoints.down("sm")) && !removeFullScreenFromSm) || isFullScreen;

  return (
    <Dialog
      open={isOpen}
      // TransitionComponent={Transition}
      maxWidth="md"
      fullScreen={fullScreen}
      disableBackdropClick={keepMounted}
      onClose={onClose}
      aria-labelledby="dialog-slide-title"
      aria-describedby="dialog-slide-description"
      sx={{
        "& .MuiDialog-container": {
          backgroundColor: "#000000e6",
        },

        "& .MuiPaper-root.MuiDialog-paper": {
          overflowY: "visible",
          borderRadius: ".6rem",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",

          ":before": {
            backgroundBlendMode: "soft-light,soft-light,normal",
            background:
              "radial-gradient(circle at left,yellow,transparent),radial-gradient(circle at bottom right,blue,transparent),radial-gradient(circle at top,red,transparent)",
            content: '""',
            display: "block",
            width: " 100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 0,
            filter: "blur(80px)",
            transform: "translateZ(-1px)",
          },
        }}
      >
        <Box sx={{ backgroundColor: "rgb(22 32 49)", zIndex: "100", position: "relative", borderRadius: ".5rem" }}>
          {header ? <DialogTitle sx={{ color: "#fff" }}>{header}</DialogTitle> : ""}
          {content ? content : ""}
        </Box>
      </Box>
    </Dialog>
  );
};

export default CommonDialog;
