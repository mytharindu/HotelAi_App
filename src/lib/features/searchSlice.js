import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: '',
  isSearchMode: false,
  searchResults: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.isSearchMode = true;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.isSearchMode = false;
      state.searchResults = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuery, setSearchResults, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
