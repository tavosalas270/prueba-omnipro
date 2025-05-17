import { useFormContext } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";

export const ModalCreateTask = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col w-full h-full">
      {/* Título */}
      <TextField
        label="Título"
        variant="outlined"
        value={watch("title")}
        {...register("title", {
          required: "Debe escribir un título para la tarea",
        })}
        error={!!errors.title}
        helperText={typeof errors.title?.message === 'string' ? errors.title.message : undefined}
        sx={commonStyles(!!errors.title)}
      />

      {/* Descripción */}
      <TextField
        label="Descripción"
        variant="outlined"
        multiline
        rows={3}
        value={watch("descripcion")}
        {...register("descripcion")}
        sx={commonStyles()}
      />

      {/* Fecha de vencimiento */}
      <TextField
        label="Fecha de Vencimiento"
        type="date"
        variant="outlined"
        value={watch("endDate")}
        {...register("endDate")}
        sx={commonStyles()}
      />

      {/* Estado */}
      <TextField
        select
        label="Estado"
        variant="outlined"
        value={watch("status")}
        {...register("status")}
        sx={commonStyles()}
      >
        <MenuItem value="pendiente">Pendiente</MenuItem>
        <MenuItem value="completada">Completada</MenuItem>
      </TextField>

      {/* Prioridad */}
      <TextField
        select
        label="Prioridad"
        variant="outlined"
        value={watch("priority")}
        {...register("priority")}
        sx={commonStyles()}
      >
        <MenuItem value="baja">Baja</MenuItem>
        <MenuItem value="media">Media</MenuItem>
        <MenuItem value="alta">Alta</MenuItem>
      </TextField>
    </div>
  );
};

// 🎨 Estilos reutilizables
const commonStyles = (hasError?: boolean) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    "& fieldset": {
      borderWidth: "2px",
      borderColor: hasError ? "#bd3838" : "#5e8cff",
    },
    "&:hover fieldset": {
      borderColor: hasError ? "#bd3838" : "#00B261",
    },
    "&.Mui-focused fieldset": {
      borderColor: hasError ? "#bd3838" : "#00B261",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: hasError ? "#bd3838" : "#00B261",
  },
});