import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   export interface SliceStateType {
        count: number
    }

    const initialState: SliceStateType = {
        count: 0
    };

  const firstSlice = createSlice({
    name: 'first-slice',
    initialState,
    reducers: {

    },
     });

export const {  } = firstSlice.actions;

export default firstSlice.reducer;