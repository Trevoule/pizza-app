import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRestaurantsData = createAsyncThunk(
  "orders/fetchRestaurantsData",
  async () => {
    try {
      const response = await fetch(
        "https://private-anon-e1e0bb1406-pizzaapp.apiary-mock.com/restaurants/"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Could not fetch restaurant data");
    }
  }
);

export const fetchProductsData = createAsyncThunk(
  "orders/fetchProductsData",
  async (restaurantId: string) => {
    try {
      const response = await fetch(
        `https://private-anon-e1e0bb1406-pizzaapp.apiary-mock.com/restaurants/${restaurantId}/menu?category=Pizza&orderBy=rank`
      );

      if (!response.ok) {
        throw new Error("Could not fetch restaurant data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Could not fetch products data");
    }
  }
);
