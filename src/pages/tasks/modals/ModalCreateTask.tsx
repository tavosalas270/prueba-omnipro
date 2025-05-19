import { useFormContext, Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";

export const ModalCreateTask = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col w-full h-full gap-y-2.5 pt-2">
      <Controller
        name="title"
        control={control}
        rules={{ required: "Debe escribir un título para la tarea" }}
        render={({ field, fieldState }) => (
          <TextField
            label="Título"
            variant="outlined"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={commonStyles(!!errors.endDate)}
          />
        )}
      />

      <Controller
        name="descripcion"
        control={control}
        render={({ field }) => (
          <TextField
            label="Descripción"
            multiline
            rows={3}
            variant="outlined"
            {...field}
            sx={commonStyles()}
          />
        )}
      />

      <Controller
        name="endDate"
        control={control}
        render={({ field }) => (
          <TextField
            label="Fecha de Vencimiento"
            type="date"
            variant="outlined"
            {...field}
            sx={{
              ...commonStyles(),
              '& input::placeholder': {
                color: 'transparent',
              },
              '& input': {
                color: field.value ? 'inherit' : 'transparent',
              },
              '& input:focus': {
                color: 'inherit',
              },
              '& label': {
                zIndex: 1,
              }
            }}
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        rules={{ required: "Debe seleccionar un nivel de prioridad para la tarea" }}
        render={({ field, fieldState }) => (
          <TextField
            select
            label="Prioridad"
            variant="outlined"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={commonStyles(!!fieldState.error)}
          >
            <MenuItem value="">Selecciona una prioridad</MenuItem>
            <MenuItem value="baja">Baja</MenuItem>
            <MenuItem value="media">Media</MenuItem>
            <MenuItem value="alta">Alta</MenuItem>
          </TextField>
        )}
      />
    </div>
  );
};

const commonStyles = (hasError?: boolean) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': { 
    borderRadius: '16px',
    '& fieldset': {
        borderWidth: '2px',
        borderColor: '#5e8cff',
    },
    '&:hover fieldset': {
        borderColor: hasError ? '#bd3838':'#00B261',
    },
    '&.Mui-focused fieldset': {
        borderColor: hasError ? '#bd3838': '#00B261',
    },
},
'& .MuiOutlinedInput-input::placeholder': { fontWeight: 600, color: "#d9d9d9" },
'& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': { paddingY: "10px" },
'& .MuiInputLabel-root.Mui-focused': {
    color: hasError ? '#bd3838': '#00B261',
  }
});