import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      //Includes Food Item Details
      state.items.push(action.payload);
      //Updates Cart Items Number on Navbar
      state.quantity += 1;
      //Includes Price, Quantity and Total
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      //Resets Food Item Details
      state.items = [];
      //Resets Cart Items Number on Navbar
      state.quantity = 0;
      //Resets Price, Quantity and Total
      state.total = 0;
    },
  },
});

export const { addItem, reset } = cartSlice.actions;
export default cartSlice.reducer;
