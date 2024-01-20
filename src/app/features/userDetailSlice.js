import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/** CREATE ASYNC THUNK
 * { rejectWithValue } this thin is given by thunk for handling errors
 *
 * next this async thunk returns promises: pending, fullfilled & rejected
 * to handle these we use extraReducers in our slice
 */

const DB_URL = "https://65aa5c11081bd82e1d96c0f7.mockapi.io/CRUD";

// POST DATA
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const res = await fetch(DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// READ DATA
export const getUsers = createAsyncThunk(
  "getUsers",
  async (_, { rejectWithValue }) => {
    const res = await fetch(DB_URL);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// DELETE DATA
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`${DB_URL}/${id}`, {
      method: "DELETE",
    });
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// UPDATE DATA
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const res = await fetch(`${DB_URL}/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  isLoading: false,
  isError: null,
  searchUser: [],
};

export const userDetail = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.users = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    /*       .addMatcher(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addDefaultCase((state) => {
        return state;
      }); */
  },
});

// extraReducers: {
//   [createUser.pending]: (state) => {
//     state.isLoading = true;
//   },
//   [createUser.fulfilled]: (state, action) => {
//     state.isLoading = false;
//     state.users.push(action.payload);
//   },
//   [createUser.rejected]: (state, action) => {
//     state.isLoading = false;
//     state.isError = action.payload;
//   },
// },

export const { searchUser } = userDetail.actions;

export default userDetail.reducer;
