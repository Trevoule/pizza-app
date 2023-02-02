import React, { useMemo } from "react";
import { CurrentOrder, selectCurrentOrders } from "../../store/order-slice";
import { useAppSelector } from "../../store/hooks";
import { valueFormatter } from "../utils";

interface Props {
  removeProduct: (productId: number) => void;
  changeProductCost: (newPrice: number, productId: number) => void;
}

const OrderProductsList = ({ removeProduct, changeProductCost }: Props) => {
  const chosenProducts = useAppSelector(selectCurrentOrders);

  const currentSum = useMemo(() => {
    return (chosenProducts as CurrentOrder[]).reduce(
      (acc: number, { product }: CurrentOrder) => {
        acc += product.price;
        return acc;
      },
      0
    );
  }, [chosenProducts]);

  const onChangeCost = (index: number, price: string) => {
    const newPrice = Number(price.replace(",", "."));
    if (isNaN(newPrice)) return;

    changeProductCost(newPrice, index);
  };

  return (
    <div>
      <header>
        <strong>Calculation</strong>
      </header>
      <table>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Product</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        {chosenProducts.length > 0 && (
          <tbody>
            {chosenProducts.map(
              ({ restaurant, product }: CurrentOrder, index: number) => {
                return (
                  <tr key={product.id + Math.random()}>
                    <td>{restaurant}</td>
                    <td>{product.name}</td>
                    <td>
                      <form
                        onSubmit={(e: React.SyntheticEvent) => {
                          e.preventDefault();
                          const target = e.target as typeof e.target & {
                            price: { value: string };
                          };
                          const price = target.price.value;
                          onChangeCost(index, price);
                        }}
                      >
                        <input
                          type="text"
                          name="price"
                          defaultValue={valueFormatter(product.price)}
                        />
                      </form>
                    </td>
                    <td onClick={removeProduct.bind(null, index)}>Remove</td>
                  </tr>
                );
              }
            )}

            <tr className="Summary">
              <td colSpan={2}>Summary: </td>
              <td colSpan={1}>{valueFormatter(currentSum)} USD</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default OrderProductsList;
