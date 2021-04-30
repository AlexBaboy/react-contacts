import React from "react";
import TextField from "@material-ui/core/TextField";
import { setFilterData } from "../../reduxToolkit/toolkitSlice";
import { useDispatch } from "react-redux";

const Search = (filterData) => {
  const dispatch = useDispatch();
  return (
    <TextField
      label="filter by location or nationality"
      margin="normal"
      variant="outlined"
      fullWidth
      onChange={(v) => dispatch(setFilterData(filterData))}
    />
  );
};

export default Search;
