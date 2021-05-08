import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NATIONALITIES_HUMAN_NAME } from "../constants/nationalities";

export const setContactsInitial = createAsyncThunk(
  "contacts/setContactsInitial",
  async (searchId, { getState, requestId }) => {
    const response = await axios.get("https://randomuser.me/api/?results=200");
    return response?.data?.results;
  }
);

const contactsSlice = createSlice({
  name: "contactsSlice",
  initialState: {
    contactsInitial: [],
    contactsData: [],
    isLoading: true,
    isError: false,
    filterData: "",
    debouncedFilterData: "",
  },

  reducers: {
    setFilterData(state, action) {
      state.filterData = action.payload;
    },
    setDebouncedFilterData(state, action) {
      state.debouncedFilterData = action.payload;
    },
    setContactsFiltered(state, action) {
      state.contactsData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setContactsInitial.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setContactsInitial.fulfilled, (state, action) => {
      state.contactsInitial = action.payload;
      state.contactsData = state.contactsInitial;
      state.isLoading = false;
    });
    builder.addCase(setContactsInitial.rejected, (state, action) => {
      const { requestId } = action.meta;
      state.exception = action.error;
      state.currentRequestId = undefined;
    });
  },
});

export default contactsSlice.reducer;
export const {
  setContactsFiltered,
  setFilterData,
  setDebouncedFilterData,
} = contactsSlice.actions;
