import { useFormContext } from "react-hook-form";
import { TextField } from '@mui/material';

export const ModalUpdateProject = () => {
    const {register, watch, formState: {errors}} = useFormContext()
    return (
      <TextField  label="Nombre" variant="outlined" value={watch("name")} {...register("name", { required: "Debe escribir un nombre para el proyecto" })}
              sx={{ width: '100%',
              '& .MuiOutlinedInput-root': { 
                  borderRadius: '16px',
                  '& fieldset': {
                      borderWidth: '2px',
                      borderColor: '#5e8cff',
                  },
                  '&:hover fieldset': {
                      borderColor: errors.name ? '#bd3838':'#00B261',
                  },
                  '&.Mui-focused fieldset': {
                      borderColor: errors.name ? '#bd3838': '#00B261',
                  },
              },
              '& .MuiOutlinedInput-input::placeholder': { fontWeight: 600, color: "#d9d9d9" },
              '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': { paddingY: "10px" },
              '& .MuiInputLabel-root.Mui-focused': {
                  color: errors.name ? '#bd3838': '#00B261',
                }
              }}
          />
    )
}