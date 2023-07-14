import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
};

const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    paginator: {},
    userSelected: initialUserForm,
    visibleForm: false,
    errors: initialErrors,
    isLoading: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.users = [
        ...state.users,
        {
          ...action.payload,
        },
      ];
      state.userSelected = initialUserForm;
      state.visibleForm = false;
    },

    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      state.users = state.users.map((u) => {
        if (u.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return u;
      });
      state.userSelected = initialUserForm;
      state.visibleForm = false;
    },

    loadingUsers: (state, action) => {
      state.users = action.payload.content;
      state.paginator = action.payload;
      state.isLoading = false;
    },
    onUserSelectedForm: (state, action) => {
      state.userSelected = action.payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.userSelected = initialUserForm;
    },
    loadingError: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  updateUser,
  loadingUsers,
  onUserSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = usersSlice.actions;
