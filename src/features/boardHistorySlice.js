import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/api";

const initialState = {
    history: [],
    loading: false,
    error: null,
}

export const getBoardHistory = createAsyncThunk(
  "boardHistory/getBoardHistory",
  async ({ organizationSlug, boardSlug }, { rejectWithValue }) => {
    try {
      const response = await api.getBoardHistory(organizationSlug, boardSlug);
      return response.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data.detail || "Ошибка загрузки истории"
      );
    }
  }
);

const boardHistorySlice = createSlice({
    name: "boardHistory",
    initialState,
    extraReducers: (builder) => {
    builder
      .addCase(getBoardHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = false;
      })
      .addCase(getBoardHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getBoardHistory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
    }
})

export default boardHistorySlice.reducer;