import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormStateFormType } from '@types-my/redux.types';

    const initialState: FormStateFormType = {
        isAccept: false,
        password_value: "",
    };

  const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      setIsAccept (state, action: PayloadAction<boolean>) {
        state.isAccept = action.payload
      },

      setPasswordValue (state, action: PayloadAction<string>) {
        state.password_value = action.payload
      },
    },
     });

export const { setIsAccept, setPasswordValue } = formSlice.actions;

export default formSlice.reducer;