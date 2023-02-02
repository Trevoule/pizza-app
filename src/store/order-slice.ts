import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootStore";
import { fetchRestaurantsData, fetchProductsData } from "./order-actions";

export interface Restaurant {
  id: number;
  name: string;
  address1: string;
  address2: string;
  latitude: number;
  longitude: number;
}

export interface Product {
  id: number;
  category: string;
  name: string;
  rank: number;
  price: number;
  topping: [string];
}

export interface CurrentOrder {
  product: Product;
  restaurant: string;
}

export interface OrderState {
  restaurants: [] | Restaurant[];
  products: [] | Product[];
  currentOrders: [] | CurrentOrder[];
}

const initialState: OrderState = {
  restaurants: [],
  products: [],
  currentOrders: [],
};

export type Option = {
  value: string;
  label: string;
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getRestaurantsData(state: OrderState, action) {
      const payload = action.payload;
      state.restaurants = payload;
    },
    getProductsData(state: OrderState, action) {
      const payload = action.payload;
      state.products = payload;
    },
    setOrders(state: OrderState, action) {
      const payload = action.payload;
      state.currentOrders = payload;
    },
    addToOrder(state: OrderState, action) {
      const payload = action.payload;
      state.currentOrders = [...state.currentOrders, payload];
    },
    removeFromOrder(state: OrderState, action) {
      const productId = action.payload;
      const filtered = state.currentOrders.filter(
        (_, index) => productId !== index
      );
      state.currentOrders = filtered;
      if (filtered.length === 0) {
        localStorage.setItem("pizzas", JSON.stringify(filtered));
      }
    },
    changeProductPrice(state: OrderState, action) {
      const { newPrice, productId } = action.payload;
      const changedArray = state.currentOrders.map((item, index) => {
        const { product } = item;
        if (index === productId) {
          product.price = newPrice;
        }
        return item;
      });
      state.currentOrders = changedArray;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchRestaurantsData.fulfilled,
        (state: OrderState, action: PayloadAction<Restaurant[]>) => {
          state.restaurants = action.payload;
        }
      )
      .addCase(
        fetchProductsData.fulfilled,
        (state: OrderState, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
        }
      );
  },
});

export const {
  getProductsData,
  getRestaurantsData,
  setOrders,
  addToOrder,
  removeFromOrder,
  changeProductPrice,
} = orderSlice.actions;

export const selectRestaurants = (state: RootState) => state.order.restaurants;
export const selectRestaurantOptions = (state: RootState) => {
  const options: Option[] = [];
  state.order.restaurants.forEach((restaurant) => {
    options.push({
      value: restaurant.name.toLowerCase(),
      label: restaurant.name,
    });
  });

  return options;
};

export const selectProducts = (state: RootState) => state.order.products;
export const selectProductsOptions = (state: RootState) => {
  const options: Option[] = [];
  state.order.products.forEach((product) => {
    options.push({
      value: product.name.toLowerCase(),
      label: product.name,
    });
  });

  return options;
};

export const selectCurrentOrders = (state: RootState) =>
  state.order.currentOrders;

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
