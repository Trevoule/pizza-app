import React, { useEffect } from "react";
import FilterForm from "../FilterForm";

import OrderProductsTable from "../OrderProductsTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeProductPrice,
  removeFromOrder,
  selectCurrentOrders,
  setOrders,
} from "../../store/order-slice";
import { fetchRestaurantsData } from "../../store/order-actions";

const Order = () => {
  const chosenProducts = useAppSelector(selectCurrentOrders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRestaurantsData());
  }, [dispatch]);

  useEffect(() => {
    if (chosenProducts.length > 0) {
      localStorage.setItem("pizzas", JSON.stringify(chosenProducts));
    }
  }, [chosenProducts]);

  useEffect(() => {
    const currentState = localStorage.getItem("pizzas");
    if (currentState && currentState.length > 0) {
      dispatch(setOrders(JSON.parse(currentState) || []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProduct = (productId: number) => {
    dispatch(removeFromOrder(productId));
  };

  const changeProductCost = (newPrice: number, productId: number) => {
    dispatch(changeProductPrice({ newPrice, productId }));
  };

  return (
    <div className="Order">
      <header>Create new entry</header>
      <FilterForm />
      <OrderProductsTable
        removeProduct={removeProduct}
        changeProductCost={changeProductCost}
      />
    </div>
  );
};

export default Order;
