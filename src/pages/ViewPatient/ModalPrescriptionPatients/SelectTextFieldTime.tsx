import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { SetStateAction, useState } from "react";

const timesModal = [
  { value: "1", label: "Trước khi ăn" },
  { value: "2", label: "Sau khi ăn" },
];

export default function SelectTextMedicineTime() {
  const [selectedTime, setSelectedTime] = useState("");
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedTime(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 0 } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-time"
          select
          label="Thời gian"
          className="w-full col-span-1"
          value={selectedTime} // Step 4: Bind the value to the state
          onChange={handleChange} // Step 3: Handle selection change
        >
          {timesModal.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
