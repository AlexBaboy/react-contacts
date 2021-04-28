import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const setContactsInitial = createAsyncThunk(
  "contacts/setContactsInitial",
  async (searchId, { getState, requestId }) => {
    const response = await axios.get("https://randomuser.me/api/?results=200");
    return response?.data;
  }
);

const toolkitSlice = createSlice({
  name: "toolkitSlice",
  initialState: {
    data: [],
    loading: true,
    isError: false,
  },

  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload.slice().sort((a, b) => a.price - b.price);
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setTicketsInitial.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(setTicketsInitial.fulfilled, (state, action) => {
      state.ticketsInitial = action.payload.sort((a, b) => a.price - b.price);
      state.tickets = state.ticketsInitial;
      state.loading = false;
    });
    builder.addCase(setTicketsInitial.rejected, (state, action) => {
      const { requestId } = action.meta;
      state.exception = action.error;
      state.currentRequestId = undefined;
    });
  },
});

export default toolkitSlice.reducer;
export const { setTickets } = toolkitSlice.actions;
