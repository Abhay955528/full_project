import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ["Items ", "allData"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://full-project-aelz.onrender.com/', 
    prepareHeaders: (header) => {
      const token = localStorage.getItem('token');
      if (token) {
        header.set("Authorization", token);
      }
      return header;
    },
}),
    endpoints: (builder) => ({
        // ✅ Mutation
        addLogin: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data
            }),
        }),
        addRegister: builder.mutation({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data
            })
        }),
         addItem: builder.mutation({
            query: (data) => ({
                url: 'user_add_item',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Items"]
        }),
            // ✅ Query
            getItem: builder.query({
                query: () => ({
                    url: 'user_get_item',
                    method: 'GET'
                }),
                providesTags: ["Items"]
            }),
            allData: builder.query({
                query: () => ({
                    url: 'all_user_data',
                    method: 'GET'
                }),
                providesTags: ["allData"]
            }),
        })
    })

export const { useAddLoginMutation, useAddRegisterMutation ,useAddItemMutation, useGetItemQuery,useAllDataQuery} 
= apiSlice;