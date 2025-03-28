import { capitalizeWordsInString } from "@/utils/string";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";

export interface EnumSelectProps<T> {
  value: T | undefined;
  setValue: (value: T) => void;
  enumObject: { [key: string]: string };
  label: string;
  placeholder?: string;
  required?: boolean;
  icon?: ReactNode;
}

export function EnumSelect<T extends string>({
  value,
  setValue,
  enumObject,
  label,
  placeholder,
  required = false,
  icon = null,
}: EnumSelectProps<T>) {
  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value as T);
  };

  return (
    <FormControl fullWidth>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        value={value ?? ""}
        label={label}
        required={required}
        onChange={handleChange}
        displayEmpty
        multiple={false}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span className="text-zinc-400">{placeholder}</span>;
          }

          return capitalizeWordsInString(
            Object.entries(enumObject).filter(
              ([_, value]) => value === selected,
            )[0][0],
          );
        }}
        startAdornment={
          icon ? <InputAdornment position="start">{icon}</InputAdornment> : null
        }
      >
        <MenuItem value={""} disabled>
          {placeholder}
        </MenuItem>
        {Object.entries(enumObject).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {capitalizeWordsInString(key)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
