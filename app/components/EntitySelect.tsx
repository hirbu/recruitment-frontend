"use client";

import Entity from "@/entities/Entity";
import { useEntitySearch } from "@/hooks/useEntitySearch";
import {
  Autocomplete,
  CircularProgress,
  debounce,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

export interface SelectProps<T> {
  value: T[];
  setValue: (entities: T[]) => void;
}

interface EntitySelectProps<T> extends SelectProps<T> {
  endpoint: string;
  queryParam: string;
  label: string;
  placeholder: string;
  getOptionLabel: (option: T) => string;
  getOptionKey: (option: T) => number;
  icon?: ReactNode;
  minSearchLength?: number;
  required: boolean;
}

export function EntitySelect<T extends Entity>({
  value,
  setValue: onChange,
  endpoint,
  queryParam,
  label,
  placeholder,
  getOptionLabel,
  getOptionKey,
  icon,
  minSearchLength = 3,
  required = false,
}: EntitySelectProps<T>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, searchLoading, search, resetSearch] = useEntitySearch<T>(
    {
      endpoint,
      queryParam,
    },
  );

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.length >= minSearchLength) {
        search(query);
      }
    }, 300),
    [search, minSearchLength],
  );

  useEffect(() => {
    if (inputValue.length >= minSearchLength) {
      debouncedSearch(inputValue);
    } else if (inputValue === "") {
      resetSearch();
    }
  }, [inputValue, debouncedSearch, resetSearch, minSearchLength]);

  const handleChange = (_: any, newValue: T[]) => {
    onChange(newValue);
    setInputValue("");
    router.refresh();
  };

  const filteredOptions = searchResult.filter(
    (option) => !value.some((item) => item.id === option.id),
  );

  return (
    <Autocomplete
      multiple
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={filteredOptions}
      loading={searchLoading}
      value={value}
      onChange={handleChange}
      getOptionKey={(option) => getOptionKey(option)}
      getOptionLabel={(option) => getOptionLabel(option)}
      inputValue={inputValue}
      includeInputInList={false}
      noOptionsText={
        inputValue.length < minSearchLength
          ? `Type at least ${minSearchLength} characters to search.`
          : "No results found."
      }
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label={`${label}${required ? " *" : ""}`}
          placeholder={placeholder}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  {icon && (
                    <InputAdornment position="start">{icon}</InputAdornment>
                  )}
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {searchLoading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
              required: value.length === 0 && required,
            },
          }}
        />
      )}
    />
  );
}
