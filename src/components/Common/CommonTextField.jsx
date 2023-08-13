import { TextField, Box } from "@mui/material";

const CommonTextField = (props) => {
  const { onChange, value, label, sx, placeholder, ...rest } = props;
  return (
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
        ...sx,
      }}
    >
      <TextField
        onChange={onChange}
        value={value}
        label={label}
        placeholder={placeholder ?? label}
        sx={{
          "& input": {
            padding: "7.5px 12px",
            fontSize: ".875rem",
          },
          "& label": {
            color: "#fff",
            fontSize: ".875rem",
            transform: "translate(14px, 8px) scale(1)",

            "&.Mui-focused": {
              transform: "translate(14px, -9px) scale(.75)",
              color: "#fff",
            },
          },
        }}
        {...rest}
      />
    </Box>
  );
};

export default CommonTextField;
