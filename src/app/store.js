import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feauters/todoSlice"

export  const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})