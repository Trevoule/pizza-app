export const valueFormatter = (price: number) => {
  return (Math.round(price * 100) / 100)
    .toFixed(2)
    .toString()
    .replace(".", ",");
};
