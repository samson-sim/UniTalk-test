import { createSlice } from '@reduxjs/toolkit';
import { OperatorAddon } from '../../models/OperatorAddon';

export interface OperatorAddonState {
  operatorAddons: OperatorAddon[];
  isLoading: boolean;
  error: string;
}

const initialState: OperatorAddonState = {
  operatorAddons: [],
  isLoading: false,
  error: ''
};

export const operatorAddonSlice = createSlice({
  name: 'operatorAddon',
  initialState,
  reducers: {}
});

export const operatorAddonReducer = operatorAddonSlice.reducer;
