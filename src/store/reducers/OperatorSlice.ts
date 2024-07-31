import { createSlice } from '@reduxjs/toolkit';
import { Operator } from '../../models/Operator';

export interface OperatorState {
  operators: Operator[];
  isLoading: boolean;
  error: string;
}

const initialState: OperatorState = {
  operators: [],
  isLoading: false,
  error: ''
};

export const operatorSlice = createSlice({
  name: 'operator',
  initialState,
  reducers: {}
});

export const operatorReducer = operatorSlice.reducer;
