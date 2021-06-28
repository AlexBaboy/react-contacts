import React from "react";
import TextField from "@material-ui/core/TextField";
import { setDebouncedFilterData } from "../../store/contacts";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import {useTranslation} from "react-i18next";

export const Search = () => {

  const {t} = useTranslation()

  const dispatch = useDispatch();

  const debouncedFilterData = useDebouncedCallback(
    (value) => dispatch(setDebouncedFilterData(value)),
    1000
  );

  return (
    <TextField
      label={t("contacts.filter.by location or nationality")}
      margin="normal"
      variant="outlined"
      fullWidth
      onChange={(e) => {
        debouncedFilterData(e.target.value?.toLowerCase());
      }}
    />
  );
};
