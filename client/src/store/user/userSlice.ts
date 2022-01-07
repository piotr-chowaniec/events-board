import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@common-packages/data-access-layer';

export interface UserState {
  id: User['id'];
  role: string;
  email: User['email'];
  firstName: User['firstName'];
  lastName: User['lastName'];
  createdAt: string;
  updatedAt: string;
}

export const initialState = {
  id: '',
  role: '',
  email: '',
  firstName: '',
  lastName: '',
  createdAt: '',
  updatedAt: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload?.id;
      state.role = action.payload?.role;
      state.email = action.payload?.email;
      state.firstName = action.payload?.firstName;
      state.lastName = action.payload?.lastName;
      state.createdAt = action.payload?.createdAt;
      state.updatedAt = action.payload?.updatedAt;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
