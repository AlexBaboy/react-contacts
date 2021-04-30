import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const setContactsInitial = createAsyncThunk(
  "contacts/setContactsInitial",
  async (searchId, { getState, requestId }) => {
    const response = await axios.get("https://randomuser.me/api/?results=200");
    return response?.data?.results;
  }
);

const toolkitSlice = createSlice({
  name: "toolkitSlice",
  initialState: {
    contactsInitial: [],
    contactsData: [],
    isLoading: true,
    isError: false,
    filterData: "",
  },

  reducers: {
    setContactsFiltered(state, action) {
      state.contactsData = action.payload;
      state.isLoading = false;
    },
    setFilterData(state, action) {
      console.log("28 action", action);
      state.filterData = action.payload;
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

export default toolkitSlice.reducer;
export const { setContactsFiltered, setFilterData } = toolkitSlice.actions;
