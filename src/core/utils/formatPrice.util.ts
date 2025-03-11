export function formatPrice(value: number) {
  let decimals = 2;

  // Increase decimals for lower values
  if (value < 1) decimals = 6;
  else if (value < 100) decimals = 4;
  else if (value < 10000) decimals = 2;

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}
