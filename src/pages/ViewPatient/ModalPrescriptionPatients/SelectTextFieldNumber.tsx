import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export default function SelectTextFieldNumber() {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 0 } }}
      noValidate
      autoComplete="off"
    >
      <div className="grid grid-cols-3 gap-1 px-2">
        <TextField
          id="outlined-select-morning"
          select
          label="Sáng"
          className="w-full col-span-1"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-afternoon"
          select
          label="Trưa"
          className="w-full col-span-1"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-night"
          select
          label="Chiều"
          className="w-full col-span-1"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
