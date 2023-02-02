import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  addToOrder,
  Option,
  Restaurant,
  selectProducts,
  selectProductsOptions,
  selectRestaurantOptions,
  selectRestaurants,
} from "../../store/order-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductsData } from "../../store/order-actions";

const FilterForm = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [chosenProduct, setChosenProduct] = useState("");

  const restaurants = useAppSelector(selectRestaurants);
  const optionsRestaurants = useAppSelector(selectRestaurantOptions);

  const products = useAppSelector(selectProducts);
  const optionsProducts = useAppSelector(selectProductsOptions);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedRestaurant) return;

    const restaurantId = restaurants
      .find((restaurant: Restaurant) => restaurant.name === selectedRestaurant)
      ?.id.toString();

    if (!restaurantId) return;
    dispatch(fetchProductsData(restaurantId));
  }, [restaurants, selectedRestaurant, dispatch]);

  const onSelectRestaurant = (option: Option | null) => {
    if (!option) return;
    setSelectedRestaurant(option.label);
  };

  const onSelectProduct = (option: Option | null) => {
    if (!option) return;
    setChosenProduct(option.label);
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
        <Select
          className="Select"
          options={optionsRestaurants}
          name="selectRestaurant"
          id="selectRestaurant"
          value={
            optionsRestaurants[
              restaurants.findIndex(
                (restaurant) => restaurant.name === selectedRestaurant
              )
            ]
          }
          onChange={onSelectRestaurant}
        />
        <Select
          className="Select"
          options={optionsProducts}
          name="selectPizza"
          id="selectPizza"
          value={
            optionsProducts[
              products.findIndex((product) => product.name === chosenProduct)
            ]
          }
          onChange={onSelectProduct}
          isDisabled={!products.length}
        />

        <button type="button" onClick={onAddOrder} disabled={!chosenProduct}>
          Add to table
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
