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
    contactsInitial: [],
    contactsFiltered: [],
    isLoading: true,
    isError: false,
    filterData: "",
    debouncedFilterData: "",
    currentPage: 1,
    contactsPerPage: 10,
    indexOfLastContact: null,
    indexOfFirstContact: null,
  },

  reducers: {
    setFilterData(state, action) {
      state.filterData = action.payload;
    },
    setDebouncedFilterData(state, action) {
      state.debouncedFilterData = action.payload;
    },
    setContactsFiltered(state, action) {
      state.contactsFiltered = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setIndexOfLastContact(state, action) {
      state.indexOfLastContact = action.payload;
    },
    setIndexOfFirstContact(state, action) {
      state.indexOfLastContact = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setContactsInitial.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setContactsInitial.fulfilled, (state, action) => {
      state.contactsInitial = action.payload;
      state.contactsFiltered = state.contactsInitial;
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
  setDebouncedFilterData,
  setCurrentPage,
  setIndexOfLastContact,
  setIndexOfFirstContact,
} = contactsSlice.actions;
