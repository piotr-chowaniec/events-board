import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@common-packages/data-access-layer';

export interface SetUserDataPayload {
  id: User['id'];
  role: string;
  email: User['email'];
  firstName: User['firstName'];
  lastName: User['lastName'];
  createdAt: string;
  updatedAt: string;
}

export const initialState = {
  initialized: false,
  user: {
    id: '',
    role: '',
    email: '',
    firstName: '',
    lastName: '',
    createdAt: '',
    updatedAt: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<SetUserDataPayload>) => {
      state.initialized = true;
      state.user.id = action.payload?.id;
      state.user.role = action.payload?.role;
      state.user.email = action.payload?.email;
      state.user.firstName = action.payload?.firstName;
      state.user.lastName = action.payload?.lastName;
      state.user.createdAt = action.payload?.createdAt;
      state.user.updatedAt = action.payload?.updatedAt;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
