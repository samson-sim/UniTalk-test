import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Operator } from '../models/Operator';
const url = import.meta.env.VITE_API_URL;
console.log(import.meta.env.VITE_API_URL);
console.log(url);
export const operatorAPI = createApi({
  reducerPath: 'operatorAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (build) => ({
    fetchAllOperators: build.query<Operator[], string>({
      query: () => ({
        url: '/operator'
      })
    })
  })
});
