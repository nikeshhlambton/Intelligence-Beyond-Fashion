// src/reducers/trendsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const trendsSlice = createSlice({
  name: 'trends',
  initialState: {
    matchtrendVal: null,
    favTrends: null,
    base64: null,
    inputText: ""
  },
  reducers: {
    setMatchTrendData: (state, action) => {
      state.matchtrendVal = action.payload;
    },
    setFavTrendData: (state, action) => {
      state.favTrends = action.payload;
    },
    setBase64: (state, action) => {
      state.base64 = action.payload;
    },
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
  },
});

export const { setMatchTrendData , setBase64, setFavTrendData, setInputText} = trendsSlice.actions;
export default trendsSlice.reducer;
