const hasDecimal = number => Number(number) % 1;

export default (number, config) => {
  const showDecimals = hasDecimal(number);
  return Number(number).toLocaleString("en-US", {
    style: "currency",
    currency: "usd",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
    ...config
  });
};
