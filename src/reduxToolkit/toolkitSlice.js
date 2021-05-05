import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {NATIONALITIES_HUMAN_NAME} from "../constants/nationalities";
import {contactsFiltered} from "../pages/Contacts";

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
    debouncedValueRedux: null
  },

  reducers: {
    setContactsFiltered(state, action) {
      state.contactsData = action.payload;
      state.isLoading = false;
    },
    setDebounceValueRedux(state, action) {
      state.debouncedValueRedux = action.payload;
    },
    setFilterData(state, action) {
      state.filterData  = createSelector(
          [contactsFiltered],
          action.payload.filter((contact) => {
            return (
                contact?.location?.city
                    .toLowerCase()
                    .includes(this.debouncedValueRedux.toLowerCase()) ||
                contact?.location?.country
                    .toLowerCase()
                    .includes(this.debouncedValueRedux.toLowerCase()) ||
                NATIONALITIES_HUMAN_NAME[contact?.nat]
                    ?.toLowerCase()
                    .includes(this.debouncedValueRedux.toLowerCase())
            );
          })
      )
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
export const { setContactsFiltered, setFilterData, setDebounceValueRedux } = toolkitSlice.actions;
