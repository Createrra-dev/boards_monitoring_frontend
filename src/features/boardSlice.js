import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/api";

const initialState = {
  boards: [],
  loading: false,
  error: null,
};

export const getBoards = createAsyncThunk(
  "boards/getBoards",
  async ({ organizationSlug }, { rejectWithValue }) => {
    try {
      const response = await api.getOrganizationBoards(organizationSlug);
      console.log(response.data)
      return response.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data.detail || "Ошибка загрузки плат"
      );
    }
  }
);

const boardSlice = createSlice({
    name: "board",
    initialState,
    extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.loading = false;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getBoards.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
    }
})

export default boardSlice.reducer;