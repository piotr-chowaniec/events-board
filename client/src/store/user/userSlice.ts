import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  initialized: false,
  user: {
    id: '',
    role: null,
    email: '',
    firstName: '',
    lastName: '',
    image: null,
    createdAt: null,
    updatedAt: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.initialized = true;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
