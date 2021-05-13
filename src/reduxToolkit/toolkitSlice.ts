import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    list: [],
    isLoading: true,
    isError: false,
    debouncedFilterData: "",
    currentPage: 1,
    contactsPerPage: 10,
    exceptionText: "",
  },

  reducers: {
    setDebouncedFilterData(state, action) {
      state.debouncedFilterData = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setContactsInitial.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setContactsInitial.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(setContactsInitial.rejected, (state, action) => {
      const { requestId } = action.meta;
      state.isError = true;
      state.exceptionText = action.error?.toString();
      //state.currentRequestId = undefined;
    });
  },
});

export default contactsSlice.reducer;
export const { setDebouncedFilterData, setCurrentPage } = contactsSlice.actions;
