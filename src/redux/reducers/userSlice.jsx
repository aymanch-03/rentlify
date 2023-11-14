/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const ListUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users");
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/v1/users/${id}`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/v1/users", user);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, newUserData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/users/${id}`, newUserData);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/users/${id}`);
      console.log("Deleted User: ", response);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    updateUsersInUserSlice: (state, action) => {
      state.users = { ...state.users, ...action.payload };
      console.log(state.users);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ListUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ListUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(ListUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) // Getting one user
      .addCase(getUser.pending, (state, action) => {
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) // Add one user
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = [...state.users, action.payload];
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) // Update user
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUsers = state.users.map((user) => {
          if (user._id === action.payload._id) {
            return action.payload;
          } else {
            return user;
          }
        });
        state.users = updatedUsers;
        console.log(state.users);
        state.error = null;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log("action.meta.arg" + action.meta.arg);
        const Users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        console.log("action.payload._id ", action.payload._id);
        // console.log("state.users: ", Users);
        state.users = Users;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
export const { updateUsersInUserSlice } = userSlice.actions;
