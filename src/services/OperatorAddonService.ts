import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OperatorAddon } from '../models/OperatorAddon';
const url = import.meta.env.VITE_API_URL;
console.log(import.meta.env.VITE_API_URL);
console.log(url);
export const operatorAddonAPI = createApi({
  reducerPath: 'operatorAddonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (build) => ({
    fetchAllAddons: build.query<OperatorAddon[], string>({
      query: () => ({
        url: '/operatorAddon'
      })
    })
  })
});
