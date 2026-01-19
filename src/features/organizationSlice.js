import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/api";

const initialState = {
    organizations: [],
    loading: false,
    error: null,
}

export const getOrganizations = createAsyncThunk(
  "organizations/getOrganizations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getOrganizations();
      return response.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data.detail || "Ошибка загрузки организаций"
      );
    }
  }
);

const organizationSlice = createSlice({
    name: "organization",
    initialState,
    extraReducers: (builder) => {
    builder
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getOrganizations.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
    }
})

export default organizationSlice.reducer;
