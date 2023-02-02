import React, { useEffect, useState } from "react";
import {
  addToOrder,
  Restaurant,
  selectProducts,
  selectRestaurants,
} from "../../store/order-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductsData } from "../../store/order-actions";

const FilterForm = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [chosenProduct, setChosenProduct] = useState("");

  const products = useAppSelector(selectProducts);
  const restaurants = useAppSelector(selectRestaurants);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedRestaurant) return;

    const restaurantId = restaurants
      .find((restaurant: Restaurant) => restaurant.name === selectedRestaurant)
      ?.id.toString();

    if (!restaurantId) return;
    dispatch(fetchProductsData(restaurantId));
  }, [restaurants, selectedRestaurant, dispatch]);

  const onSelectRestaurant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRestaurant(e.target.value);
  };

  const onSelectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenProduct(e.target.value);
  };

  const onAddOrder = () => {
    const chosenProductData = products.find(
      (product) => product.name === chosenProduct
    );
    dispatch(
      addToOrder({
        restaurant: selectedRestaurant,
        product: chosenProductData,
      })
    );
  };

  return (
    <div className="FilterForm">
      <div>
        <select
          name="selectRestaurant"
          id="selectRestaurant"
          onChange={onSelectRestaurant}
          value={selectedRestaurant}
        >
          <option value="" disabled hidden>
            Select restaurant
          </option>
          {restaurants.map((restaurant) => (
            <option
              key={restaurant.id + Math.random()}
              id={restaurant.id.toString()}
              value={restaurant.name}
            >
              {restaurant.name}
            </option>
          ))}
        </select>
        <select
          name="selectPizza"
          id="selectPizza"
          disabled={!products.length}
          onChange={onSelectProduct}
          value={chosenProduct}
        >
          <option value="" disabled hidden>
            Select pizza
          </option>
          {products &&
            products.map((product) => (
              <option
                key={product.id}
                id={product.id.toString()}
                value={product.name}
              >
                {product.name}
              </option>
            ))}
        </select>
        <button type="button" onClick={onAddOrder} disabled={!chosenProduct}>
          Add to table
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
